import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDto, User } from 'src/database/schemas/User';

@ApiTags('User')
@Controller('/api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create an User', operationId: 'loginUser' })
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('/login')
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.userService.login(email, password);
  }

  @ApiOperation({ summary: 'Create an User', operationId: 'createUser' })
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.', type: User })
  @Post('/save')
  @ApiBody({ type: User })
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Get all Users', operationId: 'findAllUser' })
  @ApiResponse({
    status: 200,
    description: 'Return all Users.',
    type: [User],
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get('find_all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get an User by ID', operationId: 'findOneUser' })
  @ApiResponse({ status: 200, description: 'Return an User.', type: User })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get('find_one/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update an User by ID',
    operationId: 'updateUser',
  })
  @ApiResponse({
    status: 200,
    description: 'The User has been successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Patch('update/:id')
  @ApiBody({ type: User })
  update(@Param('id') id: string, @Body() User: User) {
    return this.userService.update(+id, User);
  }

  @ApiOperation({
    summary: 'Delete an User by ID',
    operationId: 'deleteUser',
  })
  @ApiResponse({
    status: 200,
    description: 'The User has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
