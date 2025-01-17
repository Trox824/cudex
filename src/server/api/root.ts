import { router } from "../trpc";

export const appRouter = router({
  // Define your procedures here
  // Example:
  // getUser: publicProcedure.query(() => {
  //   return { id: 1, name: "John Doe" };
  // }),
});

export type AppRouter = typeof appRouter;
