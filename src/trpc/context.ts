import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { Request, Response } from 'express';

// Tipo estendido para incluir headers de autorização
type AuthorizedRequest = Request & {
  headers: {
    authorization?: string;
    [key: string]: string | string[] | undefined;
  };
};

/**
 * Cria o contexto para cada requisição
 * @param opts Opções de contexto
 * @returns Contexto do tRPC
 */
export const createContext = (opts: CreateExpressContextOptions) => {
  const { req, res } = opts;
  
  return {
    req: req as unknown as AuthorizedRequest,
    res: res as Response,
    // Adicione aqui qualquer dado que você queira disponibilizar em todos os procedimentos
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
