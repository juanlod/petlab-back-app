import { Module } from '@nestjs/common';
import { SexService } from '../../../services/master/sex.service';
import { SexController } from './sex.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sex } from 'src/database/schemas/master/sex';

@Module({
  imports: [TypeOrmModule.forFeature([Sex])],
  controllers: [SexController],
  providers: [SexService],
})
export class SexModule {}
