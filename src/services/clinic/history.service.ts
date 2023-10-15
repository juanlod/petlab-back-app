import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { getLastByIdPipeline } from 'src/controllers/clinic/history/history-repository';
import {
  IPetHistory,
  PetHistory,
} from 'src/database/schemas/clinic/pet-history';

@Injectable()
export class PetHistoryService {
  constructor(
    @Inject('HISTORY_MODEL')
    private historyModel: Model<IPetHistory>,
  ) {}

  /**
   * Guarda una historia
   * @param history
   * @returns
   */
  async create(history: PetHistory): Promise<any> {
    const idClinica = (
      await this.historyModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    console.log(idClinica);
    history.idClinica = idClinica ? idClinica + 1 : 1;

    return await this.historyModel.create(history);
  }

  /**
   * Busca todos los historiales
   * @returns
   */
  async findAll() {
    return await this.historyModel.find().exec();
  }

  /**
   * Busca los historiales por id de mascota
   * @param idm
   * @param loadedCount
   * @param countPerPage
   * @returns
   */
  async findAllByIdm(
    idm: number,
    loadedCount: number,
    countPerPage: number,
  ): Promise<PetHistory[]> {
    const skipped = loadedCount || 0; // Si loadedCount es undefined, asignar 0
    const history = await this.historyModel
      .find({ idm: idm })
      .sort({ fec: -1 })
      .skip(skipped)
      .limit(countPerPage)
      .exec();
    return history.map((item) => new PetHistory(item));
  }

  /**
   * Busca una historia por id
   * @param id
   * @returns
   */
  async findOne(id: string): Promise<any> {
    return await this.historyModel.findOne({ _id: id });
  }

  /**
   * Actualiza una historia
   * @param id
   * @param history
   * @returns
   */
  async update(id: string, history: PetHistory) {
    const filter = { _id: id };
    const updateData = { $set: history };
    return await this.historyModel.updateOne(filter, updateData);
  }

  /**
   * Elimina una historia
   * @param id
   * @returns
   */
  async remove(id: string) {
    return await this.historyModel.deleteOne({ _id: id });
  }
}
