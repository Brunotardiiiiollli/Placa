import { z } from 'zod';
import { router, publicProcedure } from '../../trpc';

// Exemplo de schema para transações financeiras
const TransactionSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'A descrição é obrigatória'),
  amount: z.number().min(0.01, 'O valor deve ser maior que zero'),
  type: z.enum(['income', 'expense']),
  date: z.string().or(z.date()),
  category: z.string().optional(),
});

export const financeiroRouter = router({
  // Adicionar uma nova transação
  addTransaction: publicProcedure
    .input(TransactionSchema)
    .mutation(async ({ input }) => {
      // Lógica para adicionar transação
      return {
        success: true,
        message: 'Transação adicionada com sucesso',
        data: input,
      };
    }),

  // Listar transações
  listTransactions: publicProcedure
    .input(z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      type: z.enum(['income', 'expense']).optional(),
    }))
    .query(async ({ input }) => {
      // Lógica para listar transações
      return {
        success: true,
        data: [],
      };
    }),
});

export type FinanceiroRouter = typeof financeiroRouter;
