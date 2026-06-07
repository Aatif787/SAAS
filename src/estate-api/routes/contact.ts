import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contactSubmissions } from "../../db/schema";
import { desc, count } from "drizzle-orm";

export const contactRouter = createRouter({
  list: adminQuery
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input ?? { page: 1, limit: 20 };
      const offset = (params.page - 1) * params.limit;

      const items = await db
        .select()
        .from(contactSubmissions)
        .orderBy(desc(contactSubmissions.createdAt))
        .limit(params.limit)
        .offset(offset);

      const totalResult = await db
        .select({ value: count() })
        .from(contactSubmissions);

      return { items, total: totalResult[0]?.value ?? 0 };
    }),

  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(contactSubmissions).values(input);
      return { success: true };
    }),
});
