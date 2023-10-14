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
import { ClientsService } from './clients.service';
import { Auth } from 'auth/auth.decorator';
import { Role } from 'auth/role';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiProduces,
  ApiBody,
} from '@nestjs/swagger';
import { Client, IClient } from 'src/database/schemas/clinic/client';

@Controller('api/clients')
@ApiTags('Clients')
export class ClientsController {
  private readonly logger = new Logger(ClientsController.name);

  constructor(private readonly clientsService: ClientsService) {}

  /**
   * save
   * @param client
   * @returns
   */
  @Post('save')
  @ApiOperation({ summary: 'Create a new client', operationId: 'createClient' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    type: Client,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: Client })
  @ApiProduces('application/json')
  create(@Body() client: Client): Promise<Client> {
    return this.clientsService.create(client);
  }

  /**
   * findAllClient
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener todos los clientes',
    operationId: 'findAllClient',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los clientes',
    type: [Client],
  })
  @Get('find_all')
  @ApiProduces('application/json')
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  /**
   * findAllPagingClient
   * @param filter : ;
   * @param page
   * @param pageSize
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener clientes paginados',
    operationId: 'findAllPagingClient',
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filtro para buscar clientes',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Número de elementos por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes paginados',
    type: [Client],
  })
  @Get('find_all/paging')
  @Auth(Role.Admin)
  @ApiProduces('application/json')
  findAllPaging(
    @Query('filter') filter?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.clientsService.findAllPaging(filter, page, pageSize);
  }

  /**
   * findOne
   * @param id
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener un cliente por id',
    operationId: 'findOneClient',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID del cliente a buscar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido encontrado satisfactoriamente',
    type: Client,
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  @Get('find_one/:id')
  @ApiProduces('application/json')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  /**
   * findOne
   * @param id
   * @returns
   */
  @ApiOperation({
    summary: 'Obtener un cliente por id',
    operationId: 'findOneByIdcClient',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID del cliente a buscar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido encontrado satisfactoriamente',
    type: Client,
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  @Get('find_one_by_idc/:id')
  @ApiProduces('application/json')
  findOneByIdc(@Param('id') id: number): Promise<Client> {
    return this.clientsService.findOneByIdc(id);
  }

  /**
   * update
   * @param id
   * @param client
   * @returns
   */
  @Patch('update/:id')
  @ApiOperation({
    summary: 'Actualizar un cliente por id',
    operationId: 'updateClient',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID del cliente a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido actualizado satisfactoriamente',
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  @ApiBody({ type: Client })
  @ApiProduces('application/json')
  update(@Param('id') id: string, @Body() client: Client) {
    return this.clientsService.update(id, client);
  }

  /**
   * delete
   * @param id
   * @returns
   */
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Eliminar un cliente por id',
    operationId: 'removeClient',
  })
  @ApiParam({
    name: 'id',
    description: 'El ID del cliente a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'El cliente ha sido eliminado satisfactoriamente',
  })
  @ApiResponse({ status: 404, description: 'El cliente no ha sido encontrado' })
  @ApiBody({ type: String })
  @ApiProduces('application/json')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }

  /**
   * findByIdentif
   * @param identif
   * @returns
   */
  @Get('find_by_identif/:identif')
  @ApiOperation({
    summary: 'Find client by identif',
    operationId: 'findByIdentifClient',
  })
  @ApiParam({
    name: 'identif',
    description: 'Client identification number',
  })
  @ApiOkResponse({
    description: 'Returns true if client exists, false otherwise',
    type: Boolean,
  })
  @ApiBody({ type: String })
  @ApiProduces('application/json')
  async findByIdentif(@Param('identif') identif: string): Promise<boolean> {
    return this.clientsService.findByIdentif(identif);
  }

  /**
   * findByEmail
   * @param email
   * @returns
   */
  @Get('find_by_email/:email')
  @ApiOperation({
    summary: 'Find client by email',
    operationId: 'findByEmailClient',
  })
  @ApiParam({
    name: 'email',
    description: 'Client email',
  })
  @ApiOkResponse({
    description: 'Returns true if client exists, false otherwise',
    type: Boolean,
  })
  @ApiBody({ type: String })
  @ApiProduces('application/json')
  async findByEmail(@Param('email') email: string): Promise<boolean> {
    return this.clientsService.findByEmail(email);
  }
}
