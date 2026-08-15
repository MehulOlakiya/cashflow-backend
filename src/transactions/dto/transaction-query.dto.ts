import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';

export class TransactionQueryDto {
  @IsOptional()
  @IsEnum(['income', 'expense'])
  type?: 'income' | 'expense';

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'from must be YYYY-MM-DD' })
  from?: string; // start date inclusive

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'to must be YYYY-MM-DD' })
  to?: string; // end date inclusive

  @IsOptional()
  @IsEnum(['cash', 'online'])
  paymentType?: 'cash' | 'online';
}
