import { user, session, account, verification } from "../database/entities/auth-schema";

export const EntityMap = {
  User: user,
  Session: session,
  Account: account,
  Verification: verification,
};

export type AllowedEntity = keyof typeof EntityMap;

export const EntityLabels = {
  User: "Users",
  Session: "Sessions", 
  Account: "Accounts",
  Verification: "Verifications",
};

export const EntityFields = {
  User: ["email", "name", "role", "emailVerified"],
  Session: [ "userId", "expiresAt", "createdAt"],
  Account: ["userId", "providerId", "accountId", "createdAt"],
  Verification: [ "identifier", "value", "expiresAt", "createdAt"],
};
