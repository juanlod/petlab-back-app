'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface ILocality extends Document {
  _id: string;
  id: number;
  nom: string;
  dep: number;
  cp: string;
  ran: number;
  deleted: boolean;
  active: boolean;
}

export class Locality {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  dep: number;

  @ApiProperty()
  cp: string;

  @ApiProperty()
  ran: number;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;
}

// Creacion de clase a partir de la interfaz
export const LocalitySchema = new Schema<ILocality>({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  dep: { type: Number, required: false },
  cp: { type: String, required: false },
  ran: { type: Number, required: false },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
