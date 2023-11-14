import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'localidades' })
export class Locality {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  nom: string;

  @ApiProperty()
  @Column()
  dep: number;

  @ApiProperty()
  @Column({ length: 5 })
  cp: string;

  @ApiProperty()
  @Column()
  ran: number;

  @ApiProperty()
  @Column({ default: false })
  deleted: boolean;

  @ApiProperty()
  @Column({ default: true })
  active: boolean;
}
