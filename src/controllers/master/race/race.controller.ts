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
import { RaceService } from './race.service';
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
import { Race, IRace } from 'src/database/schemas/master/race';

@ApiTags('Race')
@Controller('/api/race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @ApiOperation({
    summary: 'Create a new race',
    operationId: 'createRace',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The race has been successfully created.',
    type: Race,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: Race })
  create(@Body() race: IRace) {
    return this.raceService.create(race);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all races',
    operationId: 'findAllRace',
  })
  @ApiOkResponse({
    description: 'Retrieved all races successfully.',
    type: [Race],
  })
  @Get('find_all')
  findAll() {
    return this.raceService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a race by ID',
    operationId: 'findOneRace',
  })
  @ApiOkResponse({
    description: 'Retrieved race successfully.',
    type: Race,
  })
  @ApiNotFoundResponse({ description: 'Race not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a race by ID',
    operationId: 'updateRace',
  })
  @ApiOkResponse({
    description: 'The race has been successfully updated.',
    type: Race,
  })
  @ApiNotFoundResponse({ description: 'race not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: Race })
  update(@Param('id') id: string, @Body() race: Race) {
    return this.raceService.update(id, race);
  }

  @ApiOperation({
    summary: 'Remove a race by ID',
    operationId: 'removeRace',
  })
  @ApiOkResponse({ description: 'The race has been successfully removed.' })
  @ApiNotFoundResponse({ description: 'race not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all races with pagination',
    operationId: 'findAllPagingRace',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all races paginated.',
    type: [Race],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.raceService.findAllPaging(filter, page, pageSize);
  }
}
