import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProvince, Province } from 'src/database/schemas/master/province';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from './province-repository';

@Injectable()
export class ProvinceService {
  constructor(
    @Inject('PROVINCE_MODEL')
    private provinceModel: Model<IProvince>,
  ) {}

  async create(province: Province): Promise<any> {
    const id = (
      await this.provinceModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    province.id = id ? id + 1 : 1;
    return await this.provinceModel.create(province);
  }

  async findAll() {
    return await this.provinceModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.provinceModel.findOne({ _id: id });
  }

  async update(id: string, province: Province) {
    const filter = { _id: id };
    const updateData = { $set: province };
    return await this.provinceModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.provinceModel.deleteOne({ _id: id });
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
    const results = await this.provinceModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.provinceModel.aggregate(
      countValues(),
    )) as any;

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
