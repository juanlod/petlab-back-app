import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICoat, Coat } from 'src/database/schemas/master/coat';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from '../../repository/master/coat.repository';

@Injectable()
export class CoatService {
  constructor(
    @Inject('COAT_MODEL')
    private coatModel: Model<ICoat>,
  ) {}

  async create(coat: Coat): Promise<any> {
    const id = (await this.coatModel.aggregate(getLastByIdPipeline()).exec())[0]
      ?.id;
    coat.id = id ? id + 1 : 1;
    return await this.coatModel.create(coat);
  }

  findAll() {
    return this.coatModel.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.coatModel.findOne({ _id: id });
  }

  async update(id: string, coat: Coat) {
    const filter = { _id: id };
    const updateData = { $set: coat };
    return await this.coatModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.coatModel.deleteOne({ _id: id });
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
    const results = await this.coatModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.coatModel.aggregate(countValues())) as any;

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
