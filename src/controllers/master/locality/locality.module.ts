import { Module } from '@nestjs/common';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';
import { DatabaseModule } from 'src/database/database.module';
import { localityProviders } from 'src/database/providers/master/locality.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalityController],
  providers: [LocalityService, ...localityProviders],
})
export class LocalityModule {}
