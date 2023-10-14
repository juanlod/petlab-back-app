import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { clientProviders } from 'src/database/providers/clinic/client.provider';
import { JwtModule } from '@nestjs/jwt';
import { PetService } from '../pets/pets.service';
import { DebtService } from '../debts/debt.service';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [ClientsController],
  providers: [ClientsService, PetService, DebtService, ...clientProviders],
})
export class ClientsModule {}
