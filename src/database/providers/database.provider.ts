import mongoose from 'mongoose';

console.log("🔍 DATABASE_URI:", process.env.DATABASE_URI); // 👀 Verificar si se está tomando

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      if (!process.env.DATABASE_URI) {
        throw new Error("❌ DATABASE_URI is not set!");
      }
      return mongoose.connect(process.env.DATABASE_URI);
    },
  },
];
