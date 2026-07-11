import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true, enum: ['income', 'expense'] })
  type: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['cash', 'online'] })
  paymentType: string;

  @Prop({ default: '' })
  note: string;

  @Prop({ required: true })
  date: string; // ISO date string e.g. "2024-04-19"
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
