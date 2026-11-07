import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RestBillItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  itemTotal: number;
}

export class CreateRestBillDto {
  @IsString()
  @IsNotEmpty()
  tableId: string;

  @IsIn(['Cash', 'UPI / QR', 'Card', 'Other'])
  @IsOptional()
  paymentMode?: string;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsString()
  @IsOptional()
  customerPhone?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  tax?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RestBillItemDto)
  items?: RestBillItemDto[];
}

