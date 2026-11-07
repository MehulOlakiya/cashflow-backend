import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestSetting, RestSettingDocument } from '../schemas/rest-setting.schema';
import { UpdateRestSettingDto } from '../dto/update-rest-setting.dto';

@Injectable()
export class RestSettingService {
  constructor(
    @InjectModel(RestSetting.name)
    private readonly restSettingModel: Model<RestSettingDocument>,
  ) {}

  async getSettings(): Promise<RestSetting> {
    let settings = await this.restSettingModel.findOne().exec();
    if (!settings) {
      settings = new this.restSettingModel({
        restaurantName: 'TasteBite POS',
        tagline: 'Small Food Restaurant',
        phone: '+91 98765 43210',
        address: 'Shop 4, Market Complex, MG Road',
        currency: '₹',
        gstRate: 0,
        upiId: 'tastebite@upi',
        footerNote: 'Thank you for dining with us!',
      });
      await settings.save();
    }
    return settings;
  }

  async updateSettings(dto: UpdateRestSettingDto): Promise<RestSetting> {
    let settings = await this.restSettingModel.findOne().exec();
    if (!settings) {
      settings = new this.restSettingModel();
    }

    if (dto.restaurantName !== undefined) settings.restaurantName = dto.restaurantName.trim();
    if (dto.tagline !== undefined) settings.tagline = dto.tagline.trim();
    if (dto.phone !== undefined) settings.phone = dto.phone.trim();
    if (dto.address !== undefined) settings.address = dto.address.trim();
    if (dto.currency !== undefined) settings.currency = dto.currency.trim();
    if (dto.gstRate !== undefined) settings.gstRate = dto.gstRate;
    if (dto.upiId !== undefined) settings.upiId = dto.upiId.trim();
    if (dto.footerNote !== undefined) settings.footerNote = dto.footerNote.trim();

    return settings.save();
  }
}

