import { z } from "zod";
import { createRouter, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { users } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

export const adminRouter = createRouter({
  users: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt));
  }),

  updateRole: adminQuery
    .input(
      z.object({
        id: z.number(),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.id));
      const updated = await db
        .select()
        .from(users)
        .where(eq(users.id, input.id))
        .limit(1);
      return updated[0];
    }),
});
