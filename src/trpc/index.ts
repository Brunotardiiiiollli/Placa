import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import superjson from 'superjson';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';
import type { Request } from 'express';

// Tipagem estendida para o contexto
type AuthContext = Context & {
  req: Request;
};

// Inicializa o tRPC com o contexto tipado
const t = initTRPC.context<AuthContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// Middleware para verificar autenticação
const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { req } = ctx;
  
  // Verifica se o cabeçalho de autorização está presente
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED', 
      message: 'Token de autenticação não fornecido' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verifica o token JWT
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { 
      userId: number; 
      email: string 
    };
    
    if (!decoded.userId || !decoded.email) {
      throw new Error('Token inválido');
    }
    
    // Adiciona o usuário ao contexto
    return next({
      ctx: {
        ...ctx,
        user: {
          userId: decoded.userId,
          email: decoded.email,
        },
      },
    });
  } catch (error) {
    console.error('Erro na autenticação:', error);
    throw new TRPCError({ 
      code: 'UNAUTHORIZED', 
      message: 'Token inválido ou expirado' 
    });
  }
});

// Exporta tipos e procedimentos
export const router = t.router;
export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
