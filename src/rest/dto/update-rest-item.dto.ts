import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateRestItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

