import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RestOrderItemDto {
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

  @IsOptional()
  addedAt?: Date;
}

export class UpdateRestOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RestOrderItemDto)
  orders: RestOrderItemDto[];
}

