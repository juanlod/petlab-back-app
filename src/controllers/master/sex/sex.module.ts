import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';
import { DatabaseModule } from 'src/database/database.module';
import { sexProviders } from 'src/database/providers/master/sex.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SexController],
  providers: [SexService, ...sexProviders],
})
export class SexModule {}
