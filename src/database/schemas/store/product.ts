'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Batch, IBatch } from './batches';

const Schema = mongoose.Schema;

// Definición de la interfaz para el documento de product
export interface IProduct extends Document {
  id: number;
  name: string;
  providerId: number;
  typeProductId: number;
  active: number;
  unityTypeId: number;
  deleted: number;
  showStore: false;
  batches: IBatch[];
}

export class Product {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  providerId: number;

  @ApiProperty()
  typeProductId: number;

  @ApiProperty()
  unityTypeId: number;

  @ApiProperty()
  showStore: boolean;

  @ApiProperty()
  batches: Batch[];
}

// Creacion de clase a traves de la interfaz
export const ProductSchema = new Schema<IProduct>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  providerId: { type: Number, required: false },
  typeProductId: { type: Number, required: false },
  active: { type: Number, required: false, default: 1 },
  unityTypeId: { type: Number, required: false },
  deleted: { type: Number, required: true, default: 0 },
  showStore: { type: Boolean, required: true, default: false },
  batches: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'batches', required: false },
  ],
});
