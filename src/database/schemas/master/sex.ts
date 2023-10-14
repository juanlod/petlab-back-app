'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// 0 - NULL
// 1 - MACHO
// 2 - HEMBRA
// 3 - MACHO CASTRADO
// 4 - HEMBRA CASTRADA

/**
 * Interfaz de sexo. Necesario para implementacion
 */
export interface ISex extends Document {
  _id: string;
  ids: number;
  value: string;
  deleted: boolean;
  active: boolean;
}

export class Sex {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  ids: number;

  @ApiProperty()
  value: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;
}

// Creacion de clase sexo a traves de la interfaz
export const SexSchema = new Schema<ISex>({
  ids: { type: Number, required: true },
  value: { type: String, required: true },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
