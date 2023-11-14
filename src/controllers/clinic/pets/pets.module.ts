import { Module } from '@nestjs/common';
import { PetService } from '../../../services/clinic/pets.service';
import { PetsController } from './pets.controller';
import { JwtModule } from '@nestjs/jwt';
import { Pet } from 'src/database/schemas/clinic/pet';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), JwtModule],
  controllers: [PetsController],
  providers: [PetService],
})
export class PetsModule {}
