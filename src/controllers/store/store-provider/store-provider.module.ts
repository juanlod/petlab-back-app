import { Module } from '@nestjs/common';
import { StoreProviderService } from '../../../services/store/store-provider.service';
import { StoreProviderController } from './store-provider.controller';
import { StoreProvider } from 'src/database/schemas/store/store-provider';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProvider])],
  controllers: [StoreProviderController],
  providers: [StoreProviderService],
})
export class StoreProviderModule {}
