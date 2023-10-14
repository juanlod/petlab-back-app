import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UnityTypeController } from './unity-type.controller';
import { unityTypeProviders } from 'src/database/providers/store/unity-type.provider';
import { UnityTypeService } from './unity-type.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UnityTypeController],
  providers: [UnityTypeService, ...unityTypeProviders],
})
export class UnityTypeModule {}
