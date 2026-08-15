import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { CollectBillPaymentDto } from './dto/collect-bill-payment.dto';

@Controller('bills')
@UseGuards(JwtAuthGuard)
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  /**
   * POST /bills
   * Create a new bill for the authenticated user.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: any, @Body() dto: CreateBillDto) {
    const bill = await this.billsService.create(req.user.userId, dto);
    return this.toResponse(bill);
  }

  /**
   * GET /bills
   * List all bills for the authenticated user, newest first.
   */
  @Get()
  async findAll(
    @Request() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const bills = await this.billsService.findAll(
      req.user.userId,
      from,
      to,
    );
    return bills.map((b) => this.toResponse(b));
  }

  /**
   * GET /bills/:id
   * Get a single bill by ID.
   */
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    const bill = await this.billsService.findOne(req.user.userId, id);
    return this.toResponse(bill);
  }

  /**
   * PATCH /bills/:id/payment
   * Collect a full or partial payment against an outstanding bill.
   */
  @Patch(':id/payment')
  async collectPayment(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: CollectBillPaymentDto,
  ) {
    const bill = await this.billsService.collectPayment(
      req.user.userId,
      id,
      dto,
    );
    return this.toResponse(bill);
  }

  /**
   * DELETE /bills/:id
   * Delete a bill by ID.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req: any, @Param('id') id: string) {
    await this.billsService.remove(req.user.userId, id);
  }

  private toResponse(bill: any) {
    return {
      id: bill._id?.toString() ?? bill.id,
      createdAt: bill.createdAt,
      customer: {
        name: bill.customerName ?? '',
        mobile: bill.customerMobile ?? '',
      },
      items: bill.items,
      subtotal: bill.subtotal,
      discountPercent: bill.discountPercent,
      discountAmount: bill.discountAmount,
      grandTotal: bill.grandTotal,
      paymentMethod: bill.paymentMethod ?? 'cash',
      amountReceived: bill.amountReceived ?? bill.grandTotal,
      amountRemaining: bill.amountRemaining ?? 0,
      status: (bill.amountRemaining ?? 0) > 0 ? 'due' : 'paid',
      paymentCollections: (bill.paymentCollections ?? []).map(
        (payment: any) => ({
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          collectedAt: payment.collectedAt,
        }),
      ),
    };
  }
}
