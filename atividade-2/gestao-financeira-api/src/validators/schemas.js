import { z } from 'zod';

// Validação para criação de categoria.
const criarCategoriaSchema = z.object({
  name: z.string().min(1, 'name é obrigatório'),
  displayName: z.string().min(1, 'displayName é obrigatório'),
  icon: z.string().min(1, 'icon é obrigatório'),
  background: z.string().min(1, 'background é obrigatório'),
  isIncome: z.boolean().optional().default(false),
});

// Validação para atualização de categoria (todos os campos opcionais).
const atualizarCategoriaSchema = z.object({
  displayName: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  background: z.string().min(1).optional(),
  isIncome: z.boolean().optional(),
});

// Validação para criação de transação.
const criarTransacaoSchema = z.object({
  description: z.string().min(1, 'description é obrigatório'),
  value: z.number({ invalid_type_error: 'value deve ser um número' }),
  date: z.string().min(1, 'date é obrigatório'),
  categoryId: z.string().min(1, 'categoryId é obrigatório'),
});

// Validação para atualização de transação (todos os campos opcionais).
const atualizarTransacaoSchema = z.object({
  description: z.string().min(1).optional(),
  value: z.number().optional(),
  date: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
});

export {
  criarCategoriaSchema,
  atualizarCategoriaSchema,
  criarTransacaoSchema,
  atualizarTransacaoSchema,
};