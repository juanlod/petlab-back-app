import mongoose, { Connection } from 'mongoose';
import { SpeciesSchema } from 'src/database/schemas/master/species';

export const speciesProviders = [
  {
    provide: 'SPECIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('species', SpeciesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
