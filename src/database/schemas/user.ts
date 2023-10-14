import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Interfaz de User. Necesario para implementacion
 */
export interface IUser extends Document {
  _id: string;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  telefono?: string;
  rol: string;
  f_nacimiento?: string;
  dni?: string;
}

/**
 * Interfaz de User. Necesario para implementacion
 */
export class User {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  nombres: string;
  @ApiProperty()
  apellidos: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  telefono?: string;
  @ApiProperty()
  rol: string;
  @ApiProperty()
  f_nacimiento?: string;
  @ApiProperty()
  dni?: string;
}

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

// Creacion de clase User a traves de la interfaz
export const UserSchema = new Schema<IUser>({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  rol: { type: String, required: false },
  dni: { type: String, required: false },
});
