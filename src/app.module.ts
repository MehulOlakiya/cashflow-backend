import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ProductsModule } from './products/products.module';
import { BillsModule } from './bills/bills.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/cashflow',
    ),
    UsersModule,
    TransactionsModule,
    ProductsModule,
    BillsModule,
    WhatsAppModule,
    RestModule,
  ],
})
export class AppModule {}
