import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBatch, Batch } from 'src/database/schemas/store/batches';
import { getLastByIdPipeline } from '../../controllers/store/batches/batches-repository';
import { of } from 'rxjs';

@Injectable()
export class BatchService {
  constructor(
    @Inject('BATCH_MODEL')
    private batchModel: Model<IBatch>,
  ) {}

  async create(batch: Batch): Promise<Batch> {
    const id = (
      await this.batchModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    batch.id = id ? id + 1 : 1;

    return await this.batchModel.create(batch);
  }

  findAll() {
    return this.batchModel.find();
  }

  async findAllByProductId(id: number) {
    return await this.batchModel.find({ product_id: id });
  }

  findOne(id: string): Promise<Batch> {
    return this.batchModel.findOne({ _id: id });
  }

  async update(id: string, batch: Batch) {
    const filter = { _id: id };
    const updateData = { $set: batch };
    return await this.batchModel.updateOne(filter, updateData);
  }

  async remove(id: number) {
    return await this.batchModel.deleteOne({ _id: id });
  }
}
