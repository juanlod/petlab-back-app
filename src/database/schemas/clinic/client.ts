/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de cliente. Necesario para implementacion
 */
export interface IClient extends Document {
  _id: string;
  idc: number;
  ayn: string;
  dir: string;
  codp: string;
  codt: string;
  tel: string;
  telC: string;
  email: string;
  obs: string;
  mark: number;
  feci: Date;
  fecu: Date;
  motuv: string;
  deuda: boolean;
  problematico: boolean;
  cantidadDeuda: string;
  obra: number;
  Loc: number;
  Dep: number;
  tel2: string;
  telC2: string;
  codt2: string;
  codp2: string;
  Identif: string;
  mascotas: mongoose.Schema.Types.ObjectId[];
  debts: mongoose.Schema.Types.ObjectId[];
  lopd: boolean;
  password: string;
}

export class Client {
  @ApiProperty({ description: 'mongo id' })
  _id: string;

  @ApiProperty({ description: 'sql id' })
  idc: number;

  @ApiProperty({ description: 'full description' })
  ayn: string;

  @ApiProperty({ description: 'address' })
  dir: string;

  @ApiProperty({ description: 'postal code' })
  codp: string;

  @ApiProperty({ description: 'mongo id' })
  codt: string;

  @ApiProperty()
  tel: string;

  @ApiProperty()
  telC: string;

  @ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty({ description: 'client observations' })
  obs: string;

  @ApiProperty()
  mark: number;

  @ApiProperty({ description: 'register date' })
  feci: Date;

  @ApiProperty()
  fecu: Date;

  @ApiProperty()
  motuv: string;

  @ApiProperty({ description: 'indicates if the client have debt' })
  deuda: boolean;

  @ApiProperty({ description: 'Indicates if the client is dangerous' })
  problematico: boolean;

  @ApiProperty({ description: 'debt quantity' })
  cantidadDeuda: string;

  @ApiProperty()
  obra: number;

  @ApiProperty({ description: 'locality id reference' })
  Loc: number;

  @ApiProperty({ description: 'province id reference' })
  Dep: number;

  @ApiProperty({ description: 'phone' })
  tel2: string;

  @ApiProperty({ description: 'movile phone' })
  telC2: string;

  @ApiProperty()
  codt2: string;

  @ApiProperty({ description: 'postal code' })
  codp2: string;

  @ApiProperty({ description: 'country identification number' })
  Identif: string;

  @ApiProperty({ description: 'list of pets' })
  mascotas: mongoose.Schema.Types.ObjectId[];

  @ApiProperty({
    description: 'Indicates if the client has writed lopd document',
  })
  lopd: boolean;

  @ApiProperty({ description: 'password' })
  password: string;

  @ApiProperty({ description: 'list of debts' })
  debts: mongoose.Schema.Types.ObjectId[];
}

// Creacion de clase cliente a traves de la interfaz
export const ClientSchema = new Schema<IClient>({
  idc: { type: Number, required: true },
  ayn: { type: String, required: true },
  dir: { type: String, required: false },
  codp: { type: String, required: false },
  codt: { type: String, required: false },
  tel: { type: String, required: false },
  telC: { type: String, required: false },
  email: { type: String, required: false },
  obs: { type: String, required: false },
  mark: { type: Number, required: false },
  feci: { type: Date, required: false, default: new Date() },
  fecu: { type: Date, required: false },
  motuv: { type: String, required: false },
  deuda: { type: Boolean, required: false },
  problematico: { type: Boolean, required: false },
  cantidadDeuda: { type: String, required: false },
  obra: { type: Number, required: false },
  Loc: { type: Number, required: false },
  Dep: { type: Number, required: false },
  tel2: { type: String, required: false },
  telC2: { type: String, required: false },
  codt2: { type: String, required: false },
  codp2: { type: String, required: false },
  Identif: { type: String, required: false },
  mascotas: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'mascotas', required: false },
  ],
  debts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client_debts',
      required: false,
    },
  ],
  lopd: { type: Boolean, required: false },
  password: { type: String, required: false },
});
