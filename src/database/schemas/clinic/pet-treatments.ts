/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface IPetTreatment extends Document {
  _id: string;
  idClinica: number;
  idm: number;
  fec: Date;
  productId: number;
  batchId: number;
  quantity: number;
  type: string;
}

/**
 * Las numeracion de las imagenes de historia clinica de doctorvet se realiza mediante idm + idClinica + número de foto
 */

export class PetTreatment {
  @ApiProperty({ description: 'mongo id' })
  _id: string;

  @ApiProperty({ description: 'sql id' })
  idClinica: number;

  @ApiProperty({ description: 'pet id' })
  idm: number;

  @ApiProperty({ description: 'creation date' })
  fec: Date;

  @ApiProperty({ description: 'product id' })
  productId: number;

  @ApiProperty({ description: 'batch id' })
  batchId: number;

  @ApiProperty({ description: 'quantity treatment' })
  quantity: number;

  @ApiProperty({ description: 'type' })
  type: string;

  constructor(petTreatment: IPetTreatment) {
    this._id = petTreatment._id;
    this.idClinica = petTreatment.idClinica;
    this.idm = petTreatment.idm;
    this.fec = petTreatment.fec;
    this.productId = petTreatment.productId;
    this.batchId = petTreatment.batchId;
    this.quantity = petTreatment.quantity;
    this.type = petTreatment.type;
  }
}

// Creacion de clase cliente a traves de la interfaz
export const PetTreatmentSchema = new Schema<IPetTreatment>({
  idClinica: {
    type: Number,
    required: true,
  },
  idm: {
    type: Number,
    required: true,
  },
  fec: {
    type: Date,
    required: false,
  },

  productId: {
    type: Number,
    required: false,
  },
  batchId: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});
