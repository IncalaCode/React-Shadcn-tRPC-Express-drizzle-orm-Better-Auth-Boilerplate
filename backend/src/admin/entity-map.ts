import { user, session, account, verification } from "../database/entities/auth-schema";

export const EntityMap = {
  User: user,
  Session: session,
  Account: account,
  Verification: verification,
};

export type AllowedEntity = keyof typeof EntityMap;

// This is the labels and icons for the entities in the admin panel
// It will be used to display the entity names and icons in the admin panel
// u can change the labels and icons to whatever you want

export const EntityLabels = {
  User: { label: "Users", icon: "Users" },
  Session: { label: "Sessions", icon: "Database" }, 
  Account: { label: "Accounts", icon: "Shield" },
  Verification: { label: "Verifications", icon: "Mail" }, 
};

// This is the fields for the entities in the admin panel
// u can add any fields here as long as it is in the entity schema
// make sure to match the fields with the entity schema

export const EntityFields = {
  User: ["email", "phone", "name", "role", "emailVerified", "phoneVerified"],
  Session: [ "userId", "expiresAt", "createdAt"],
  Account: ["userId", "providerId", "accountId", "createdAt"],
  Verification: [ "identifier", "value", "expiresAt", "createdAt"],
};

// Examples of other Lucide icons you can use in EntityLabels:
// "Settings", "Home", "Search", "Plus", "Edit", "Trash", "Eye", "Lock", "Unlock"
// "Calendar", "Clock", "Star", "Heart", "MessageCircle", "Bell", "Download"
// "Upload", "File", "Folder", "Image", "Video", "Music", "Archive"
