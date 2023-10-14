import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { batchesProviders } from 'src/database/providers/store/batches.provider';
import { BatchController } from './batches.controller';
import { BatchService } from './batches.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BatchController],
  providers: [BatchService, ...batchesProviders],
})
export class BatchModule {}
