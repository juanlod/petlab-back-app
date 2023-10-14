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
import { ProductType } from 'src/database/schemas/store/product-type';
import { ProductTypeService } from './product-type.service';

@ApiTags('ProductType')
@Controller('/api/productType')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @ApiOperation({
    summary: 'Create a new productType',
    operationId: 'createProductType',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The productType has been successfully created.',
    type: ProductType,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() productType: ProductType) {
    return this.productTypeService.create(productType);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all productTypes',
    operationId: 'findAllProductType',
  })
  @ApiOkResponse({
    description: 'Retrieved all productTypes successfully.',
    type: [ProductType],
  })
  @Get('find_all')
  findAll() {
    return this.productTypeService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a productType by ID',
    operationId: 'findOneProductType',
  })
  @ApiOkResponse({
    description: 'Retrieved productType successfully.',
    type: ProductType,
  })
  @ApiNotFoundResponse({ description: 'ProductType not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string): Promise<ProductType> {
    return this.productTypeService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a productType by ID',
    operationId: 'updateProductType',
  })
  @ApiOkResponse({
    description: 'The productType has been successfully updated.',
    type: ProductType,
  })
  @ApiNotFoundResponse({ description: 'productType not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: ProductType })
  update(@Param('id') id: string, @Body() productType: ProductType) {
    return this.productTypeService.update(id, productType);
  }

  @ApiOperation({
    summary: 'Remove a productType by ID',
    operationId: 'removeProductType',
  })
  @ApiOkResponse({
    description: 'The product type has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'productType not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all productTypes with pagination',
    operationId: 'findAllPagingProductType',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all productTypes paginated.',
    type: [ProductType],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.productTypeService.findAllPaging(filter, page, pageSize);
  }
}
