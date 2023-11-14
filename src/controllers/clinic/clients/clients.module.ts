import { Module } from '@nestjs/common';
import { ClientsService } from '../../../services/clinic/clients.service';
import { ClientsController } from './clients.controller';
import { JwtModule } from '@nestjs/jwt';
import { PetService } from '../../../services/clinic/pets.service';
import { DebtService } from '../../../services/clinic/debt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/schemas/clinic/client';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), JwtModule],
  controllers: [ClientsController],
  providers: [ClientsService, PetService, DebtService],
})
export class ClientsModule {}
