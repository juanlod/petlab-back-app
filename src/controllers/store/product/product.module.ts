import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { ProductService } from '../../../services/store/product.service';
import { productProviders } from 'src/database/providers/store/product.provider';
import { ProductController } from './product.controller';
import { BatchService } from '../../../services/store/batches.service';
import { ProductTypeModule } from '../product-type/product-type.module';

@Module({
  imports: [DatabaseModule, ProductTypeModule],
  controllers: [ProductController],
  providers: [ProductService, BatchService, ...productProviders],
})
export class ProductModule {}
