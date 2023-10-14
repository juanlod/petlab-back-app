import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { PetService } from './pets.service';
import { Auth } from 'auth/auth.decorator';
import { Role } from 'auth/role';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiProduces,
  ApiBody,
} from '@nestjs/swagger';
import { Pet } from 'src/database/schemas/clinic/pet';

@Controller('api/pets')
@ApiTags('Pets')
export class PetsController {
  private readonly logger = new Logger(PetsController.name);

  constructor(private readonly petService: PetService) {}

  /**
   * save
   * @param pet
   * @returns
   */
  @Post('save')
  @ApiOperation({ summary: 'Create a new pet', operationId: 'createPet' })
  @ApiResponse({
    status: 201,
    description: 'The pet has been successfully created.',
    type: Pet,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: Pet })
  @ApiProduces('application/json')
  create(@Body() pet: Pet): Promise<Pet> {
    return this.petService.create(pet);
  }

  /**
   * findAllPet
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener todos los petes',
    operationId: 'findAllPet',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los petes',
    type: [Pet],
  })
  @Get('find_all')
  @ApiProduces('application/json')
  findAll(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  /**
   * findAllPagingPet
   * @param filter : ;
   * @param page
   * @param pageSize
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener petes paginados',
    operationId: 'findAllPagingPet',
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filtro para buscar petes',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Número de elementos por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de petes paginados',
    type: [Pet],
  })
  @Get('find_all/paging')
  @Auth(Role.Admin)
  @ApiProduces('application/json')
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.petService.findAllPaging(filter, page, pageSize);
  }

  /**
   * findOne
   * @param id
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener un pete por id',
    operationId: 'findOnePet',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID del pete a buscar',
  })
  @ApiResponse({
    status: 200,
    description: 'El pete ha sido encontrado satisfactoriamente',
    type: Pet,
  })
  @ApiResponse({ status: 404, description: 'El pete no ha sido encontrado' })
  @Get('find_one/:id')
  @ApiProduces('application/json')
  findOne(@Param('id') id: string): Promise<Pet> {
    return this.petService.findOne(id);
  }

  /**
   * update
   * @param id
   * @param pet
   * @returns
   */
  @Patch('update/:id')
  @ApiOperation({
    summary: 'Actualizar un pete por id',
    operationId: 'updatePet',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID del pete a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'El pete ha sido actualizado satisfactoriamente',
  })
  @ApiResponse({ status: 404, description: 'El pete no ha sido encontrado' })
  @ApiBody({ type: Pet })
  @ApiProduces('application/json')
  update(@Param('id') id: string, @Body() pet: Pet) {
    return this.petService.update(id, pet);
  }

  /**
   * delete
   * @param id
   * @returns
   */
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Eliminar un pete por id',
    operationId: 'removePet',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID del pete a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'El pete ha sido eliminado satisfactoriamente',
  })
  @ApiResponse({ status: 404, description: 'El pete no ha sido encontrado' })
  @ApiBody({ type: String })
  @ApiProduces('application/json')
  remove(@Param('id') id: string) {
    return this.petService.remove(+id);
  }
}
