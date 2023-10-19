import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  countValues,
  findAllPaging,
  getLastByIdPipeline,
} from '../../repository/clinic/debt.repository';
import { IDebt, Debt } from 'src/database/schemas/clinic/debts';

@Injectable()
export class DebtService {
  constructor(
    @Inject('DEBT_MODEL')
    private debtModel: Model<IDebt>,
  ) {}

  async create(debt: Debt): Promise<any> {
    const id = (await this.debtModel.aggregate(getLastByIdPipeline()).exec())[0]
      ?.id;
    debt.id = id ? id + 1 : 1;
    return await this.debtModel.create(debt);
  }

  findAll() {
    return this.debtModel.find();
  }

  findAllByClientId(id: number): Promise<any> {
    return this.debtModel.find({ clientId: id });
  }

  async findOne(id: number): Promise<any> {
    return await this.debtModel.findOne({ _id: id });
  }

  async update(id: string, debt: Debt) {
    const filter = { _id: id };
    const updateData = { $set: debt };
    return await this.debtModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.debtModel.deleteOne({ _id: id });
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
    const results = await this.debtModel.aggregate(
      findAllPaging(regex, offset, pageSize),
    );

    const count_values = (await this.debtModel.aggregate(countValues())) as any;

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values[0]?.length / pageSize),
      total_resultados: count_values[0]?.length,
    };
  }
}
