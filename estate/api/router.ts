import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { propertyRouter } from "./routes/property";
import { agentRouter } from "./routes/agent";
import { blogRouter } from "./routes/blog";
import { inquiryRouter } from "./routes/inquiry";
import { contactRouter } from "./routes/contact";
import { dashboardRouter } from "./routes/dashboard";
import { adminRouter } from "./routes/admin";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  property: propertyRouter,
  agent: agentRouter,
  blog: blogRouter,
  inquiry: inquiryRouter,
  contact: contactRouter,
  dashboard: dashboardRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
