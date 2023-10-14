import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ILocality, Locality } from 'src/database/schemas/master/locality';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from '../../controllers/master/locality/locality-repository';

@Injectable()
export class LocalityService {
  constructor(
    @Inject('LOCALITY_MODEL')
    private localityModel: Model<ILocality>,
  ) {}

  async create(locality: Locality): Promise<any> {
    const id = (
      await this.localityModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    locality.id = id ? id + 1 : 1;
    return await this.localityModel.create(locality);
  }

  findAll() {
    return this.localityModel.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.localityModel.findOne({ _id: id });
  }

  async update(id: string, locality: Locality) {
    const filter = { _id: id };
    const updateData = { $set: locality };
    return await this.localityModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.localityModel.deleteOne({ _id: id });
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
    const results = await this.localityModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.localityModel.aggregate(
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
