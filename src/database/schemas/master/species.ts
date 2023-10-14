'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de sexo. Necesario para implementacion
 */
export interface ISpecies extends Document {
  _id: string;
  id: number;
  nom: string;
  ali: number;
  icon: string;
  deleted: boolean;
  active: boolean;
}

export class Species {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  ali: number;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;
}

// Creacion de clase sexo a traves de la interfaz
export const SpeciesSchema = new Schema<ISpecies>({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  ali: { type: Number, required: false },
  icon: { type: String, required: false },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
