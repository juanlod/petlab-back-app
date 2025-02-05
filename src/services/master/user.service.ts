import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser, User } from 'src/database/schemas/user';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}
  
  
  async onModuleInit() {
    await this.createDefaultUser();
  }

  /**
   * Crea un usuario por defecto si no existe
   */
  async createDefaultUser() {
    const existingUser = await this.userModel.findOne({ email: 'admin@example.com' });

    if (!existingUser) {
      this.logger.log('⚡ Creando usuario administrador por defecto...');

      const hashedPassword = await bcrypt.hash('admin', 10);
      const defaultUser = new this.userModel({
        nombres: 'admin',
        apellidos: 'User',
        email: 'admin@petlab.com',
        password: hashedPassword,
        telefono: '123456789',
        rol: 'admin',
      });

      await defaultUser.save();
      this.logger.log('✅ Usuario administrador creado con éxito');
    } else {
      this.logger.log('🔹 Usuario administrador ya existe');
    }
  }
  /**
   * Login user
   * @param user
   * @returns
   */
  async login(email: string, password: string) {
    const result = await this.userModel.findOne({ email: email });

    if (!result) {
      throw new BadRequestException('USER.LOGIN.PASSWORD.INCORRECT');
    }

    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('USER.LOGIN.PASSWORD.INCORRECT');
    }

    const token = await this.createToken(result);
    return { user: result, token };
  }

  /**
   * Create user
   * @param user
   * @returns
   */
  async create(user: any) {
    const admins = await this.userModel.find({ email: user.email });

    if (admins.length === 0) {
      if (user.password) {
        // Se encripta la contraseña
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;

        const reg = await this.userModel.create(user);
        return { data: reg };
      } else {
        throw new BadRequestException('USER.CREATE.PASSWORD.MANDATORY');
      }
    } else {
      throw new BadRequestException('USER.CREATE.EMAIL.EXISTS');
    }
  }

  findAll(): IUser[] {
    return new Array<IUser>();
  }

  findOne(id: number): IUser {
    return Object.assign({});
  }

  update(id: number, user: any): IUser {
    return Object.assign({});
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async createToken(user: User) {
    const payload = {
      sub: user._id,
      nombre: user.nombres,
      apellido: user.apellidos,
      email: user.email,
      created_date: moment().unix(),
      expiration_date: moment().add(7, 'days').unix(), // 7 dias de duracion
      rol: user.rol,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
