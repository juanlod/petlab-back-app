'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de sexo. Necesario para implementacion
 */
export interface IUnityType extends Document {
  _id: string;
  id: number;
  name: string;
  deleted: boolean;
  active: boolean;
}

export class UnityType {
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
}

// Creacion de clase sexo a traves de la interfaz
export const UnityTypeSchema = new Schema<IUnityType>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  deleted: { type: Boolean, required: false, default: false },
  active: { type: Boolean, required: false, default: true },
});
