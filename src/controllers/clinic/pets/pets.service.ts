import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  countValues,
  getPetListPipeline,
  getLastPetIdPipeline,
} from './pets.repository';
import { Model } from 'mongoose';
import { IPet, Pet } from 'src/database/schemas/clinic/pet';
// import { ClientsService } from '../clients/clients.service';

@Injectable()
export class PetService {
  private readonly logger = new Logger(PetService.name);

  constructor(
    @Inject('PET_MODEL')
    private petModel: Model<IPet>,
  ) {}

  /**
   * Save and user
   * @param Pet
   * @returns
   */
  async create(pet: Pet): Promise<any> {
    const idm = (
      await this.petModel.aggregate(getLastPetIdPipeline()).exec()
    )[0]?.idm;
    pet.idm = idm ? idm + 1 : 1;
    return this.petModel.create(pet);
  }

  findAll(): Promise<any> {
    return this.petModel.find().exec();
  }

  /**
   * Get all Pet paginated
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
    const results = await this.petModel.aggregate(
      getPetListPipeline(regex, offset, pageSize, words.length),
    );

    const count_values = await this.petModel
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
   * find Pet
   * @param id
   * @returns
   */
  findOne(id: string): Promise<Pet> {
    return this.petModel.findOne({ _id: id });
  }

  /**
   * Update Pet
   * @param id
   * @param Pet
   * @returns
   */
  update(id: string, Pet: Pet) {
    const filter = { _id: id };
    const updateData = { $set: Pet };
    return this.petModel.updateOne(filter, updateData).exec();
  }

  /**
   * Remove Pet
   * @param id
   * @returns
   */
  remove(id: number) {
    return this.petModel.deleteOne({ _id: id });
  }

  /**
   * Get pets by client id
   * @param idc
   * @returns
   */
  async findAllByClientId(idc: number): Promise<any> {
    return await this.petModel.find({ idc: idc }).exec();
  }
}
