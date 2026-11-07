import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateRestSettingDto {
  @IsString()
  @IsOptional()
  restaurantName?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  gstRate?: number;

  @IsString()
  @IsOptional()
  upiId?: string;

  @IsString()
  @IsOptional()
  footerNote?: string;
}

