import 'dotenv/config';
import { mysqlTable, varchar, datetime, tinyint } from "drizzle-orm/mysql-core";

// MySQL Schema
export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: tinyint("email_verified")
    .$defaultFn(() => 0)
    .notNull(),
  image: varchar("image", { length: 500 }),
  role: varchar("role", { length: 50 }).$defaultFn(() => "user").notNull(),
  banned: tinyint("banned").$defaultFn(() => 0).notNull(),
  banReason: varchar("ban_reason", { length: 1000 }),
  banExpires: datetime("ban_expires"),
  createdAt: datetime("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: datetime("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  expiresAt: datetime("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: varchar("user_agent", { length: 1000 }),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 255 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: varchar("access_token", { length: 2000 }),
  refreshToken: varchar("refresh_token", { length: 2000 }),
  idToken: varchar("id_token", { length: 2000 }),
  accessTokenExpiresAt: datetime("access_token_expires_at"),
  refreshTokenExpiresAt: datetime("refresh_token_expires_at"),
  scope: varchar("scope", { length: 1000 }),
  password: varchar("password", { length: 255 }),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 255 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: datetime("expires_at").notNull(),
  createdAt: datetime("created_at").$defaultFn(
    () => new Date(),
  ),
  updatedAt: datetime("updated_at").$defaultFn(
    () => new Date(),
  ),
});
