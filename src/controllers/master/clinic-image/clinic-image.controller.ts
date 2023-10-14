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
import { ClinicImageService } from '../../../services/master/clinic-image.service';
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
import { ClinicImage } from 'src/database/schemas/master/clinic-image';

@ApiTags('ClinicImage')
@Controller('/api/clinic-image')
export class ClinicImageController {
  constructor(private readonly clinicImageService: ClinicImageService) {}

  @ApiOperation({
    summary: 'Create a new clinicImage',
    operationId: 'createClinicImage',
  })
  @Post('save')
  @ApiCreatedResponse({
    description: 'The clinicImage has been successfully created.',
    type: ClinicImage,
  })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiBody({ type: ClinicImage })
  create(@Body() clinicImage: ClinicImage) {
    return this.clinicImageService.create(clinicImage);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all clinicImages',
    operationId: 'findAllClinicImage',
  })
  @ApiOkResponse({
    description: 'Retrieved all clinicImages successfully.',
    type: [ClinicImage],
  })
  @Get('find_all')
  findAll() {
    return this.clinicImageService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a clinicImage by ID',
    operationId: 'findOneClinicImage',
  })
  @ApiOkResponse({
    description: 'Retrieved clinicImage successfully.',
    type: ClinicImage,
  })
  @ApiNotFoundResponse({ description: 'ClinicImage not found.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.clinicImageService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a clinicImage by ID',
    operationId: 'updateClinicImage',
  })
  @ApiOkResponse({
    description: 'The clinicImage has been successfully updated.',
    type: ClinicImage,
  })
  @ApiNotFoundResponse({ description: 'clinicImage not found.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @Patch('update/:id')
  @ApiBody({ type: ClinicImage })
  update(@Param('id') id: string, @Body() clinicImage: ClinicImage) {
    return this.clinicImageService.update(id, clinicImage);
  }

  @ApiOperation({
    summary: 'Remove a clinicImage by ID',
    operationId: 'removeClinicImage',
  })
  @ApiOkResponse({
    description: 'The clinicImage has been successfully removed.',
  })
  @ApiNotFoundResponse({ description: 'clinicImage not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    console.log(id)
    return this.clinicImageService.remove(id);
  }

  @Get('find_all/paging')
  @ApiOperation({
    summary: 'Get all clinicImages with pagination',
    operationId: 'findAllPagingClinicImage',
  })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: 'Return all clinicImages paginated.',
    type: [ClinicImage],
  })
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.clinicImageService.findAllPaging(filter, page, pageSize);
  }
}
