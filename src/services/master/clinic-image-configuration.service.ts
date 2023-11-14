import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from '../../database/repository/master/clinic-image.repository';
import {
  IClinicImageConfiguration,
  ClinicImageConfiguration,
} from 'src/database/schemas/master/clinic-image-configuration';

@Injectable()
export class ClinicImageConfigurationService {
  constructor(
    @Inject('CLINIC_IMAGE_CONFIGURATION_MODEL')
    private repository: Model<IClinicImageConfiguration>,
  ) {}

  /**
   * Crea un elemento
   * @param image
   * @returns
   */
  async create(image: ClinicImageConfiguration): Promise<any> {
    const id = (
      await this.repository.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    image.id = id ? id + 1 : 1;
    return await this.repository.create(image);
  }

  /**
   * Obtiene todos los elementos
   * @returns
   */
  getConfig() {
    return this.repository.find();
  }

  /**
   * Busca un elemento por id numerica
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<any> {
    return await this.repository.findOne({ _id: id });
  }

  /**
   * Actualiza un elemento
   * @param id
   * @param image
   * @returns
   */
  async update(id: string, image: ClinicImageConfiguration) {
    const filter = { _id: id };
    const updateData = { $set: image };
    return await this.repository.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.repository.deleteOne({ id: id });
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
    const results = await this.repository.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.repository.aggregate(
      countValues(),
    )) as any;

    console.log(results);

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
