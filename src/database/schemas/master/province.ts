'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface IProvince extends Document {
  _id: string;
  id: number;
  nom: string;
  Ctel: string;
  ran: number;
  deleted: boolean;
  active: boolean;
}

export class Province {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  Ctel: string;

  @ApiProperty()
  ran: number;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;
}

// Creacion de clase a partir de la interfaz
export const ProvinceSchema = new Schema<IProvince>({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  Ctel: { type: String, required: false },
  ran: { type: Number, required: false },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
