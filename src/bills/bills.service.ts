import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bill, BillDocument } from './schemas/bill.schema';
import { CreateBillDto } from './dto/create-bill.dto';
import { CollectBillPaymentDto } from './dto/collect-bill-payment.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill.name)
    private readonly billModel: Model<BillDocument>,
  ) {}

  async create(userId: string, dto: CreateBillDto): Promise<BillDocument> {
    const items = dto.items.map((item) => ({
      name: item.name.trim(),
      quantity: item.quantity,
      unitPrice: this.roundCurrency(item.unitPrice),
      amount: this.roundCurrency(item.quantity * item.unitPrice),
    }));
    const subtotal = this.roundCurrency(
      items.reduce((sum, item) => sum + item.amount, 0),
    );
    const requestedDiscount =
      dto.discountAmount ??
      (subtotal * Math.max(0, dto.discountPercent ?? 0)) / 100;
    const discountAmount = this.roundCurrency(
      Math.min(subtotal, Math.max(0, requestedDiscount)),
    );
    const discountPercent =
      subtotal > 0
        ? this.roundCurrency((discountAmount / subtotal) * 100)
        : 0;
    const grandTotal = this.roundCurrency(subtotal - discountAmount);
    const amountReceived = this.roundCurrency(
      Math.min(grandTotal, Math.max(0, dto.amountReceived ?? grandTotal)),
    );
    const amountRemaining = this.roundCurrency(grandTotal - amountReceived);

    const bill = new this.billModel({
      customerName: dto.customerName ?? '',
      customerMobile: dto.customerMobile ?? '',
      items,
      subtotal,
      discountPercent,
      discountAmount,
      grandTotal,
      paymentMethod: dto.paymentMethod ?? 'cash',
      amountReceived,
      amountRemaining,
      userId: new Types.ObjectId(userId),
    });
    return bill.save();
  }

  async findAll(
    userId: string,
    from?: string,
    to?: string,
  ): Promise<BillDocument[]> {
    const filter: Record<string, any> = {
      userId: new Types.ObjectId(userId),
    };
    const dateFilter: Record<string, Date> = {};
    if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
      dateFilter.$gte = new Date(`${from}T00:00:00.000+05:30`);
    }
    if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) {
      dateFilter.$lte = new Date(`${to}T23:59:59.999+05:30`);
    }
    if (Object.keys(dateFilter).length > 0) {
      filter.createdAt = dateFilter;
    }

    return this.billModel
      .find(filter)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(userId: string, id: string): Promise<BillDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Bill not found');
    }
    const bill = await this.billModel.findById(id).exec();
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    if (bill.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return bill;
  }

  async collectPayment(
    userId: string,
    id: string,
    dto: CollectBillPaymentDto,
  ): Promise<BillDocument> {
    const existingBill = await this.findOne(userId, id);
    const amount = this.roundCurrency(dto.amount);
    const remaining = this.roundCurrency(
      Math.max(0, Number(existingBill.amountRemaining ?? 0)),
    );

    if (remaining === 0) {
      throw new BadRequestException('This bill is already fully paid');
    }
    if (amount > remaining) {
      throw new BadRequestException(
        `Payment cannot exceed the remaining amount of ${remaining.toFixed(2)}`,
      );
    }

    const updatedBill = await this.billModel
      .findOneAndUpdate(
        {
          _id: existingBill._id,
          userId: new Types.ObjectId(userId),
          amountRemaining: { $gte: amount },
        },
        {
          $inc: {
            amountReceived: amount,
            amountRemaining: -amount,
          },
          $push: {
            paymentCollections: {
              amount,
              paymentMethod: dto.paymentMethod,
              collectedAt: new Date(),
            },
          },
        },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedBill) {
      throw new BadRequestException(
        'The remaining balance changed. Refresh and try again.',
      );
    }

    updatedBill.amountReceived = this.roundCurrency(updatedBill.amountReceived);
    updatedBill.amountRemaining = this.roundCurrency(
      Math.max(0, updatedBill.amountRemaining),
    );
    return updatedBill.save();
  }

  async remove(userId: string, id: string): Promise<void> {
    const bill = await this.findOne(userId, id);
    await this.billModel.findByIdAndDelete(bill._id).exec();
  }

  private toResponse(bill: BillDocument) {
    return {
      id: (bill._id as Types.ObjectId).toString(),
      createdAt: (bill as any).createdAt,
      customer: {
        name: bill.customerName,
        mobile: bill.customerMobile,
      },
      items: bill.items,
      subtotal: bill.subtotal,
      discountPercent: bill.discountPercent,
      discountAmount: bill.discountAmount,
      grandTotal: bill.grandTotal,
      paymentMethod: bill.paymentMethod,
      amountReceived: bill.amountReceived,
      amountRemaining: bill.amountRemaining,
      status: bill.amountRemaining > 0 ? 'due' : 'paid',
      paymentCollections: bill.paymentCollections,
    };
  }

  private roundCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
