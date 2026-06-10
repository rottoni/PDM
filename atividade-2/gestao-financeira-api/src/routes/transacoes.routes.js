import prisma from '../lib/prisma.js';
import { Router } from 'express';
import {
  criarTransacaoSchema,
  atualizarTransacaoSchema,
} from '../validators/schemas.js';

const router = Router();

// GET /transactions?month=4&year=2026 -> lista transações (filtro opcional)
router.get('/', async (req, res) => {
  const { month, year } = req.query;
  let where = {};

  // Quando mês e ano são informados, filtra pelo intervalo do mês.
  if (month && year) {
    const mes = Number(month); // 1 a 12
    const ano = Number(year);
    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 1); // primeiro dia do mês seguinte
    where = { date: { gte: inicio, lt: fim } };
  }

  const transacoes = await prisma.transaction.findMany({
    where,
    include: { category: true },
    orderBy: { date: 'desc' },
  });

  return res.json(transacoes);
});

// POST /transactions -> cria uma transação
router.post('/', async (req, res) => {
  const resultado = criarTransacaoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: resultado.error.issues,
    });
  }

  const { description, value, date, categoryId } = resultado.data;

  // Garante que a categoria informada existe.
  const categoria = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!categoria) {
    return res.status(400).json({ error: 'Categoria não encontrada' });
  }

  const transacao = await prisma.transaction.create({
    data: { description, value, date: new Date(date), categoryId },
    include: { category: true },
  });

  return res.status(201).json(transacao);
});

// PUT /transactions/:id -> atualiza uma transação
router.put('/:id', async (req, res) => {
  const resultado = atualizarTransacaoSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: resultado.error.issues,
    });
  }

  const dados = { ...resultado.data };
  if (dados.date) {
    dados.date = new Date(dados.date);
  }

  try {
    const transacao = await prisma.transaction.update({
      where: { id: req.params.id },
      data: dados,
      include: { category: true },
    });
    return res.json(transacao);
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    return res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
});

// DELETE /transactions/:id -> exclui uma transação
router.delete('/:id', async (req, res) => {
  try {
    await prisma.transaction.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    return res.status(500).json({ error: 'Erro ao excluir transação' });
  }
});

export default router;