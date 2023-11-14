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
import { DebtService } from '../../../services/clinic/debt.service';
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
import { Debt } from 'src/database/schemas/clinic/debts';

@ApiTags('Debt')
@Controller('/api/debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @ApiOperation({
    summary: 'Create a new debt',
    operationId: 'createDebt',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The debt has been successfully created.',
    type: Debt,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: Debt })
  create(@Body() debt: Debt) {
    return this.debtService.create(debt);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all debts',
    operationId: 'findAllDebt',
  })
  @ApiOkResponse({
    description: 'Retrieved all debts successfully.',
    type: [Debt],
  })
  @Get('find_all')
  findAll() {
    return this.debtService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a debt by ID',
    operationId: 'findOneDebt',
  })
  @ApiOkResponse({
    description: 'Retrieved debt successfully.',
    type: Debt,
  })
  @ApiNotFoundResponse({ description: 'Debt not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a debt by ID',
    operationId: 'updateDebt',
  })
  @ApiOkResponse({
    description: 'The debt has been successfully updated.',
    type: Debt,
  })
  @ApiNotFoundResponse({ description: 'debt not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Debt })
  update(@Param('id') id: number, @Body() debt: Debt) {
    return this.debtService.update(id, debt);
  }

  @ApiOperation({
    summary: 'Remove a debt by ID',
    operationId: 'removeDebt',
  })
  @ApiOkResponse({ description: 'The debt has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'debt not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.debtService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all debts with pagination',
    operationId: 'findAllPagingDebt',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all debts paginated.',
    type: [Debt],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.debtService.findAllPaging(filter, page, pageSize);
  }
}
