import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import { prisma } from "@/lib/db";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({});
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: {
        hello: "world hahaha",
        id: "test-id"
      },
    });

    return { success: true, message: "Workflow created and event sent" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
