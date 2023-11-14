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
import { ProvinceService } from '../../../services/master/province.service';
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
import { Province } from 'src/database/schemas/master/province';

@ApiTags('Province')
@Controller('/api/province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @ApiOperation({
    summary: 'Create a new province',
    operationId: 'createProvince',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The province has been successfully created.',
    type: Province,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: Province })
  create(@Body() province: Province) {
    return this.provinceService.create(province);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all provinces',
    operationId: 'findAllProvince',
  })
  @ApiOkResponse({
    description: 'Retrieved all provinces successfully.',
    type: [Province],
  })
  @Get('find_all')
  findAll() {
    return this.provinceService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a province by ID',
    operationId: 'findOneProvince',
  })
  @ApiOkResponse({
    description: 'Retrieved province successfully.',
    type: Province,
  })
  @ApiNotFoundResponse({ description: 'Province not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a province by ID',
    operationId: 'updateProvince',
  })
  @ApiOkResponse({
    description: 'The province has been successfully updated.',
    type: Province,
  })
  @ApiNotFoundResponse({ description: 'province not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Province })
  update(@Param('id') id: number, @Body() province: Province) {
    return this.provinceService.update(id, province);
  }

  @ApiOperation({
    summary: 'Remove a province by ID',
    operationId: 'removeProvince',
  })
  @ApiOkResponse({ description: 'The province has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'province not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.provinceService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all provinces with pagination',
    operationId: 'findAllPagingProvince',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all provinces paginated.',
    type: [Province],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.provinceService.findAllPaging(filter, page, pageSize);
  }
}
