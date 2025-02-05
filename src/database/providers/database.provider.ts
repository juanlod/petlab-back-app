import mongoose from 'mongoose';
import { environment } from 'src/environments/environment';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect( environment.database),
  },
];
