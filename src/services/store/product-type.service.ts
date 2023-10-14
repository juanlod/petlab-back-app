import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IProductType,
  ProductType,
} from 'src/database/schemas/store/product-type';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from '../../controllers/store/product-type/product-type-repository';

@Injectable()
export class ProductTypeService {
  constructor(
    @Inject('PRODUCT_TYPE_MODEL')
    private productTypeModel: Model<IProductType>,
  ) {}

  async create(productType: ProductType): Promise<any> {
    const id = (
      await this.productTypeModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    productType.id = id ? id + 1 : 1;
    return await this.productTypeModel.create(productType);
  }

  findAll() {
    return this.productTypeModel.find({ deleted: false });
  }

  findOne(id: string): Promise<ProductType> {
    return this.productTypeModel.findOne({ _id: id });
  }

  async update(id: string, productType: ProductType) {
    const filter = { _id: id };
    const updateData = { $set: productType };
    return await this.productTypeModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.productTypeModel.deleteOne({ _id: id });
  }

  async findAllPaging(filter?: string, page?: number, pageSize?: number) {
    // If the filter is empty, we use a regular expression that matches everything

    page = page ? page : 1;
    filter = filter ? filter : '';
    pageSize = pageSize ? pageSize : 10;

    let regex = filter ? new RegExp(filter, 'i') : /.*/;
    const offset: number = (page - 1) * pageSize;
    let words = [];

    if (filter) {
      words = filter.split(',').map((word) => word.trim());
      regex = new RegExp(words.join('|'), 'i');
    }

    // Get and count the results
    const results = await this.productTypeModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = await this.productTypeModel.aggregate(countValues());

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
