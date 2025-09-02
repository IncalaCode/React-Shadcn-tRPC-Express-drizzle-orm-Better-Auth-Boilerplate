import { z } from "zod";
import { publicProcedure } from "../trpc/trpc";
import { isAuthenticated, hasRole } from "../trpc/middleware/auth";
import { AdminService } from "./admin.service";
import { EntityMap, AllowedEntity } from "./entity-map";

const adminService = new AdminService();

// Get entity names dynamically from EntityMap
const entityNames = Object.keys(EntityMap) as [AllowedEntity, ...AllowedEntity[]];

const crudSchema = z.object({
  entity: z.enum(entityNames),
  action: z.enum(["create", "update", "delete", "find"]),
  data: z.any().optional(),
});

const getDataSchema = z.object({
  entity: z.enum(entityNames),
});

export const adminProcedures = {
  getConfig: publicProcedure
    .use(isAuthenticated)
    .use(hasRole("admin"))
    .query(async ({ ctx }) => {
      const config = await adminService.getEntityConfig();
      return {
        admin: {
          name: ctx.user.name,
          email: ctx.user.email,
          role: ctx.user.role,
        },
        ...config,
      };
    }),

  getData: publicProcedure
    .use(isAuthenticated)
    .use(hasRole("admin"))
    .input(getDataSchema)
    .query(async ({ input }) => {
      const { entity } = input;
      return await adminService.handleCRUD(entity, "find");
    }),

  crud: publicProcedure
    .use(isAuthenticated)
    .use(hasRole("admin"))
    .input(crudSchema)
    .mutation(async ({ input }) => {
      const { entity, action, data } = input;
      return await adminService.handleCRUD(entity, action, data);
    }),
};
