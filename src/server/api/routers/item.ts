import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.item.findMany();
  }),
  getUnique: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.item.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
        },
      });
    }),
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const item = await ctx.prisma.item.create({
        data: { name: name },
      });

      return item;
    }),
});

// publicProcedure
//     .input(z.object({ name: z.string() }))
//     .mutation((req) => {
//       const id = `${Math.random()}`;

//       const user: User = {
//         id,
//         name: req.input.name,
//       };

//       userList.push(user);

//       return user;
//     }),
