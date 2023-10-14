import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISpecies, Species } from 'src/database/schemas/master/species';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from './species-repository';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_MODEL')
    private speciesModel: Model<ISpecies>,
  ) {}

  async create(species: Species): Promise<Species> {
    const id = (
      await this.speciesModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    species.id = id ? id + 1 : 1;
    return await this.speciesModel.create(species);
  }

  findAll() {
    return this.speciesModel.find();
  }

  findOne(id: string): Promise<Species> {
    return this.speciesModel.findOne({ _id: id });
  }

  async update(id: string, species: Species) {
    const filter = { _id: id };
    const updateData = { $set: species };
    return await this.speciesModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.speciesModel.deleteOne({ _id: id });
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
    const results = await this.speciesModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.speciesModel.aggregate(
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
