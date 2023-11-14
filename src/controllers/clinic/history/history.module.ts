import { Module } from '@nestjs/common';
import { PetHistoryService } from '../../../services/clinic/history.service';
import { PetHistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PetHistory } from 'src/database/schemas/clinic/pet-history';

@Module({
  imports: [TypeOrmModule.forFeature([PetHistory])],
  controllers: [PetHistoryController],
  providers: [PetHistoryService],
})
export class PetHistoryModule {}
