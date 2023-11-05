import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
0;
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { IProduct, Product } from 'src/database/schemas/store/product';
import { ProductService } from '../../../services/store/product.service';

@ApiTags('Product')
@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Create a new product',
    operationId: 'createProduct',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() product: Product) {
    return this.productService.create(product);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all products',
    operationId: 'findAllProduct',
  })
  @ApiOkResponse({
    description: 'Retrieved all products successfully.',
    type: [Product],
  })
  @Get('find_all')
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a list of all products by type',
    operationId: 'findAllProductByType',
  })
  @ApiOkResponse({
    description: 'Retrieved all products successfully.',
    type: [Product],
  })
  @Get('find_all/:type')
  findAllByType(@Param('type') type: string) {
    return this.productService.findAllByType(type);
  }

  @ApiOperation({
    summary: 'Retrieve a product by ID',
    operationId: 'findOneProduct',
  })
  @ApiOkResponse({
    description: 'Retrieved product successfully.',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string): Promise<IProduct> {
    return this.productService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a product by ID',
    operationId: 'updateProduct',
  })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'product not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Product })
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productService.update(id, product);
  }

  @ApiOperation({
    summary: 'Remove a product by ID',
    operationId: 'removeProduct',
  })
  @ApiOkResponse({ description: 'The product has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'product not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all products with pagination',
    operationId: 'findAllPagingProduct',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all products paginated.',
    type: [Product],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.productService.findAllPaging(filter, page, pageSize);
  }
}
