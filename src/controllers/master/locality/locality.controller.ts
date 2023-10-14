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
import { LocalityService } from '../../../services/master/locality.service';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Locality } from 'src/database/schemas/master/locality';

@ApiTags('Locality')
@Controller('/api/locality')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  @ApiOperation({
    summary: 'Create a new locality',
    operationId: 'createLocality',
  })
  @Post('/save')
  @ApiCreatedResponse({
    description: 'The locality has been successfully created.',
    type: Locality,
  })
  @ApiBadRequestResponse({
    description: 'The request body is invalid.',
  })
  @ApiBody({ type: Locality })
  create(@Body() locality: Locality) {
    return this.localityService.create(locality);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all localities',
    operationId: 'findAllLocality',
  })
  @ApiOkResponse({
    description: 'Retrieved all localities successfully.',
    type: [Locality],
  })
  @Get('find_all')
  findAll() {
    return this.localityService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a locality by ID',
    operationId: 'findOneLocality',
  })
  @ApiOkResponse({
    description: 'Retrieved locality successfully.',
    type: Locality,
  })
  @ApiNotFoundResponse({ description: 'Locality not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.localityService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a locality by ID',
    operationId: 'updateLocality',
  })
  @ApiOkResponse({
    description: 'The locality has been successfully updated.',
    type: Locality,
  })
  @ApiNotFoundResponse({ description: 'Locality not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Locality })
  update(@Param('id') id: string, @Body() locality: Locality) {
    return this.localityService.update(id, locality);
  }

  @ApiOperation({
    summary: 'Remove a locality by ID',
    operationId: 'removeLocality',
  })
  @ApiOkResponse({ description: 'The locality has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'Locality not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.localityService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all localities with pagination',
    operationId: 'findAllPagingLocality',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all localities paginated.',
    type: [Locality],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.localityService.findAllPaging(filter, page, pageSize);
  }
}
