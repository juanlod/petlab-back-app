import { Module } from '@nestjs/common';
import { SpeciesService } from '../../../services/master/species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from 'src/database/schemas/master/species';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
