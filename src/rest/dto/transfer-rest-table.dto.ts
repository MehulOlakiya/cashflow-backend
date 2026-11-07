import { IsNotEmpty, IsString } from 'class-validator';

export class TransferRestTableDto {
  @IsString()
  @IsNotEmpty()
  targetTableId: string;
}

