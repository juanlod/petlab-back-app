import mongoose, { Connection } from 'mongoose';
import { CoatSchema } from '../../schemas/master/coat';

export const coatProviders = [
  {
    provide: 'COAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('coats', CoatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
