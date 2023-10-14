import mongoose, { Connection } from 'mongoose';
import { LocalitySchema } from 'src/database/schemas/master/locality';

export const localityProviders = [
  {
    provide: 'LOCALITY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('localidades', LocalitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
