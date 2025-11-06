import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { videos } from '../db/schema';
import { eq } from 'drizzle-orm';

const createVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
});

export const videoRouter = router({
  // Listar vídeos do usuário
  list: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.user.userId;
      
      const userVideos = await db
        .select()
        .from(videos)
        .where(eq(videos.userId, userId))
        .orderBy(videos.createdAt);
      
      return userVideos;
    }),

  // Obter um vídeo por ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const video = await db.query.videos.findFirst({
        where: (videos, { and, eq }) => and(
          eq(videos.id, input.id),
          eq(videos.userId, ctx.user.userId)
        ),
      });

      if (!video) {
        throw new Error('Vídeo não encontrado');
      }

      return video;
    }),

  // Criar um novo vídeo
  create: protectedProcedure
    .input(createVideoSchema)
    .mutation(async ({ input, ctx }) => {
      const [newVideo] = await db
        .insert(videos)
        .values({
          ...input,
          userId: ctx.user.userId,
          status: 'pending',
        });

      // Busca o vídeo recém-criado para retornar todos os campos
      const [createdVideo] = await db
        .select()
        .from(videos)
        .where(eq(videos.id, newVideo.insertId))
        .limit(1);

      return createdVideo;
    }),

  // Atualizar um vídeo
  update: protectedProcedure
    .input(createVideoSchema.partial().extend({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      
      // Verifica se o vídeo pertence ao usuário
      const video = await db.query.videos.findFirst({
        where: (videos, { and, eq }) => and(
          eq(videos.id, id),
          eq(videos.userId, ctx.user.userId)
        ),
      });

      if (!video) {
        throw new Error('Vídeo não encontrado');
      }

      await db
        .update(videos)
        .set(data)
        .where(eq(videos.id, id));

      return { success: true };
    }),

  // Deletar um vídeo
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      
      // Verifica se o vídeo pertence ao usuário
      const video = await db.query.videos.findFirst({
        where: (videos, { and, eq }) => and(
          eq(videos.id, id),
          eq(videos.userId, ctx.user.userId)
        ),
      });

      if (!video) {
        throw new Error('Vídeo não encontrado');
      }

      await db
        .delete(videos)
        .where(eq(videos.id, id));

      return { success: true };
    }),
});
