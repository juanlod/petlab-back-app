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
import { SpeciesService } from './species.service';
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
import { Species, ISpecies } from 'src/database/schemas/master/species';

@ApiTags('Species')
@Controller('/api/species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiOperation({
    summary: 'Create a new species',
    operationId: 'createSpecies',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The species has been successfully created.',
    type: Species,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: Species })
  create(@Body() species: ISpecies) {
    return this.speciesService.create(species);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all speciess',
    operationId: 'findAllSpecies',
  })
  @ApiOkResponse({
    description: 'Retrieved all speciess successfully.',
    type: [Species],
  })
  @Get('find_all')
  findAll() {
    return this.speciesService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a species by ID',
    operationId: 'findOneSpecies',
  })
  @ApiOkResponse({
    description: 'Retrieved species successfully.',
    type: Species,
  })
  @ApiNotFoundResponse({ description: 'Species not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string): Promise<Species> {
    return this.speciesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a species by ID',
    operationId: 'updateSpecies',
  })
  @ApiOkResponse({
    description: 'The species has been successfully updated.',
    type: Species,
  })
  @ApiNotFoundResponse({ description: 'species not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Species })
  update(@Param('id') id: string, @Body() species: Species) {
    return this.speciesService.update(id, species);
  }

  @ApiOperation({
    summary: 'Remove a species by ID',
    operationId: 'removeSpecies',
  })
  @ApiOkResponse({ description: 'The species has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'species not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all speciess with pagination',
    operationId: 'findAllPagingSpecies',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all speciess paginated.',
    type: [Species],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.speciesService.findAllPaging(filter, page, pageSize);
  }
}
