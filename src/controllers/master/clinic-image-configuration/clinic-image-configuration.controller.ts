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
import { ClinicImageConfigurationService } from '../../../services/master/clinic-image-configuration.service';
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
import { ClinicImageConfiguration } from 'src/database/schemas/master/clinic-image-configuration';

@ApiTags('ClinicImageConfiguration')
@Controller('/api/clinic-image-configuarion')
export class ClinicImageConfigurationController {
  constructor(
    private readonly clinicImageService: ClinicImageConfigurationService,
  ) {}

  @ApiOperation({
    summary: 'Create a new clinicImage',
    operationId: 'createClinicImageConfiguration',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The clinicImage has been successfully created.',
    type: ClinicImageConfiguration,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: ClinicImageConfiguration })
  create(@Body() clinicImage: ClinicImageConfiguration) {
    return this.clinicImageService.create(clinicImage);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all clinicImages',
    operationId: 'findAllClinicImageConfiguration',
  })
  @ApiOkResponse({
    description: 'Retrieved all clinicImages successfully.',
    type: [ClinicImageConfiguration],
  })
  @Get('find_all')
  findAll() {
    return this.clinicImageService.getConfig();
  }

  @ApiOperation({
    summary: 'Retrieve a clinicImage by ID',
    operationId: 'findOneClinicImageConfiguration',
  })
  @ApiOkResponse({
    description: 'Retrieved clinicImage successfully.',
    type: ClinicImageConfiguration,
  })
  @ApiNotFoundResponse({ description: 'ClinicImageConfiguration not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.clinicImageService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a clinicImage by ID',
    operationId: 'updateClinicImageConfiguration',
  })
  @ApiOkResponse({
    description: 'The clinicImage has been successfully updated.',
    type: ClinicImageConfiguration,
  })
  @ApiNotFoundResponse({ description: 'clinicImage not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: ClinicImageConfiguration })
  update(
    @Param('id') id: string,
    @Body() clinicImage: ClinicImageConfiguration,
  ) {
    return this.clinicImageService.update(id, clinicImage);
  }

  @ApiOperation({
    summary: 'Remove a clinicImage by ID',
    operationId: 'removeClinicImageConfiguration',
  })
  @ApiOkResponse({
    description: 'The clinicImage has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'clinicImage not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    console.log(id);
    return this.clinicImageService.remove(id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all clinicImages with pagination',
    operationId: 'findAllPagingClinicImageConfiguration',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all clinicImages paginated.',
    type: [ClinicImageConfiguration],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.clinicImageService.findAllPaging(filter, page, pageSize);
  }
}
