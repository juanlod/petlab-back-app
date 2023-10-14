import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUnityType, UnityType } from 'src/database/schemas/store/unity-type';
import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from './unity-type-repository';

@Injectable()
export class UnityTypeService {
  constructor(
    @Inject('UNITY_TYPE_MODEL')
    private unityTypeModel: Model<IUnityType>,
  ) {}

  async create(unityType: UnityType): Promise<any> {
    const id = (
      await this.unityTypeModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    unityType.id = id ? id + 1 : 1;
    return await this.unityTypeModel.create(unityType);
  }

  findAll() {
    return this.unityTypeModel.find({ deleted: false });
  }

  findOne(id: string): Promise<UnityType> {
    return this.unityTypeModel.findOne({ _id: id });
  }

  async update(id: string, unityType: UnityType) {
    const filter = { _id: id };
    const updateData = { $set: unityType };
    return await this.unityTypeModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.unityTypeModel.deleteOne({ _id: id });
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
    const results = await this.unityTypeModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.unityTypeModel.aggregate(
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
