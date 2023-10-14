import { Module } from '@nestjs/common';
import { ProvinceService } from '../../../services/master/province.service';
import { ProvinceController } from './province.controller';
import { DatabaseModule } from 'src/database/database.module';
import { provinceProviders } from 'src/database/providers/master/province.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, ...provinceProviders],
})
export class ProvinceModule {}
