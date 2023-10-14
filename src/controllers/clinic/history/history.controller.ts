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
import { PetHistoryService } from './history.service';
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
import {
  PetHistory,
  IPetHistory,
} from 'src/database/schemas/clinic/pet-history';

@ApiTags('PetHistory')
@Controller('/api/history')
export class PetHistoryController {
  constructor(private readonly historyService: PetHistoryService) {}

  @ApiOperation({
    summary: 'Create a new history',
    operationId: 'createPetHistory',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The history has been successfully created.',
    type: PetHistory,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() history: PetHistory) {
    return this.historyService.create(history);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all historys',
    operationId: 'findAllPetHistory',
  })
  @ApiOkResponse({
    description: 'Retrieved all historys successfully.',
    type: [PetHistory],
  })
  @Get('find_all')
  findAll() {
    return this.historyService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a history by ID',
    operationId: 'findOnePetHistory',
  })
  @ApiOkResponse({
    description: 'Retrieved history successfully.',
    type: PetHistory,
  })
  @ApiNotFoundResponse({ description: 'PetHistory not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @ApiOperation({
    summary: 'Retrieve a history list by idm',
    operationId: 'findByIdm',
  })
  @ApiOkResponse({
    description: 'Retrieved history successfully.',
    type: PetHistory,
  })
  @ApiNotFoundResponse({ description: 'PetHistory not found.' })
  @Get('find_by_idm/:id')
  findByIdm(
    @Param('id') id: number,
    @Query('loadedCount') loadedCount?: number,
    @Query('skip') skip?: number,
  ): Promise<IPetHistory[]> {
    if (!loadedCount) {
      loadedCount = 10; // valor por defecto
    }
    return this.historyService.findAllByIdm(id, loadedCount, skip);
  }

  @ApiOperation({
    summary: 'Update a history by ID',
    operationId: 'updatePetHistory',
  })
  @ApiOkResponse({
    description: 'The history has been successfully updated.',
    type: PetHistory,
  })
  @ApiNotFoundResponse({ description: 'history not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: PetHistory })
  update(@Param('id') id: string, @Body() history: PetHistory) {
    return this.historyService.update(id, history);
  }

  @ApiOperation({
    summary: 'Remove a history by ID',
    operationId: 'removePetHistory',
  })
  @ApiOkResponse({ description: 'The history has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'history not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all historys with pagination',
    operationId: 'findAllPagingPetHistory',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all historys paginated.',
    type: [PetHistory],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return 'all de historys paginated';
  }
}
