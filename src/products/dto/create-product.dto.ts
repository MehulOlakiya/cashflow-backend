import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Matches,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
  purchasePrice: number;

  @IsNumber()
  @Min(0)
  sellingPrice: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^SL-\d{3}-[A-Z]$/, {
    message: 'ledgerCode must follow format SL-XXX-X (e.g. SL-123-A)',
  })
  ledgerCode: string;

  @IsEnum(['qr', 'barcode'])
  @IsOptional()
  codeType?: 'qr' | 'barcode';
}
