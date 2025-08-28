import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { models } from "./entities";

const isProduction = process.env.NODE_ENV === "production";
const dbType = (process.env.DB_TYPE as any) || "sqlite";
const baseConfig: Partial<DataSourceOptions> = {
  synchronize: process.env.DB_SYNCHRONIZE === "true" || !isProduction,
  logging: process.env.DB_LOGGING === "true" && !isProduction,
  entities: models,
  migrations: ["src/database/migrations/*.ts"],
  subscribers: ["src/database/subscribers/*.ts"],
};

const getDatabaseConfig = (): DataSourceOptions => {
  switch (dbType) {
    case "sqlite":
      return {
        ...baseConfig,
        type: "sqlite",
        database: process.env.DB_DATABASE || "./database.sqlite",
        // SQLite specific settings
        enableWAL: true, // Better concurrency
      } as DataSourceOptions;

    case "postgres":
    case "postgresql":
      return {
        ...baseConfig,
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_DATABASE || "myapp",
        ssl: isProduction ? { rejectUnauthorized: false } : false,
        // PostgreSQL specific settings
        extra: {
          timezone: "UTC",
        },
      } as DataSourceOptions;

    case "mysql":
    case "mariadb":
      return {
        ...baseConfig,
        type: "mysql",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_DATABASE || "myapp",
        ssl: isProduction ? { rejectUnauthorized: false } : false,
        // MySQL specific settings
        extra: {
          timezone: "UTC",
        },
        charset: "utf8mb4",
      } as DataSourceOptions;

    default:
      throw new Error(`Unsupported database type: ${dbType}. Supported types: sqlite, postgres, mysql`);
  }
};

export const AppDataSource = new DataSource(getDatabaseConfig());

export const initializeDatabase = async (): Promise<void> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log(`✅ Database connection established (${dbType.toUpperCase()})`);
      
      if (AppDataSource.options.synchronize) {
        console.log("🔄 Database schema synchronized");
      }
    }
  } catch (error) {
    console.error(`❌ Database connection failed (${dbType.toUpperCase()}):`, error);
    
    if (dbType === "postgres" && (error as any).code === "28P01") {
      console.error("💡 Tip: Check your PostgreSQL credentials in the .env file");
    } else if (dbType === "mysql" && (error as any).code === "ER_ACCESS_DENIED_ERROR") {
      console.error("💡 Tip: Check your MySQL credentials in the .env file");
    } else if (dbType === "sqlite") {
      console.error("💡 Tip: Ensure the SQLite database directory is writable");
    }
    
    throw error;
  }
};
