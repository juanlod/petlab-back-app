'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de pelaje. Necesario para implementacion
 */
export interface IClinicImage extends Document {
  _id: string;
  id: number;
  route: string;
}

export class ClinicImage {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  route: string;
}

// Creacion de clase pelaje a traves de la interfaz
export const ClinicImageSchema = new Schema<IClinicImage>({
  id: { type: Number, required: true },
  route: { type: String, required: true },
});
