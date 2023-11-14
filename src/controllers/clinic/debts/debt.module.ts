import { Module } from '@nestjs/common';
import { DebtService } from '../../../services/clinic/debt.service';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from 'src/database/schemas/clinic/debts';

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  controllers: [DebtController],
  providers: [DebtService],
})
export class DebtModule {}
