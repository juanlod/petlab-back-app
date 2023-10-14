import mongoose, { Connection } from 'mongoose';
import { ClinicImageSchema } from 'src/database/schemas/master/clinic-image';

export const clinicImageProviders = [
  {
    provide: 'CLINIC_IMAGES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('clinic_images', ClinicImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
