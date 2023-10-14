import { Module } from '@nestjs/common';
import { CoatService } from '../../../services/master/coat.service';
import { CoatController } from './coat.controller';
import { coatProviders } from 'src/database/providers/master/coat.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CoatController],
  providers: [CoatService, ...coatProviders],
})
export class CoatModule {}
