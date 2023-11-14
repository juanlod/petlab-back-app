import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'deudas_cliente' })
export class Debt {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  clientId: number;

  @ApiProperty()
  @Column()
  ticketNumber: string;

  @ApiProperty()
  @Column({ default: false })
  deleted: boolean;

  @ApiProperty()
  @Column({ default: false })
  paid: boolean;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ type: 'date' })
  debtDate: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  paidDate: string | null;
}
