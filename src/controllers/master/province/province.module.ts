import { Module } from '@nestjs/common';
import { ProvinceService } from '../../../services/master/province.service';
import { ProvinceController } from './province.controller';
import { Province } from 'src/database/schemas/master/province';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
