import { Module } from '@nestjs/common';
import { CoatService } from '../../../services/master/coat.service';
import { CoatController } from './coat.controller';
import { Coat } from 'src/database/schemas/master/coat';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coat])],
  controllers: [CoatController],
  providers: [CoatService],
})
export class CoatModule {}
