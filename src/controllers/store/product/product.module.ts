import { Module } from '@nestjs/common';

import { ProductService } from '../../../services/store/product.service';
import { ProductController } from './product.controller';
import { BatchService } from '../../../services/store/batches.service';
import { ProductTypeModule } from '../product-type/product-type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/schemas/store/product';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductTypeModule],
  controllers: [ProductController],
  providers: [ProductService, BatchService],
})
export class ProductModule {}
