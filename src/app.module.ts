import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
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
import { ClinicImageModule } from './controllers/master/clinic-image/clinic-image.module';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [
    DatabaseModule,
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
    ClinicImageModule,
    DebtModule,
    JwtModule.register({
      secret: environment.secret, // reemplaza esto con tu propia clave secreta
      signOptions: { expiresIn: '7d' }, // cambia según tus necesidades
    }),
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
  exports: [JwtModule],
})
export class AppModule {}
