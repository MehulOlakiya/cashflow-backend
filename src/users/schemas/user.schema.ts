import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  mobileNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  name?: string;

  @Prop({ default: null })
  email?: string;

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  isWhatsappSessionEnable: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
