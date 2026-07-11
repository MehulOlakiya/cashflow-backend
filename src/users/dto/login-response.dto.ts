export class LoginResponseDto {
  token: string;
  user: UserDto;
}

export class UserDto {
  id: string;
  mobileNumber: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
