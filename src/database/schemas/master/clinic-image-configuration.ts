'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IClinicImageConfiguration extends Document {
  _id: string;
  id: number;
  // clientId: string;
  // projectId: string;
  // authUri: string;
  // tokenUri: string;
  // authProviderCertUrl: string;
  // clientSecret: string;
  historyFolder: string;
  ecographyFolder: string;
  rayFolder: string;
  petProfileFolder: string;
  type: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientX509CertUrl: string;
  universeDomain: string;
}

export class ClinicImageConfiguration {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  // @ApiProperty()
  // clientId: string;

  // @ApiProperty()
  // projectId: string;

  // @ApiProperty()
  // authUri: string;

  // @ApiProperty()
  // tokenUri: string;

  // @ApiProperty()
  // authProviderCertUrl: string;

  // @ApiProperty()
  // clientSecret: string;

  @ApiProperty()
  historyFolder: string;

  @ApiProperty()
  ecographyFolder: string;

  @ApiProperty()
  rayFolder: string;

  @ApiProperty()
  petProfileFolder: string;

  // Nuevos campos
  @ApiProperty()
  type: string;

  @ApiProperty()
  privateKeyId: string;

  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  clientEmail: string;

  @ApiProperty()
  clientX509CertUrl: string;

  @ApiProperty()
  universeDomain: string;
}

export const ClinicImageConfigurationSchema =
  new Schema<IClinicImageConfiguration>({
    id: { type: Number, required: true },
    // clientId: { type: String, required: true },
    // projectId: { type: String, required: true },
    // authUri: { type: String, required: true },
    // tokenUri: { type: String, required: true },
    // authProviderCertUrl: { type: String, required: true },
    // clientSecret: { type: String, required: true },
    historyFolder: { type: String, required: true },
    ecographyFolder: { type: String, required: true },
    rayFolder: { type: String, required: true },
    petProfileFolder: { type: String, required: true },
    // Nuevos campos
    type: { type: String, required: true },
    privateKeyId: { type: String, required: true },
    privateKey: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientX509CertUrl: { type: String, required: true },
    universeDomain: { type: String, required: true },
  });
