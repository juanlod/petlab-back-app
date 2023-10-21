import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';
import { clientProviders } from './providers/clinic/client.provider';
import { coatProviders } from './providers/master/coat.provider';
import { petProviders } from './providers/clinic/pet.provider';
import { localityProviders } from './providers/master/locality.provider';
import { provinceProviders } from './providers/master/province.provider';
import { raceProviders } from './providers/master/race.provider';
import { sexProviders } from './providers/master/sex.provider';
import { speciesProviders } from './providers/master/species.provider';
import { storeProviderProviders } from './providers/store/store-provider.provider';
import { productProviders } from './providers/store/product.provider';
import { batchesProviders } from './providers/store/batches.provider';
import { unityTypeProviders } from './providers/store/unity-type.provider';
import { productTypeProviders } from './providers/store/product-type.provider';
import { debtProviders } from './providers/clinic/debt.provider';
import { clinicImageProviders } from './providers/master/clinic-image.provider';

const clinicProviders = [
  ...userProviders,
  ...clientProviders,
  ...petProviders,
  ...debtProviders,
];

const masterProviders = [
  ...localityProviders,
  ...provinceProviders,
  ...sexProviders,
  ...raceProviders,
  ...speciesProviders,
  ...coatProviders,
  ...clinicImageProviders,
];

const inventoryProviders = [
  ...storeProviderProviders,
  ...productProviders,
  ...batchesProviders,
  ...unityTypeProviders,
  ...productTypeProviders,
];

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    ...masterProviders,
    ...clinicProviders,
    ...inventoryProviders,
  ],
  exports: [
    ...databaseProviders,
    ...masterProviders,
    ...clinicProviders,
    ...inventoryProviders,
  ],
})
export class DatabaseModule {}
