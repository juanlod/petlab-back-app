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
import { StoreProvider } from 'src/database/schemas/store/store-provider';
import { StoreProviderService } from './store-provider.service';

@ApiTags('StoreProvider')
@Controller('/api/storeProvider')
export class StoreProviderController {
  constructor(private readonly storeProviderService: StoreProviderService) {}

  @ApiOperation({
    summary: 'Create a new storeProvider',
    operationId: 'createStoreProvider',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The storeProvider has been successfully created.',
    type: StoreProvider,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() storeProvider: StoreProvider) {
    return this.storeProviderService.create(storeProvider);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all storeProviders',
    operationId: 'findAllStoreProvider',
  })
  @ApiOkResponse({
    description: 'Retrieved all storeProviders successfully.',
    type: [StoreProvider],
  })
  @Get('find_all')
  findAll() {
    return this.storeProviderService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a storeProvider by ID',
    operationId: 'findOneStoreProvider',
  })
  @ApiOkResponse({
    description: 'Retrieved storeProvider successfully.',
    type: StoreProvider,
  })
  @ApiNotFoundResponse({ description: 'StoreProvider not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string): Promise<StoreProvider> {
    return this.storeProviderService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a storeProvider by ID',
    operationId: 'updateStoreProvider',
  })
  @ApiOkResponse({
    description: 'The storeProvider has been successfully updated.',
    type: StoreProvider,
  })
  @ApiNotFoundResponse({ description: 'storeProvider not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: StoreProvider })
  update(@Param('id') id: string, @Body() storeProvider: StoreProvider) {
    return this.storeProviderService.update(id, storeProvider);
  }

  @ApiOperation({
    summary: 'Remove a storeProvider by ID',
    operationId: 'removeStoreProvider',
  })
  @ApiOkResponse({
    description: 'The storeProvider has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'storeProvider not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.storeProviderService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all storeProviders with pagination',
    operationId: 'findAllPagingStoreProvider',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all storeProviders paginated.',
    type: [StoreProvider],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.storeProviderService.findAllPaging(filter, page, pageSize);
  }
}
