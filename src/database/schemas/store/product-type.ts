'use strict';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Definición de la interfaz para el documento de product
export interface IProductType {
  id: number;
  name: string;
  icon: string;
  active: boolean;
  deleted: boolean;
  deleteable: boolean;
  editable: boolean;
}

export const ProductTypeSchema = new Schema<IProductType>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: false },
  active: { type: Boolean, required: false, default: true },
  deleted: { type: Boolean, required: false, default: false },
  deleteable: { type: Boolean, required: false, default: true },
  editable: { type: Boolean, required: false, default: true },
});

export class ProductType {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  deleteable: boolean;

  @ApiProperty()
  editable: boolean;
}
