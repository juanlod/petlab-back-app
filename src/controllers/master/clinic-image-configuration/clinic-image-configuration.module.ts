import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { clinicImageProviders } from 'src/database/providers/master/clinic-image.provider';
import { ClinicImageConfigurationController } from './clinic-image-configuration.controller';
import { ClinicImageConfigurationService } from 'src/services/master/clinic-image-configuration.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClinicImageConfigurationController],
  providers: [ClinicImageConfigurationService, ...clinicImageProviders],
  exports: [ClinicImageConfigurationService],
})
export class ClinicImageConfigurationModule {}
