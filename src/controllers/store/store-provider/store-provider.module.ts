import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { StoreProviderService } from '../../../services/store/store-provider.service';
import { storeProviderProviders } from 'src/database/providers/store/store-provider.provider';
import { StoreProviderController } from './store-provider.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreProviderController],
  providers: [StoreProviderService, ...storeProviderProviders],
})
export class StoreProviderModule {}
