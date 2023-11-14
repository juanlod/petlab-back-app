import { Module } from '@nestjs/common';
import { RaceService } from '../../../services/master/race.service';
import { RaceController } from './race.controller';
import { Race } from 'src/database/schemas/master/race';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
