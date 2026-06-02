import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { agents } from "../../db/schema";
import { eq } from "drizzle-orm";

export const agentRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(agents).orderBy(agents.name);
  }),

  byId: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))
        .limit(1);
      return results[0] ?? null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        title: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
        bio: z.string().optional(),
        photo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(agents).values(input);
      const inserted = await db
        .select()
        .from(agents)
        .where(eq(agents.id, Number(result[0].insertId)))
        .limit(1);
      return inserted[0];
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        title: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
        bio: z.string().optional(),
        photo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(agents).set(data).where(eq(agents.id, id));
      const updated = await db.select().from(agents).where(eq(agents.id, id)).limit(1);
      return updated[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(agents).where(eq(agents.id, input.id));
      return { success: true };
    }),
});
