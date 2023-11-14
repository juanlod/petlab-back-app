import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/master/user/user.module';
import { ClientsModule } from './controllers/clinic/clients/clients.module';
import { LocalityModule } from './controllers/master/locality/locality.module';
import { ProvinceModule } from './controllers/master/province/province.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './environments/environment';
import { PetsModule } from './controllers/clinic/pets/pets.module';
import { SexModule } from './controllers/master/sex/sex.module';
import { RaceModule } from './controllers/master/race/race.module';
import { CoatModule } from './controllers/master/coat/coat.module';
import { SpeciesModule } from './controllers/master/species/species.module';
import { PetHistoryModule } from './controllers/clinic/history/history.module';
import { BatchModule } from './controllers/store/batches/batches.module';
import { ProductTypeModule } from './controllers/store/product-type/product-type.module';
import { ProductModule } from './controllers/store/product/product.module';
import { StoreProviderModule } from './controllers/store/store-provider/store-provider.module';
import { UnityTypeModule } from './controllers/store/unity-type/unity-type.module';
import { DebtModule } from './controllers/clinic/debts/debt.module';
import { ClinicImageConfigurationModule } from './controllers/master/clinic-image-configuration/clinic-image-configuration.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { GoogleDriveModule } from './controllers/google/google-drive/google-drive.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    ClientsModule,
    LocalityModule,
    ProvinceModule,
    PetsModule,
    SexModule,
    RaceModule,
    CoatModule,
    SpeciesModule,
    PetHistoryModule,
    ProductModule,
    BatchModule,
    ProductTypeModule,
    StoreProviderModule,
    UnityTypeModule,
    ClinicImageConfigurationModule,
    DebtModule,
    GoogleDriveModule,
    JwtModule.register({
      secret: environment.secret, // reemplaza esto con tu propia clave secreta
      signOptions: { expiresIn: '7d' }, // cambia según tus necesidades
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // tipo de base de datos
      host: environment.DATABASE_HOST,
      port: parseInt(environment.DATABASE_PORT, 10) || 3306,
      username: environment.DATABASE_USER,
      password: environment.DATABASE_PASSWORD,
      database: environment.DATABASE_NAME,
      entities: [],
      synchronize: true, // No usar en producción
    }),
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
  exports: [JwtModule],
})
export class AppModule {}
