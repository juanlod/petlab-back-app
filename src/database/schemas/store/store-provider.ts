'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz. Necesario para implementacion
 */
export interface IStoreProvider extends Document {
  id: number;
  address: string;
  name: string;
  active: boolean;
  deleted: boolean;
  phone_number: string;
}

export class StoreProvider {
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

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  address: string;
}

// Creacion de clase a traves de la interfaz
export const StoreProviderSchema = new Schema<IStoreProvider>({
  id: { type: Number, required: true },
  address: { type: String, required: false },
  name: { type: String, required: false },
  active: { type: Boolean, required: false, default: true },
  deleted: { type: Boolean, required: false, default: false },
  phone_number: { type: String, required: false },
});
