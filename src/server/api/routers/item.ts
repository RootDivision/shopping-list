import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.item.findMany();

    return items;
  }),

  getUnique: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const item = await ctx.prisma.item.findUnique({
        where: { id: id },
        select: { id: true, name: true },
      });

      return item;
    }),

  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const item = await ctx.prisma.item.create({
        data: { name: name, checked: false },
      });

      return item;
    }),

  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const item = await ctx.prisma.item.delete({
        where: { id },
      });

      return item;
    }),

  checkItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
        checked: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, checked } = input;
      const updatedItem = await ctx.prisma.item.update({
        where: { id },
        data: { checked },
      });

      return updatedItem;
    }),
});
