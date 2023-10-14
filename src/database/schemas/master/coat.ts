'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de pelaje. Necesario para implementacion
 */
export interface ICoat extends Document {
  _id: string;
  id: number;
  nom: string;
  deleted: boolean;
  active: boolean;
}

export class Coat {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;
}

// Creacion de clase pelaje a traves de la interfaz
export const CoatSchema = new Schema<ICoat>({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
