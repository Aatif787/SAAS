import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { inquiries } from "../../db/schema";
import { eq, desc, count } from "drizzle-orm";

export const inquiryRouter = createRouter({
  list: adminQuery
    .input(
      z.object({
        status: z.enum(["new", "contacted", "closed"]).optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input ?? { page: 1, limit: 20 };
      const offset = (params.page - 1) * params.limit;

      const conditions = [];
      if (params.status) conditions.push(eq(inquiries.status, params.status));

      const whereClause = conditions.length > 0 ? conditions[0] : undefined;

      const items = await db
        .select()
        .from(inquiries)
        .where(whereClause)
        .orderBy(desc(inquiries.createdAt))
        .limit(params.limit)
        .offset(offset);

      const totalResult = await db
        .select({ value: count() })
        .from(inquiries)
        .where(whereClause);

      return { items, total: totalResult[0]?.value ?? 0 };
    }),

  create: publicQuery
    .input(
      z.object({
        propertyId: z.number().optional(),
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(inquiries).values(input);
      return { success: true };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "closed"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(inquiries)
        .set({ status: input.status })
        .where(eq(inquiries.id, input.id));
      const updated = await db
        .select()
        .from(inquiries)
        .where(eq(inquiries.id, input.id))
        .limit(1);
      return updated[0];
    }),
});
