import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestBillDocument = RestBill & Document;

@Schema({ _id: false })
export class RestBillItem {
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  itemTotal: number;
}

export const RestBillItemSchema = SchemaFactory.createForClass(RestBillItem);

@Schema({ collection: 'rest_bills', timestamps: true })
export class RestBill extends Document {
  @Prop({ required: true, unique: true })
  billNumber: string;

  @Prop({ required: true })
  tableId: string;

  @Prop({ required: true })
  tableName: string;

  @Prop({ type: [RestBillItemSchema], required: true })
  items: RestBillItem[];

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ default: 0, min: 0 })
  tax: number;

  @Prop({ default: 0, min: 0 })
  discount: number;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({
    required: true,
    enum: ['Cash', 'UPI / QR', 'Card', 'Other'],
    default: 'Cash',
  })
  paymentMode: string;

  @Prop({ default: '' })
  customerName: string;

  @Prop({ default: '' })
  customerPhone: string;

  @Prop({ default: 'paid' })
  status: string;

  @Prop({ default: Date.now })
  settledAt: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const RestBillSchema = SchemaFactory.createForClass(RestBill);
