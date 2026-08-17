import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    enum: ['Pant', 'Shirt', 'T-shirt', 'Other'],
    default: 'Other',
  })
  productType: string;

  @Prop({ default: 0, min: 0 })
  initialStock: number;

  @Prop({ required: true, min: 0 })
  purchasePrice: number;

  @Prop({ required: true, min: 0 })
  sellingPrice: number;

  @Prop({ required: true, unique: true })
  ledgerCode: string;

  @Prop({ enum: ['qr', 'barcode'], default: 'qr' })
  codeType: 'qr' | 'barcode';
}

export const ProductSchema = SchemaFactory.createForClass(Product);
