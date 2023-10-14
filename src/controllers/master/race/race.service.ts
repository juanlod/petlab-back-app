import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRace, Race } from 'src/database/schemas/master/race';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from './race-repository';

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_MODEL')
    private raceModel: Model<IRace>,
  ) {}

  async create(race: Race): Promise<any> {
    const id = (await this.raceModel.aggregate(getLastByIdPipeline()).exec())[0]
      ?.id;
    race.id = id ? id + 1 : 1;
    console.log(id);
    return await this.raceModel.create(race);
  }

  async findAll() {
    return await this.raceModel.find().exec();
  }

  async findOne(id: number): Promise<any> {
    return await this.raceModel.findOne({ _id: id });
  }

  async update(id: string, race: Race) {
    const filter = { _id: id };
    const updateData = { $set: race };
    return await this.raceModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.raceModel.deleteOne({ _id: id });
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
    const results = await this.raceModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.raceModel.aggregate(countValues())) as any;

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
