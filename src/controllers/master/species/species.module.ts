import { Module } from '@nestjs/common';
import { SpeciesService } from '../../../services/master/species.service';
import { SpeciesController } from './species.controller';
import { DatabaseModule } from 'src/database/database.module';
import { speciesProviders } from 'src/database/providers/master/species.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProviders],
})
export class SpeciesModule {}
