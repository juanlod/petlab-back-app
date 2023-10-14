import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProduct, Product } from 'src/database/schemas/store/product';
import {
  countValues,
  findAllPagingProducts,
  getLastByIdPipeline,
} from './product-repository';
import { BatchService } from '../batches/batches.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>,
    private batchesService: BatchService,
  ) {}

  async create(product: Product): Promise<any> {
    const id = (
      await this.productModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    product.id = id ? id + 1 : 1;
    return await this.productModel.create(product);
  }

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<IProduct> {
    const product = (await this.productModel
      .findOne({ _id: id })
      .exec()) as any;

    const batches = await this.batchesService.findAllByProductId(product.id);
    const productWithBatches: IProduct = {
      ...product.toObject(),
      batches: [...batches],
    };
    return productWithBatches;
  }

  async update(id: string, product: Product) {
    const filter = { _id: id };
    const updateData = { $set: product };
    return await this.productModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.productModel.deleteOne({ _id: id });
  }

  async findAllPaging(filter?: string, page?: number, pageSize?: string) {
    // If the filter is empty, we use a regular expression that matches everything

    page = page ? page : 1;
    filter = filter ? filter : '';
    pageSize = pageSize ? pageSize : '10';

    let regex = filter ? new RegExp(filter, 'i') : /.*/;
    const offset: number = (page - 1) * parseInt(pageSize);
    let words = [];

    if (filter) {
      words = filter.split(',').map((word) => word.trim());
      regex = new RegExp(words.join('|'), 'i');
    }

    // Get and count the results
    const results = await this.productModel.aggregate(
      findAllPagingProducts(regex, offset, pageSize),
    );

    const count_values = await this.productModel.aggregate(countValues());

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / +pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
