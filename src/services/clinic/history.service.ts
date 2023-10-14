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

  async create(history: PetHistory): Promise<any> {
    const idClinica = (
      await this.historyModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    console.log(idClinica)
    history.idClinica = idClinica ? idClinica + 1 : 1;

    return await this.historyModel.create(history);
  }

  async findAll() {
    return await this.historyModel.find().exec();
  }

  async findAllByIdm(
    idm: number,
    loadedCount: number,
    countPerPage: number,
  ): Promise<IPetHistory[]> {
    const skipped = loadedCount || 0; // Si loadedCount es undefined, asignar 0
    const history = await this.historyModel
      .find({ idm: idm })
      .sort({ fec: -1 })
      .skip(skipped)
      .limit(countPerPage)
      .exec();

    console.log(history)
    return history;
  }

  async findOne(id: string): Promise<any> {
    return await this.historyModel.findOne({ _id: id });
  }

  async update(id: string, history: PetHistory) {
    const filter = { _id: id };
    const updateData = { $set: history };
    return await this.historyModel.updateOne(filter, updateData);
  }

  async remove(id: string) {
    return await this.historyModel.deleteOne({ _id: id });
  }
}
