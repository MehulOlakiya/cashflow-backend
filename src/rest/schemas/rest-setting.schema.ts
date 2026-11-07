import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestSettingDocument = RestSetting & Document;

@Schema({ collection: 'rest_settings', timestamps: true })
export class RestSetting extends Document {
  @Prop({ default: 'TasteBite POS', trim: true })
  restaurantName: string;

  @Prop({ default: 'Small Food Restaurant', trim: true })
  tagline: string;

  @Prop({ default: '+91 98765 43210', trim: true })
  phone: string;

  @Prop({ default: 'Shop 4, Market Complex, MG Road', trim: true })
  address: string;

  @Prop({ default: '₹', trim: true })
  currency: string;

  @Prop({ default: 0, min: 0 })
  gstRate: number;

  @Prop({ default: 'tastebite@upi', trim: true })
  upiId: string;

  @Prop({ default: 'Thank you for dining with us!', trim: true })
  footerNote: string;
}

export const RestSettingSchema = SchemaFactory.createForClass(RestSetting);

