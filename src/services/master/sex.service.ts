import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISex, Sex } from 'src/database/schemas/master/sex';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from '../../controllers/master/sex/sex-repository';

@Injectable()
export class SexService {
  constructor(
    @Inject('SEX_MODEL')
    private sexModel: Model<ISex>,
  ) {}

  async create(sex: Sex): Promise<any> {
    const id = (await this.sexModel.aggregate(getLastByIdPipeline()).exec())[0]
      .ids;
    sex.ids = id ? id + 1 : 1;
    return await this.sexModel.create(sex);
  }

  async findAll() {
    return await this.sexModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.sexModel.findOne({ _id: id });
  }

  async update(id: string, sex: Sex) {
    const filter = { _id: id };
    const updateData = { $set: sex };
    return await this.sexModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.sexModel.deleteOne({ _id: id });
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
    const results = await this.sexModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.sexModel.aggregate(countValues())) as any;

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
