import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { properties } from "../../db/schema";
import { eq, and, gte, lte, like, desc, asc, count } from "drizzle-orm";

export const propertyRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(12),
        type: z.enum(["apartment", "villa", "penthouse", "duplex", "studio"]).optional(),
        status: z.enum(["available", "sold", "reserved"]).optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        bedrooms: z.number().optional(),
        neighborhood: z.string().optional(),
        sortBy: z.enum(["price_asc", "price_desc", "newest"]).default("newest"),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input ?? { page: 1, limit: 12, sortBy: "newest" };
      const offset = (params.page - 1) * params.limit;

      const conditions = [];
      if (params.type) conditions.push(eq(properties.propertyType, params.type));
      if (params.status) conditions.push(eq(properties.status, params.status));
      if (params.minPrice) conditions.push(gte(properties.price, params.minPrice));
      if (params.maxPrice) conditions.push(lte(properties.price, params.maxPrice));
      if (params.bedrooms) conditions.push(gte(properties.bedrooms, params.bedrooms));
      if (params.neighborhood) conditions.push(like(properties.neighborhood, `%${params.neighborhood}%`));

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      let orderBy;
      switch (params.sortBy) {
        case "price_asc":
          orderBy = asc(properties.price);
          break;
        case "price_desc":
          orderBy = desc(properties.price);
          break;
        default:
          orderBy = desc(properties.createdAt);
      }

      const items = await db
        .select()
        .from(properties)
        .where(whereClause)
        .orderBy(orderBy)
        .limit(params.limit)
        .offset(offset);

      const totalResult = await db
        .select({ value: count() })
        .from(properties)
        .where(whereClause);

      return {
        items,
        total: totalResult[0]?.value ?? 0,
      };
    }),

  featured: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(properties)
      .where(eq(properties.featured, true))
      .orderBy(desc(properties.createdAt))
      .limit(6);
  }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(properties)
        .where(eq(properties.slug, input.slug))
        .limit(1);
      return results[0] ?? null;
    }),

  neighborhoods: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select({
        name: properties.neighborhood,
        count: count(),
      })
      .from(properties)
      .groupBy(properties.neighborhood)
      .orderBy(desc(count()));
    return results;
  }),

  types: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select({
        type: properties.propertyType,
        count: count(),
      })
      .from(properties)
      .groupBy(properties.propertyType)
      .orderBy(desc(count()));
    return results;
  }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().min(1),
        shortDescription: z.string().optional(),
        address: z.string().min(1),
        neighborhood: z.string().min(1),
        city: z.string().default("Netanya"),
        price: z.number().positive(),
        bedrooms: z.number().int().min(0),
        bathrooms: z.number().int().min(0),
        areaSqm: z.number().positive(),
        yearBuilt: z.number().int().optional(),
        propertyType: z.enum(["apartment", "villa", "penthouse", "duplex", "studio"]),
        status: z.enum(["available", "sold", "reserved"]).default("available"),
        featured: z.boolean().default(false),
        mainImage: z.string().min(1),
        images: z.array(z.string()).optional(),
        amenities: z.array(z.string()).optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        agentId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(properties).values(input);
      const inserted = await db
        .select()
        .from(properties)
        .where(eq(properties.id, Number(result[0].insertId)))
        .limit(1);
      return inserted[0];
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        address: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        price: z.number().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        areaSqm: z.number().optional(),
        yearBuilt: z.number().optional(),
        propertyType: z.enum(["apartment", "villa", "penthouse", "duplex", "studio"]).optional(),
        status: z.enum(["available", "sold", "reserved"]).optional(),
        featured: z.boolean().optional(),
        mainImage: z.string().optional(),
        images: z.array(z.string()).optional(),
        amenities: z.array(z.string()).optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        agentId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(properties).set(data).where(eq(properties.id, id));
      const updated = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
      return updated[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(properties).where(eq(properties.id, input.id));
      return { success: true };
    }),
});
