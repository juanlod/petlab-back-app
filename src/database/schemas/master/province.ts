import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('provincias') // El nombre de la tabla en tu base de datos MySQL
export class Province {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  nom: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  Ctel: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  ran: number;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  active: boolean;
}
