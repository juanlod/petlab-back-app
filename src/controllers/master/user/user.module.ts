import { Module } from '@nestjs/common';
import { UserService } from '../../../services/master/user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environments/environment';
import { userProviders } from 'src/database/providers/user.provider';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: environment.secret, // reemplaza esto con tu propia clave secreta
      signOptions: { expiresIn: '7d' }, // cambia según tus necesidades
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [],
})
export class UserModule {}
