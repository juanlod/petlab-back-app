import mongoose, { Connection } from 'mongoose';
import { PetHistorySchema } from 'src/database/schemas/clinic/pet-history';

export const historyProviders = [
  {
    provide: 'HISTORY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('histories', PetHistorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
