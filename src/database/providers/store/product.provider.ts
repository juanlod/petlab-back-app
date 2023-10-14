import mongoose, { Connection } from 'mongoose';
import { ProductSchema } from 'src/database/schemas/store/product';

export const productProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('products', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
