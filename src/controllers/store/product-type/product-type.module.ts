import { Module } from '@nestjs/common';
import { ProductTypeService } from '../../../services/store/product-type.service';
import { ProductTypeController } from './product-type.controller';
import { ProductType } from 'src/database/schemas/store/product-type';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
