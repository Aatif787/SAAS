import { relations } from "drizzle-orm";
import { properties, agents, blogPosts, inquiries } from "./schema";

export const agentRelations = relations(agents, ({ many }) => ({
  properties: many(properties),
  blogPosts: many(blogPosts),
}));

export const propertyRelations = relations(properties, ({ one }) => ({
  agent: one(agents, {
    fields: [properties.agentId],
    references: [agents.id],
  }),
}));

export const blogPostRelations = relations(blogPosts, ({ one }) => ({
  author: one(agents, {
    fields: [blogPosts.authorId],
    references: [agents.id],
  }),
}));

export const inquiryRelations = relations(inquiries, ({ one }) => ({
  property: one(properties, {
    fields: [inquiries.propertyId],
    references: [properties.id],
  }),
}));
