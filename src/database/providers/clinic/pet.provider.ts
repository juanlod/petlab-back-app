import mongoose, { Connection } from 'mongoose';
import { PetSchema } from 'src/database/schemas/clinic/pet';

export const petProviders = [
  {
    provide: 'PET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('mascotas', PetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
