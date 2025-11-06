import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { shorts } from '../db/schema';
import { eq } from 'drizzle-orm';

const createShortSchema = z.object({
  videoId: z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
});

export const shortsRouter = router({
  // Listar shorts do usuário
  list: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.user.userId;
      
      const userShorts = await db
        .select()
        .from(shorts)
        .where(eq(shorts.userId, userId))
        .orderBy(shorts.createdAt);
      
      return userShorts;
    }),

  // Obter um short por ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const short = await db.query.shorts.findFirst({
        where: (shorts, { and, eq }) => and(
          eq(shorts.id, input.id),
          eq(shorts.userId, ctx.user.userId)
        ),
      });

      if (!short) {
        throw new Error('Short não encontrado');
      }

      return short;
    }),

  // Criar um novo short
  create: protectedProcedure
    .input(createShortSchema)
    .mutation(async ({ input, ctx }) => {
      const [newShort] = await db
        .insert(shorts)
        .values({
          ...input,
          userId: ctx.user.userId,
          status: 'pending',
        });

      // Busca o short recém-criado para retornar todos os campos
      const [createdShort] = await db
        .select()
        .from(shorts)
        .where(eq(shorts.id, newShort.insertId))
        .limit(1);

      return createdShort;
    }),

  // Atualizar um short
  update: protectedProcedure
    .input(createShortSchema.partial().extend({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      
      // Verifica se o short pertence ao usuário
      const short = await db.query.shorts.findFirst({
        where: (shorts, { and, eq }) => and(
          eq(shorts.id, id),
          eq(shorts.userId, ctx.user.userId)
        ),
      });

      if (!short) {
        throw new Error('Short não encontrado');
      }

      await db
        .update(shorts)
        .set(data)
        .where(eq(shorts.id, id));

      return { success: true };
    }),

  // Deletar um short
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      
      // Verifica se o short pertence ao usuário
      const short = await db.query.shorts.findFirst({
        where: (shorts, { and, eq }) => and(
          eq(shorts.id, id),
          eq(shorts.userId, ctx.user.userId)
        ),
      });

      if (!short) {
        throw new Error('Short não encontrado');
      }

      await db
        .delete(shorts)
        .where(eq(shorts.id, id));

      return { success: true };
    }),
});
