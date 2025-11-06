import { router } from '../trpc';
import { authRouter } from './auth';
import { videoRouter } from './video';
import { shortsRouter } from './shorts';

export const appRouter = router({
  auth: authRouter,
  video: videoRouter,
  shorts: shortsRouter,
  // Adicione outros roteadores aqui
});

export type AppRouter = typeof appRouter;
