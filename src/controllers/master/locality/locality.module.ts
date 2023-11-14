import { Module } from '@nestjs/common';
import { LocalityService } from '../../../services/master/locality.service';
import { LocalityController } from './locality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locality } from 'src/database/schemas/master/locality';

@Module({
  imports: [TypeOrmModule.forFeature([Locality])],
  controllers: [LocalityController],
  providers: [LocalityService],
})
export class LocalityModule {}
