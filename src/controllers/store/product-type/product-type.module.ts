import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { productTypeProviders } from 'src/database/providers/store/product-type.provider';
import { ProductTypeService } from '../../../services/store/product-type.service';
import { ProductTypeController } from './product-type.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, ...productTypeProviders],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
