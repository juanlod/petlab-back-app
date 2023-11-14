import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBatch, Batch } from 'src/database/schemas/store/batches';
import { getLastByIdPipeline } from '../../database/repository/store/batches-repository';
import { of } from 'rxjs';

@Injectable()
export class BatchService {
  constructor(
    @Inject('BATCH_MODEL')
    private batchModel: Model<IBatch>,
  ) {}

  /**
   * Crea un lote
   * @param batch
   * @returns
   */
  async create(batch: Batch): Promise<Batch> {
    const id = (
      await this.batchModel.aggregate(getLastByIdPipeline()).exec()
    )[0]?.id;
    batch.id = id ? id + 1 : 1;

    return await this.batchModel.create(batch);
  }

  /**
   * Busca todo
   * @returns
   */
  findAll() {
    return this.batchModel.find();
  }

  /**
   * Busca por id de producto
   * @param id
   * @returns
   */
  async findAllByProductId(id: number) {
    return await this.batchModel.find({ product_id: id });
  }

  /**
   * Busca un lote
   * @param id
   * @returns
   */
  findOne(id: string): Promise<Batch> {
    return this.batchModel.findOne({ _id: id });
  }

  /**
   * Actualiza un lote
   * @param id
   * @param batch
   * @returns
   */
  async update(id: string, batch: Batch) {
    const filter = { _id: id };
    const updateData = { $set: batch };
    return await this.batchModel.updateOne(filter, updateData);
  }

  /**
   * Elimina un lote
   * @param id
   * @returns
   */
  async remove(id: number) {
    return await this.batchModel.deleteOne({ _id: id });
  }
}
