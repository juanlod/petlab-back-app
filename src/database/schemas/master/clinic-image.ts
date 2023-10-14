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
  clientId: string;
  projectId: string;
  authUri: string;
  tokenUri: string;
  authProviderCertUrl: string;
  clientSecret: string;
  historyFolder: string;
  ecographyFolder: string;
  rayFolder: string;
  petProfileFolder: string;
}

export class ClinicImage {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  authUri: string;

  @ApiProperty()
  tokenUri: string;

  @ApiProperty()
  authProviderCertUrl: string;

  @ApiProperty()
  clientSecret: string;

  @ApiProperty()
  historyFolder: string;

  @ApiProperty()
  ecographyFolder: string;

  @ApiProperty()
  rayFolder: string;

  @ApiProperty()
  petProfileFolder: string;
}

// Creacion de clase pelaje a traves de la interfaz
export const ClinicImageSchema = new Schema<IClinicImage>({
  id: { type: Number, required: true },
  clientId: { type: String, required: true },
  projectId: { type: String, required: true },
  authUri: { type: String, required: true },
  tokenUri: { type: String, required: true },
  authProviderCertUrl: { type: String, required: true },
  clientSecret: { type: String, required: true },
  historyFolder: { type: String, required: true },
  ecographyFolder: { type: String, required: true },
  rayFolder: { type: String, required: true },
  petProfileFolder: { type: String, required: true },
});
