import mongoose, { Connection } from 'mongoose';
import { ProductTypeSchema } from 'src/database/schemas/store/product-type';

export const productTypeProviders = [
  {
    provide: 'PRODUCT_TYPE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('product_types', ProductTypeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
