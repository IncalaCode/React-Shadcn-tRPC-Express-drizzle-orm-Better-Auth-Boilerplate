import { db } from "../database/connection";
import { eq, desc } from "drizzle-orm";
import { EntityMap, EntityLabels, EntityFields, AllowedEntity } from "./entity-map";
import { randomUUID } from "crypto";

export class AdminService {
  private transformData(data: any, action: 'create' | 'update'): any {
    const transformed = { ...data };
    
    const dateFields = ['createdAt', 'updatedAt', 'expiresAt'];
    dateFields.forEach(field => {
      if (transformed[field]) {
        if (typeof transformed[field] === 'string') {
          transformed[field] = new Date(transformed[field]);
        }
      }
    });


    const booleanFields = ['emailVerified', 'banned'];
    booleanFields.forEach(field => {
      if (transformed[field] !== undefined) {
        if (typeof transformed[field] === 'string') {
          transformed[field] = transformed[field] === 'true' ? 1 : 0;
        } else if (typeof transformed[field] === 'boolean') {
          transformed[field] = transformed[field] ? 1 : 0;
        }
      }
    });

    const additionalDateFields = ['banExpires'];
    additionalDateFields.forEach(field => {
      if (transformed[field]) {
        if (typeof transformed[field] === 'string') {
          transformed[field] = new Date(transformed[field]);
        }
      }
    });


    if (action === 'create') {
      if (!transformed.id) {
        transformed.id = randomUUID();
      }
      if (!transformed.createdAt) {
        transformed.createdAt = new Date();
      }
      if (!transformed.updatedAt) {
        transformed.updatedAt = new Date();
      }
    }


    if (action === 'update') {
      transformed.updatedAt = new Date();
    }

    return transformed;
  }

  async handleCRUD(
    entity: AllowedEntity,
    action: 'create' | 'update' | 'delete' | 'find',
    data?: any
  ) {
    const table = EntityMap[entity];
    if (!table) {
      throw new Error(`Unknown entity: ${entity}`);
    }

    switch (action) {
      case 'create':
        const transformedCreateData = this.transformData(data, 'create');
        await db.insert(table).values(transformedCreateData);
        const created = await db.select().from(table).where(eq(table.id, transformedCreateData.id)).limit(1);
        return created[0] || transformedCreateData;
      
      case 'update':
        if (!data.id) throw new Error('ID required for update');
        const transformedUpdateData = this.transformData(data, 'update');
        await db.update(table).set(transformedUpdateData).where(eq(table.id, data.id));
        const updated = await db.select().from(table).where(eq(table.id, data.id)).limit(1);
        return updated[0] || transformedUpdateData;
      
      case 'delete':
        if (!data.id) throw new Error('ID required for delete');
        await db.delete(table).where(eq(table.id, data.id));
        return { success: true };
      
      case 'find':
        return await db.select().from(table).orderBy(desc(table.createdAt)).limit(100);
      
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }

  async getEntityConfig() {
    return {
      entities: Object.keys(EntityMap).map(name => ({
        name,
        label: EntityLabels[name as AllowedEntity],
        fields: EntityFields[name as AllowedEntity]
      }))
    };
  }
}
