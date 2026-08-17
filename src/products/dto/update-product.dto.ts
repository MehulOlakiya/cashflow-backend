import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsEnum(['Pant', 'Shirt', 'T-shirt', 'Other'])
  @IsOptional()
  productType?: 'Pant' | 'Shirt' | 'T-shirt' | 'Other';

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  initialStock?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  purchasePrice?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  sellingPrice?: number;

  @IsString()
  @IsOptional()
  @Matches(/^SL-\d{3}-[A-Z]$/, {
    message: 'ledgerCode must follow format SL-XXX-X (e.g. SL-123-A)',
  })
  ledgerCode?: string;

  @IsEnum(['qr', 'barcode'])
  @IsOptional()
  codeType?: 'qr' | 'barcode';
}
