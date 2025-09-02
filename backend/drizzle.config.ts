import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

declare const process: {
  env: {
    DB_TYPE?: string;
    DB_HOST?: string;
    DB_PORT?: string;
    DB_USER?: string;
    DB_USERNAME?: string;
    // DB_PASSWORD?: string;
    DB_NAME?: string;
    DB_DATABASE?: string;
  };
};

const dbType = process.env.DB_TYPE || 'postgresql';

export default defineConfig({
  schema: './src/database/entities/auth-schema.ts',
  out: './src/database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || process.env.DB_USERNAME || 'root',
    // password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || process.env.DB_DATABASE || 'myapp',
  },
  verbose: true,
  strict: true,
});
