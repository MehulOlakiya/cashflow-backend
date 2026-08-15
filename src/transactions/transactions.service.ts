import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    userId: string,
    dto: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    const transaction = new this.transactionModel({
      ...dto,
      note: dto.note ?? '',
      userId: new Types.ObjectId(userId),
    });
    return transaction.save();
  }

  async createMany(
    userId: string,
    dtos: CreateTransactionDto[],
  ): Promise<TransactionDocument[]> {
    const ownerId = new Types.ObjectId(userId);
    const transactions = dtos.map((dto) => ({
      ...dto,
      note: dto.note ?? '',
      userId: ownerId,
    }));

    return this.transactionModel.insertMany(transactions, { ordered: true });
  }

  async findAll(
    userId: string,
    query: TransactionQueryDto,
  ): Promise<TransactionDocument[]> {
    const filter: Record<string, any> = {
      userId: new Types.ObjectId(userId),
    };

    if (query.type) filter.type = query.type;
    if (query.category) filter.category = query.category;
    if (query.paymentType) filter.paymentType = query.paymentType;

    if (query.from || query.to) {
      filter.date = {};
      if (query.from) filter.date.$gte = query.from;
      if (query.to) filter.date.$lte = query.to;
    }

    return this.transactionModel
      .find(filter)
      .sort({ date: -1, createdAt: -1 })
      .exec();
  }

  async findOne(userId: string, id: string): Promise<TransactionDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Transaction not found');
    }
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    if (transaction.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return transaction;
  }

  async remove(userId: string, id: string): Promise<void> {
    const transaction = await this.findOne(userId, id);
    await this.transactionModel.findByIdAndDelete(transaction._id).exec();
  }

  async getSummary(
    userId: string,
    query: TransactionQueryDto,
  ): Promise<{
    totalIncome: number;
    totalExpense: number;
    cashIncome: number;
    onlineIncome: number;
    cashExpense: number;
    onlineExpense: number;
    net: number;
  }> {
    const filter: Record<string, any> = {
      userId: new Types.ObjectId(userId),
    };
    if (query.from || query.to) {
      filter.date = {};
      if (query.from) filter.date.$gte = query.from;
      if (query.to) filter.date.$lte = query.to;
    }

    const results = await this.transactionModel
      .aggregate([
        { $match: filter },
        {
          $group: {
            _id: { type: '$type', paymentType: '$paymentType' },
            total: { $sum: '$amount' },
          },
        },
      ])
      .exec();

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      cashIncome: 0,
      onlineIncome: 0,
      cashExpense: 0,
      onlineExpense: 0,
      net: 0,
    };

    for (const r of results) {
      const { type, paymentType } = r._id as {
        type: string;
        paymentType: string;
      };
      const total: number = r.total as number;
      if (type === 'income') {
        summary.totalIncome += total;
        if (paymentType === 'cash') summary.cashIncome += total;
        else summary.onlineIncome += total;
      } else {
        summary.totalExpense += total;
        if (paymentType === 'cash') summary.cashExpense += total;
        else summary.onlineExpense += total;
      }
    }

    summary.net = summary.totalIncome - summary.totalExpense;
    return summary;
  }
}
