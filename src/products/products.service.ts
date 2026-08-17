import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    userId: string,
    dto: CreateProductDto,
  ): Promise<ProductDocument> {
    const existing = await this.productModel
      .findOne({ ledgerCode: dto.ledgerCode })
      .exec();
    if (existing) {
      throw new ConflictException(
        `Ledger code "${dto.ledgerCode}" is already in use`,
      );
    }

    const product = new this.productModel({
      ...dto,
      productType: dto.productType ?? 'Other',
      initialStock: dto.initialStock ?? 0,
      codeType: dto.codeType ?? 'qr',
      userId: new Types.ObjectId(userId),
    });
    return product.save();
  }

  async findAll(userId: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(userId: string, id: string): Promise<ProductDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Product not found');
    }
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return product;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = await this.findOne(userId, id);

    if (dto.ledgerCode && dto.ledgerCode !== product.ledgerCode) {
      const conflict = await this.productModel
        .findOne({ ledgerCode: dto.ledgerCode })
        .exec();
      if (conflict) {
        throw new ConflictException(
          `Ledger code "${dto.ledgerCode}" is already in use`,
        );
      }
    }

    const updated = await this.productModel
      .findByIdAndUpdate(product._id, { $set: dto }, { new: true })
      .exec();
    return updated as ProductDocument;
  }

  async remove(userId: string, id: string): Promise<void> {
    const product = await this.findOne(userId, id);
    await this.productModel.findByIdAndDelete(product._id).exec();
  }
}
