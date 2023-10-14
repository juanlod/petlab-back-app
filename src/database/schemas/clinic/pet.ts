'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Client } from './client';

const Schema = mongoose.Schema;

/**
 * Interfaz de mascota. Necesario para implementacion
 */
export interface IPet extends Document {
  _id: string;
  idm: number;
  idc: number;
  nom: string;
  raz: number;
  esp: number;
  fecn: string;
  pel: number;
  pes: number;
  car: null | string;
  ser: number;
  obs: null | string;
  feci: string;
  sex: number;
  ped: boolean;
  rep: boolean;
  dec: boolean;
  fot: boolean;
  int: boolean;
  hos: number;
  fult: string;
  tarea: boolean;
  Chip: null | string;
}

export class Pet {
  @ApiProperty({ description: 'mongo id' })
  _id: string;

  @ApiProperty({ description: 'sql id' })
  idm: number;

  @ApiProperty({ description: 'client id' })
  idc: number;

  @ApiProperty({ description: 'pet description' })
  nom: string;

  @ApiProperty({ description: 'race id' })
  raz: number;

  @ApiProperty()
  esp: number;

  @ApiProperty({ description: 'birth date' })
  fecn: string;

  @ApiProperty({ description: 'coat id' })
  pel: number;

  @ApiProperty({ description: 'weight' })
  pes: number;

  @ApiProperty()
  car: null | string;

  @ApiProperty()
  ser: number;

  @ApiProperty({ description: 'comments' })
  obs: null | string;

  @ApiProperty({ description: 'register date' })
  feci: string;

  @ApiProperty({ description: 'sex id' })
  sex: number;

  @ApiProperty()
  ped: boolean;

  @ApiProperty()
  rep: boolean;

  @ApiProperty()
  dec: boolean;

  @ApiProperty()
  fot: boolean;

  @ApiProperty()
  int: boolean;

  @ApiProperty()
  hos: number;

  @ApiProperty({ description: 'last date in clinic' })
  fult: string;

  @ApiProperty()
  tarea: boolean;

  @ApiProperty({ description: 'pet chip number' })
  Chip: null | string;

  @ApiProperty({ description: 'client relation' })
  client: Client;
}

// Creacion de clase mascota a traves de la interfaz
export const PetSchema = new Schema<IPet>({
  idm: { type: Number, required: true },
  idc: { type: Number, required: true },
  nom: { type: String, required: true },
  raz: { type: Number, required: false },
  esp: { type: Number, required: false },
  fecn: { type: String, required: false },
  pel: { type: Number, required: false },
  pes: { type: Number, required: false },
  car: { type: String, required: false },
  ser: { type: Number, required: false },
  obs: { type: String, required: false },
  feci: { type: String, required: false },
  sex: { type: Number, required: false },
  ped: { type: Boolean, required: false },
  rep: { type: Boolean, required: false },
  dec: { type: Boolean, required: false },
  fot: { type: Boolean, required: false },
  int: { type: Boolean, required: false },
  hos: { type: Number, required: false },
  fult: { type: String, required: false },
  tarea: { type: Boolean, required: false },
  Chip: { type: String, required: false },
});

// // Exportacion de la clase
// module.exports = mongoose.model('mascotas', Mascota);
