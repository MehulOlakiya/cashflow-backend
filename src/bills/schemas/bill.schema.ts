import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BillDocument = Bill & Document;

@Schema()
class BillLineItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number;

  @Prop({ required: true, min: 0 })
  amount: number;
}

const BillLineItemSchema = SchemaFactory.createForClass(BillLineItem);

@Schema({ _id: false })
export class BillPaymentCollection {
  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true, enum: ['cash', 'online'] })
  paymentMethod: string;

  @Prop({ required: true })
  collectedAt: Date;
}

const BillPaymentCollectionSchema = SchemaFactory.createForClass(
  BillPaymentCollection,
);

@Schema({ timestamps: true })
export class Bill extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ default: '' })
  customerName: string;

  @Prop({ default: '' })
  customerMobile: string;

  @Prop({ type: [BillLineItemSchema], required: true })
  items: BillLineItem[];

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ default: 0 })
  discountPercent: number;

  @Prop({ default: 0 })
  discountAmount: number;

  @Prop({ required: true, min: 0 })
  grandTotal: number;

  @Prop({ default: 'cash' })
  paymentMethod: string;

  @Prop({ default: 0, min: 0 })
  amountReceived: number;

  @Prop({ default: 0, min: 0 })
  amountRemaining: number;

  @Prop({ type: [BillPaymentCollectionSchema], default: [] })
  paymentCollections: BillPaymentCollection[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
