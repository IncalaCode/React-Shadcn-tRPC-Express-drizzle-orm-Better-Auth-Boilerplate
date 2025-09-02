import "dotenv/config";
import { db } from "../connection";
import { user } from "../entities/auth-schema";
import { eq } from "drizzle-orm";
import { auth } from "../../auth/config";

export async function seedAdmin() {
  try {
    const [existingAdmin] = await db
      .select()
      .from(user)
      .where(eq(user.email, "admin@example.com"));

    if (existingAdmin) {
      if (existingAdmin.role !== "admin") {
        await db
          .update(user)
          .set({ 
            role: "admin",
            name: "System Administrator"
          })
          .where(eq(user.id, existingAdmin.id));
      }
      return;
    }

    try {
      const result = await auth.api.signUpEmail({
        body: {
          email: "admin@example.com",
          password: "admin123",
          name: "System Administrator",
        },
        headers: {} as any,
      });

      if (result && result.user) {
        await db
          .update(user)
          .set({ 
            role: "admin",
            emailVerified: true
          })
          .where(eq(user.id, result.user.id));
      }
    } catch (authError) {
      console.error('❌ Error:', authError);
    }

  } catch (error) {
    throw error;
  }
}

if (require.main === module) {
  seedAdmin().catch(() => {
    process.exit(1);
  });
}
