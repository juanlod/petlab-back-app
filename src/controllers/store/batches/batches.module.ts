import { Module } from '@nestjs/common';
import { BatchController } from './batches.controller';
import { BatchService } from '../../../services/store/batches.service';
import { Batch } from 'src/database/schemas/store/batches';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Batch])],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
