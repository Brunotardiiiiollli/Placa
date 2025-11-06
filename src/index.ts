import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './trpc';
import { authRouter } from './auth';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rotas de autenticação
app.use('/auth', authRouter);

// Rotas tRPC
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export type AppRouter = typeof appRouter;
