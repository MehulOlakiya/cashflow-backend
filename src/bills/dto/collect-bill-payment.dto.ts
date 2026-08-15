import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CollectBillPaymentDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(['cash', 'online'])
  paymentMethod: 'cash' | 'online';
}
