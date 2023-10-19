import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  countValues,
  getClientListPipeline,
  getLastClientIdPipeline,
} from '../../repository/clinic/client.repository';
import { Model } from 'mongoose';
import { Client, IClient } from 'src/database/schemas/clinic/client';
import { PetService } from './pets.service';
import * as bcrypt from 'bcrypt';
import { DebtService } from './debt.service';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @Inject('CLIENT_MODEL')
    private clientModel: Model<IClient>,
    private petService: PetService,
    private debtService: DebtService,
  ) {}

  /**
   * Find by identif
   * @param client
   */
  async findByIdentif(identif: string): Promise<boolean> {
    const result = await this.clientModel.findOne({ Identif: identif }).exec();
    return result ? true : false;
  }

  /**
   * Find by email
   * @param client
   */
  async findByEmail(email: string): Promise<boolean> {
    const result = await this.clientModel.findOne({ email: email }).exec();
    return result ? true : false;
  }

  /**
   * Save and user
   * @param client
   * @returns
   */
  async create(client: Client): Promise<Client> {
    const idc = (
      await this.clientModel.aggregate(getLastClientIdPipeline()).exec()
    )[0]?.idc;
    client.idc = idc ? idc + 1 : 1;
    client.password = await bcrypt.hash('12345678', 10);
    return this.clientModel.create(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  /**
   * Get all clients paginated
   * @param filter : ;
   * @param page
   * @param pageSize
   * @returns
   */
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
    const results = await this.clientModel.aggregate(
      getClientListPipeline(regex, offset, pageSize, words.length),
    );

    const count_values = await this.clientModel
      .aggregate(countValues(regex, words.length))
      .exec();

    return {
      data: results,
      pagina_actual: page,
      total_paginas: Math.ceil(count_values.length / pageSize),
      total_resultados: count_values.length,
    };
  }

  /**
   * find Client
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ _id: id }).exec();
    client.mascotas = await this.petService.findAllByClientId(client.idc);
    client.debts = await this.debtService.findAllByClientId(client.idc);
    return client;
  }

  /**
   * find Client
   * @param id
   * @returns
   */
  async findOneByIdc(id: number): Promise<Client> {
    return await this.clientModel.findOne({ idc: id }).exec();
  }

  /**
   * Update client
   * @param id
   * @param client
   * @returns
   */
  update(id: string, client: Client) {
    const filter = { _id: id };
    const updateData = { $set: client };
    return this.clientModel.updateOne(filter, updateData).exec();
  }

  /**
   * Remove client
   * @param id
   * @returns
   */
  remove(id: number) {
    return this.clientModel.deleteOne({ _id: id });
  }
}
