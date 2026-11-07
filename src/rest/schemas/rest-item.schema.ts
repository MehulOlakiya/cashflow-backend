import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestItemDocument = RestItem & Document;

@Schema({ collection: 'rest_items', timestamps: true })
export class RestItem extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: 'General', trim: true })
  category: string;

  @Prop({ default: true })
  isAvailable: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const RestItemSchema = SchemaFactory.createForClass(RestItem);
