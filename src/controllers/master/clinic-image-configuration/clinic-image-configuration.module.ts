import { Module } from '@nestjs/common';
import { ClinicImageConfigurationController } from './clinic-image-configuration.controller';
import { ClinicImageConfigurationService } from 'src/services/master/clinic-image-configuration.service';
import { ClinicImageConfiguration } from 'src/database/schemas/master/clinic-image-configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicImageConfiguration])],
  controllers: [ClinicImageConfigurationController],
  providers: [ClinicImageConfigurationService],
  exports: [ClinicImageConfigurationService],
})
export class ClinicImageConfigurationModule {}
