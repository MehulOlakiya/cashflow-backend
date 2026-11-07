import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateRestTableDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  tableNumber?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;
}

