import { Module } from '@nestjs/common';
import { UserService } from '../../../services/store/user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/providers/User.provider';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environments/environment';

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
