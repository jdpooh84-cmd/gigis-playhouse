import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { childrenRouter } from "./routers/children";
import { learningRouter } from "./routers/learning";
import { channelsRouter } from "./routers/channels";
import { parentRouter } from "./routers/parent";
import { adminRouter } from "./routers/admin";
import { stripeRouter } from "./routers/stripe";
import { sponsorRouter } from "./routers/sponsor";
import { srsRouter } from "./routers/srs";
import { curatedVideosRouter } from "./routers/curatedVideos";
import { dailyPlanRouter } from "./routers/dailyPlan";
import { progressEmailRouter } from "./routers/progressEmail";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Feature routers
  children: childrenRouter,
  learning: learningRouter,
  channels: channelsRouter,
  parent: parentRouter,
  admin: adminRouter,
  stripe: stripeRouter,
  sponsor: sponsorRouter,
  srs: srsRouter,
  curatedVideos: curatedVideosRouter,
  dailyPlan: dailyPlanRouter,
  progressEmail: progressEmailRouter,
});

export type AppRouter = typeof appRouter;
