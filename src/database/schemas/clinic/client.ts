import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Pet } from './pet';
import { Debt } from './debts';

@Entity({ name: 'clientes' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idc: number;

  @Column({ length: 255 })
  ayn: string;

  @Column({ length: 255, nullable: true })
  dir: string;

  @Column({ length: 10, nullable: true })
  codp: string;

  @Column({ length: 10, nullable: true })
  codt: string;

  @Column({ length: 20, nullable: true })
  tel: string;

  @Column({ length: 20, nullable: true })
  telC: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  obs: string;

  @Column({ nullable: true })
  mark: number;

  @CreateDateColumn()
  feci: Date;

  @UpdateDateColumn()
  fecu: Date;

  @Column({ length: 255, nullable: true })
  motuv: string;

  @Column({ default: false })
  deuda: boolean;

  @Column({ default: false })
  problematico: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantidadDeuda: string;

  @Column({ nullable: true })
  obra: number;

  @Column({ nullable: true })
  Loc: number;

  @Column({ nullable: true })
  Dep: number;

  @Column({ length: 20, nullable: true })
  tel2: string;

  @Column({ length: 20, nullable: true })
  telC2: string;

  @Column({ length: 10, nullable: true })
  codt2: string;

  @Column({ length: 10, nullable: true })
  codp2: string;

  @Column({ length: 50, nullable: true })
  Identif: string;

  // Si tienes relaciones con otras entidades, deberías mapearlas aquí
  // Por ejemplo, si 'mascotas' es una colección de otra entidad:
  @OneToMany((type) => Pet, (mascota) => mascota.client)
  mascotas: Pet[];

  // Y lo mismo para las deudas:
  @OneToMany((type) => Debt, (deuda) => deuda.clientId)
  debts: Debt[];

  @Column({ default: false })
  lopd: boolean;

  @Column()
  password: string;
}
