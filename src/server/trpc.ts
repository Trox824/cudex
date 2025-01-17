import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

// Create context type
export type Context = {
  session: Awaited<ReturnType<typeof getServerSession>> | null;
};

// Create the context
export const createContext = async (
  opts?: CreateNextContextOptions,
): Promise<Context> => {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
};

// Initialize TRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// Auth middleware
const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
