import { Module } from '@nestjs/common';
import { UnityTypeController } from './unity-type.controller';
import { UnityTypeService } from '../../../services/store/unity-type.service';
import { UnityType } from 'src/database/schemas/store/unity-type';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UnityType])],
  controllers: [UnityTypeController],
  providers: [UnityTypeService],
})
export class UnityTypeModule {}
