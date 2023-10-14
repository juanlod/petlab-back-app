'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de sexo. Necesario para implementacion
 */
export interface IBatch {
  _id: string;
  delivery_note: string;
  product_quantity: number;
  total_quantity: number;
  quantity_per_unity: number;
  expiration_date: Date;
  entry_date: Date;
  id: number;
  product_id: number;
  number: string;
  observations: string;
}

export const BatchSchema = new Schema<IBatch>({
  id: { type: Number, required: true },
  number: { type: String, required: true },
  expiration_date: { type: Date, required: false },
  product_quantity: { type: Number, required: false },
  product_id: { type: Number, required: true },
  entry_date: { type: Date, required: false },
  observations: { type: String, default: null, required: false },
  delivery_note: { type: String, required: false },
  quantity_per_unity: { type: Number, default: 0, required: false },
  total_quantity: { type: Number, required: false },
});

export class Batch {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  delivery_note: string;

  @ApiProperty()
  product_quantity: number;

  @ApiProperty()
  total_quantity: number;

  @ApiProperty()
  quantity_per_unity: number;

  @ApiProperty()
  expiration_date: Date;

  @ApiProperty()
  entry_date: Date;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  number: string;

  @ApiProperty()
  observations: string;
}
