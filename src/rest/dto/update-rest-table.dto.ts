import { IsString, IsOptional, IsNumber, Min, IsIn } from 'class-validator';

export class UpdateRestTableDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  tableNumber?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @IsIn(['empty', 'occupied'])
  @IsOptional()
  status?: 'empty' | 'occupied';
}

