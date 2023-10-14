import { Module } from '@nestjs/common';
import { PetHistoryService } from '../../../services/clinic/history.service';
import { PetHistoryController } from './history.controller';
import { DatabaseModule } from 'src/database/database.module';
import { historyProviders } from 'src/database/providers/clinic/history.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PetHistoryController],
  providers: [PetHistoryService, ...historyProviders],
})
export class PetHistoryModule {}
