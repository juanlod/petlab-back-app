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
import { CoatService } from '../../../services/master/coat.service';
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
import { ICoat, Coat } from 'src/database/schemas/master/coat';

@ApiTags('Coat')
@Controller('/api/coat')
export class CoatController {
  constructor(private readonly coatService: CoatService) {}

  @ApiOperation({
    summary: 'Create a new coat',
    operationId: 'createCoat',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The coat has been successfully created.',
    type: Coat,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: Coat })
  create(@Body() coat: Coat) {
    return this.coatService.create(coat);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all coats',
    operationId: 'findAllCoat',
  })
  @ApiOkResponse({
    description: 'Retrieved all coats successfully.',
    type: [Coat],
  })
  @Get('find_all')
  findAll() {
    return this.coatService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a coat by ID',
    operationId: 'findOneCoat',
  })
  @ApiOkResponse({
    description: 'Retrieved coat successfully.',
    type: Coat,
  })
  @ApiNotFoundResponse({ description: 'Coat not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.coatService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a coat by ID',
    operationId: 'updateCoat',
  })
  @ApiOkResponse({
    description: 'The coat has been successfully updated.',
    type: Coat,
  })
  @ApiNotFoundResponse({ description: 'coat not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Coat })
  update(@Param('id') id: string, @Body() coat: Coat) {
    return this.coatService.update(id, coat);
  }

  @ApiOperation({
    summary: 'Remove a coat by ID',
    operationId: 'removeCoat',
  })
  @ApiOkResponse({ description: 'The coat has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'coat not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.coatService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all coats with pagination',
    operationId: 'findAllPagingCoat',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all coats paginated.',
    type: [Coat],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.coatService.findAllPaging(filter, page, pageSize);
  }
}
