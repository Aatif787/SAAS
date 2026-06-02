import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { blogPosts } from "../../db/schema";
import { eq, and, desc, count } from "drizzle-orm";

export const blogRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        category: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input ?? { page: 1, limit: 10 };
      const offset = (params.page - 1) * params.limit;

      const conditions = [eq(blogPosts.published, true)];
      if (params.category) {
        conditions.push(eq(blogPosts.category, params.category));
      }

      const items = await db
        .select()
        .from(blogPosts)
        .where(and(...conditions))
        .orderBy(desc(blogPosts.createdAt))
        .limit(params.limit)
        .offset(offset);

      const totalResult = await db
        .select({ value: count() })
        .from(blogPosts)
        .where(and(...conditions));

      return { items, total: totalResult[0]?.value ?? 0 };
    }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, input.slug))
        .limit(1);
      return results[0] ?? null;
    }),

  categories: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select({ category: blogPosts.category })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .groupBy(blogPosts.category);
    return results.map((r: any) => r.category);
  }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        category: z.string().min(1),
        coverImage: z.string().optional(),
        authorId: z.number().optional(),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(blogPosts).values(input);
      const inserted = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, Number(result[0].insertId)))
        .limit(1);
      return inserted[0];
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
        coverImage: z.string().optional(),
        authorId: z.number().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
      const updated = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
      return updated[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),
});
