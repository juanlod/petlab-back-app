import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { ProductService } from './product.service';
import { productProviders } from 'src/database/providers/store/product.provider';
import { ProductController } from './product.controller';
import { BatchService } from '../batches/batches.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, BatchService, ...productProviders],
})
export class ProductModule {}
