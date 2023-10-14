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
import { UnityType } from 'src/database/schemas/store/unity-type';
import { UnityTypeService } from './unity-type.service';

@ApiTags('UnityType')
@Controller('/api/unityType')
export class UnityTypeController {
  constructor(private readonly unityTypeService: UnityTypeService) {}

  @ApiOperation({
    summary: 'Create a new unityType',
    operationId: 'createUnityType',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The unityType has been successfully created.',
    type: UnityType,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  create(@Body() unityType: UnityType) {
    return this.unityTypeService.create(unityType);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all unityTypes',
    operationId: 'findAllUnityType',
  })
  @ApiOkResponse({
    description: 'Retrieved all unityTypes successfully.',
    type: [UnityType],
  })
  @Get('find_all')
  findAll() {
    return this.unityTypeService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a unityType by ID',
    operationId: 'findOneUnityType',
  })
  @ApiOkResponse({
    description: 'Retrieved unityType successfully.',
    type: UnityType,
  })
  @ApiNotFoundResponse({ description: 'UnityType not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string): Promise<UnityType> {
    return this.unityTypeService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a unityType by ID',
    operationId: 'updateUnityType',
  })
  @ApiOkResponse({
    description: 'The unityType has been successfully updated.',
    type: UnityType,
  })
  @ApiNotFoundResponse({ description: 'unityType not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: UnityType })
  update(@Param('id') id: string, @Body() unityType: UnityType) {
    return this.unityTypeService.update(id, unityType);
  }

  @ApiOperation({
    summary: 'Remove a unityType by ID',
    operationId: 'removeUnityType',
  })
  @ApiOkResponse({
    description: 'The product type has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'unityType not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.unityTypeService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all unity types with pagination',
    operationId: 'findAllPagingUnityType',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all unityTypes paginated.',
    type: [UnityType],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.unityTypeService.findAllPaging(filter, page, pageSize);
  }
}
