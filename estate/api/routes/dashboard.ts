import { createRouter, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { properties, inquiries, contactSubmissions, blogPosts } from "../../db/schema";
import { count, eq } from "drizzle-orm";

export const dashboardRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    const [propCount] = await db.select({ value: count() }).from(properties);
    const [inqCount] = await db.select({ value: count() }).from(inquiries);
    const [contactCount] = await db.select({ value: count() }).from(contactSubmissions);
    const [blogCount] = await db.select({ value: count() }).from(blogPosts);
    const [newInqCount] = await db
      .select({ value: count() })
      .from(inquiries)
      .where(eq(inquiries.status, "new"));

    return {
      totalProperties: propCount?.value ?? 0,
      totalInquiries: inqCount?.value ?? 0,
      totalContacts: contactCount?.value ?? 0,
      totalBlogPosts: blogCount?.value ?? 0,
      newInquiriesCount: newInqCount?.value ?? 0,
    };
  }),

  recentInquiries: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(inquiries)
      .orderBy(inquiries.createdAt)
      .limit(5);
  }),

  recentContacts: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(contactSubmissions)
      .orderBy(contactSubmissions.createdAt)
      .limit(5);
  }),
});
