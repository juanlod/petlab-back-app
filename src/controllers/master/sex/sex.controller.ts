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
import { SexService } from './sex.service';
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
import { Sex, ISex } from 'src/database/schemas/master/sex';

@ApiTags('Sex')
@Controller('/api/sex')
export class SexController {
  constructor(private readonly sexService: SexService) {}

  @ApiOperation({
    summary: 'Create a new sex',
    operationId: 'createSex',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The sex has been successfully created.',
    type: Sex,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: Sex })
  create(@Body() sex: ISex) {
    return this.sexService.create(sex);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all sexs',
    operationId: 'findAllSex',
  })
  @ApiOkResponse({
    description: 'Retrieved all sexs successfully.',
    type: [Sex],
  })
  @Get('find_all')
  findAll() {
    return this.sexService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a sex by ID',
    operationId: 'findOneSex',
  })
  @ApiOkResponse({
    description: 'Retrieved sex successfully.',
    type: Sex,
  })
  @ApiNotFoundResponse({ description: 'Sex not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.sexService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a sex by ID',
    operationId: 'updateSex',
  })
  @ApiOkResponse({
    description: 'The sex has been successfully updated.',
    type: Sex,
  })
  @ApiNotFoundResponse({ description: 'sex not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Sex })
  update(@Param('id') id: string, @Body() sex: Sex) {
    return this.sexService.update(id, sex);
  }

  @ApiOperation({
    summary: 'Remove a sex by ID',
    operationId: 'removeSex',
  })
  @ApiOkResponse({ description: 'The sex has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'sex not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.sexService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all sexs with pagination',
    operationId: 'findAllPagingSex',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all sexs paginated.',
    type: [Sex],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.sexService.findAllPaging(filter, page, pageSize);
  }
}
