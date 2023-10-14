import mongoose, { Connection } from 'mongoose';
import { UnityTypeSchema } from 'src/database/schemas/store/unity-type';

export const unityTypeProviders = [
  {
    provide: 'UNITY_TYPE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('unity_types', UnityTypeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
