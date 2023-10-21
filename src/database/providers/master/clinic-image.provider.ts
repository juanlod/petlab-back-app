import mongoose, { Connection } from 'mongoose';
import { ClinicImageConfigurationSchema } from 'src/database/schemas/master/clinic-image-configuration';

export const clinicImageProviders = [
  {
    provide: 'CLINIC_IMAGE_CONFIGURATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model(
        'clinic_image_configuration',
        ClinicImageConfigurationSchema,
      ),
    inject: ['DATABASE_CONNECTION'],
  },
];
