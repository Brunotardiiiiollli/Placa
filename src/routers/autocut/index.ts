import { z } from 'zod';
import { router, publicProcedure } from '../../trpc';

export const autocutRouter = router({
  processVideo: publicProcedure
    .input(z.object({
      videoUrl: z.string().url('URL do vídeo inválida'),
      startTime: z.number().min(0, 'O tempo inicial não pode ser negativo'),
      endTime: z.number().min(0, 'O tempo final não pode ser negativo'),
    }))
    .mutation(async ({ input }) => {
      // Lógica para processar o vídeo
      return {
        success: true,
        message: 'Vídeo processado com sucesso',
        data: {
          videoUrl: input.videoUrl,
          startTime: input.startTime,
          endTime: input.endTime,
        },
      };
    }),
});

export type AutocutRouter = typeof autocutRouter;
