import {
  Controller,
  Post,
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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  /**
   * POST /transactions
   * Create a new income or expense transaction for the authenticated user.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: any, @Body() dto: CreateTransactionDto) {
    const transaction = await this.transactionsService.create(
      req.user.userId,
      dto,
    );
    return this.toResponse(transaction);
  }

  /**
   * GET /transactions
   * List all transactions for the authenticated user.
   * Optional query params: type, category, paymentType, from, to (YYYY-MM-DD)
   */
  @Get()
  async findAll(@Request() req: any, @Query() query: TransactionQueryDto) {
    const transactions = await this.transactionsService.findAll(
      req.user.userId,
      query,
    );
    return transactions.map((t) => this.toResponse(t));
  }

  /**
   * GET /transactions/summary
   * Get aggregated income/expense totals for the authenticated user.
   * Optional query params: from, to (YYYY-MM-DD)
   */
  @Get('summary')
  async getSummary(@Request() req: any, @Query() query: TransactionQueryDto) {
    return this.transactionsService.getSummary(req.user.userId, query);
  }

  /**
   * GET /transactions/:id
   * Get a single transaction by ID.
   */
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(
      req.user.userId,
      id,
    );
    return this.toResponse(transaction);
  }

  /**
   * DELETE /transactions/:id
   * Delete a transaction by ID.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req: any, @Param('id') id: string) {
    await this.transactionsService.remove(req.user.userId, id);
  }

  private toResponse(t: any) {
    return {
      id: t._id.toString(),
      userId: t.userId.toString(),
      amount: t.amount,
      type: t.type,
      category: t.category,
      paymentType: t.paymentType,
      note: t.note,
      date: t.date,
      createdAt: t.createdAt,
    };
  }
}
