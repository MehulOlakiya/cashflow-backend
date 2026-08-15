import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { LoginResponseDto, UserDto } from './dto/login-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const { mobileNumber, password, name, email } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ mobileNumber });
    if (existingUser) {
      throw new BadRequestException(
        'User with this mobile number already exists',
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new this.userModel({
      mobileNumber,
      password: hashedPassword,
      name,
      email,
    });

    const savedUser = await user.save();

    // Generate token
    const token = this.jwtService.sign({
      sub: savedUser._id,
      mobileNumber: savedUser.mobileNumber,
    });

    return {
      token,
      user: this.toUserDto(savedUser),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { mobileNumber, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ mobileNumber });
    if (!user) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    // Generate token
    const token = this.jwtService.sign({
      sub: user._id,
      mobileNumber: user.mobileNumber,
    });

    return {
      token,
      user: this.toUserDto(user),
    };
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  async updateProfile(
    userId: string,
    updates: { name?: string; email?: string; profilePicture?: string },
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true },
    );
  }

  private toUserDto(user: User): UserDto {
    return {
      id: user._id.toString(),
      mobileNumber: user.mobileNumber,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async setWhatsappSessionEnable(
    userId: string,
    enabled: boolean,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      isWhatsappSessionEnable: enabled,
    });
  }
}
