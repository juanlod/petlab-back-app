import { Module } from '@nestjs/common';
import { ClinicImageController } from './clinic-image.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ClinicImageService } from '../../../services/master/clinic-image.service';
import { clinicImageProviders } from 'src/database/providers/master/clinic-image.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ClinicImageController],
  providers: [ClinicImageService, ...clinicImageProviders],
})
export class ClinicImageModule {}
