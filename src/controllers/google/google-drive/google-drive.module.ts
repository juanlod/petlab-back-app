import { Module } from '@nestjs/common';
import { GoogleDriveService } from 'src/services/google/google-drive.service';
import { GoogleDriveController } from './google-drive.controller';
import { ClinicImageConfigurationModule } from 'src/controllers/master/clinic-image-configuration/clinic-image-configuration.module';

@Module({
  imports: [ClinicImageConfigurationModule],
  controllers: [GoogleDriveController],
  providers: [GoogleDriveService],
})
export class GoogleDriveModule {}
