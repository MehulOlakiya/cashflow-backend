import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * POST /products
   * Add a new product/inventory item for the authenticated user.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: any, @Body() dto: CreateProductDto) {
    const product = await this.productsService.create(req.user.userId, dto);
    return this.toResponse(product);
  }

  /**
   * GET /products
   * List all products for the authenticated user.
   */
  @Get()
  async findAll(@Request() req: any) {
    const products = await this.productsService.findAll(req.user.userId);
    return products.map((p) => this.toResponse(p));
  }

  /**
   * GET /products/:id
   * Get a single product by ID.
   */
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    const product = await this.productsService.findOne(req.user.userId, id);
    return this.toResponse(product);
  }

  /**
   * PATCH /products/:id
   * Update a product by ID.
   */
  @Patch(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(req.user.userId, id, dto);
    return this.toResponse(product);
  }

  /**
   * DELETE /products/:id
   * Delete a product by ID.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req: any, @Param('id') id: string) {
    await this.productsService.remove(req.user.userId, id);
  }

  private toResponse(product: any) {
    return {
      id: product._id,
      name: product.name,
      productType: product.productType,
      initialStock: product.initialStock,
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      ledgerCode: product.ledgerCode,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
