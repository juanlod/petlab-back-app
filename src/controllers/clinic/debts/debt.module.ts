import { Module } from '@nestjs/common';
import { DebtService } from '../../../services/clinic/debt.service';
import { DebtController } from './debt.controller';
import { DatabaseModule } from 'src/database/database.module';
import { debtProviders } from 'src/database/providers/clinic/debt.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DebtController],
  providers: [DebtService, ...debtProviders],
})
export class DebtModule {}
