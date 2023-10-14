'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface IRace extends Document {
  _id: string;
  id: number;
  nom: string;
  esp: number;
  ori: string;
  des: string;
  ran: number;
  deleted: boolean;
  active: boolean;
}

export class Race {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty({ description: 'Name' })
  nom: string;

  @ApiProperty()
  esp: number;

  @ApiProperty({ description: 'Origin' })
  ori: string;

  @ApiProperty({ description: 'Description' })
  des: string;

  @ApiProperty()
  ran: number;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  active: boolean;
}

// Creacion de clase sexo a traves de la interfaz
export const RaceSchema = new Schema<IRace>({
  id: { type: Number, required: true },
  nom: { type: String, required: true },
  esp: { type: Number, required: false },
  ori: { type: String, required: false },
  des: { type: String, required: false },
  ran: { type: Number, required: false },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
