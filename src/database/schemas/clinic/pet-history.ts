/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface IPetHistory extends Document {
  _id: string;
  idClinica: number;
  idm: number;
  fec: Date;
  cli: string;
  consultationReason: string;
  tmp: number;
  pes: number;
  idu: number;
  CantFotos: number;
  type: string;
}

/**
 * Las numeracion de las imagenes de historia clinica de doctorvet se realiza mediante idm + idClinica + número de foto
 */

export class PetHistory {
  @ApiProperty({ description: 'mongo id' })
  _id: string;

  @ApiProperty({ description: 'sql id' })
  idClinica: number;

  @ApiProperty({ description: 'pet id' })
  idm: number;

  @ApiProperty({ description: 'creation date' })
  fec: Date;

  @ApiProperty({ description: 'desease information' })
  cli: string;
  
  @ApiProperty({ description: 'consultation reason' })
  consultationReason: string;

  @ApiProperty({ description: 'temperature' })
  tmp: number;

  @ApiProperty({ description: 'weight' })
  pes: number;

  @ApiProperty({ description: '' })
  idu: number;

  @ApiProperty({ description: 'photography size' })
  cantFotos: number;

  @ApiProperty({ description: 'type' })
  type: string;

  constructor(petHistory: IPetHistory) {
    this._id = petHistory._id;
    this.idClinica = petHistory.idClinica;
    this.idm = petHistory.idm;
    this.fec = petHistory.fec;
    this.cli = petHistory.cli;
    this.tmp = petHistory.tmp;
    this.pes = petHistory.pes;
    this.idu = petHistory.idu;
    this.cantFotos = petHistory.CantFotos;
    this.type = petHistory.type;
    this.consultationReason = petHistory.consultationReason;
  }
}

// Creacion de clase cliente a traves de la interfaz
export const PetHistorySchema = new Schema<IPetHistory>({
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
  cli: {
    type: String,
    required: false,
  }, 
  consultationReason: {
    type: String,
    required: false,
  },
  tmp: {
    type: Number,
    required: false,
  },
  pes: {
    type: Number,
    required: false,
  },
  idu: {
    type: Number,
    required: false,
  },
  CantFotos: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});
