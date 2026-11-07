import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestTableDocument = RestTable & Document;

@Schema({ _id: false })
export class RestOrderItem {
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 1, default: 1 })
  quantity: number;

  @Prop({ default: Date.now })
  addedAt: Date;
}

export const RestOrderItemSchema = SchemaFactory.createForClass(RestOrderItem);

@Schema({ collection: 'rest_tables', timestamps: true })
export class RestTable extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: false, default: 0 })
  tableNumber: number;

  @Prop({ required: true, enum: ['empty', 'occupied'], default: 'empty' })
  status: 'empty' | 'occupied';

  @Prop({ default: 4, min: 1 })
  capacity: number;

  @Prop({ type: [RestOrderItemSchema], default: [] })
  orders: RestOrderItem[];

  @Prop({ default: 0, min: 0 })
  totalAmount: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const RestTableSchema = SchemaFactory.createForClass(RestTable);
