import { Module } from '@nestjs/common';
import { UserService } from '../../../services/master/user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environments/environment';
import { User } from 'src/database/schemas/user';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: environment.secret, // reemplaza esto con tu propia clave secreta
      signOptions: { expiresIn: '7d' }, // cambia según tus necesidades
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
