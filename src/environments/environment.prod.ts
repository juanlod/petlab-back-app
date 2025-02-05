export const environment = {
  production: true,
  secret: process.env.SECRET_KEY || 'F4DBBEDD9239B919FF24B2D75BCA8',
  database: process.env.DATABASE_URI,
  origin: '*',
};
