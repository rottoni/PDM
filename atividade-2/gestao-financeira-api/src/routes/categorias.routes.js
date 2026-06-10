import prisma from '../lib/prisma.js';
import { Router } from 'express';
import {
  criarCategoriaSchema,
  atualizarCategoriaSchema,
} from '../validators/schemas.js';

const router = Router();

// GET /categories -> lista todas as categorias
router.get('/', async (req, res) => {
  const categorias = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return res.json(categorias);
});

// POST /categories -> cria uma nova categoria
router.post('/', async (req, res) => {
  const resultado = criarCategoriaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: resultado.error.issues,
    });
  }

  try {
    const categoria = await prisma.category.create({
      data: { ...resultado.data, isDefault: false },
    });
    return res.status(201).json(categoria);
  } catch (erro) {
    // Violação de unicidade do campo name
    if (erro.code === 'P2002') {
      return res
        .status(400)
        .json({ error: 'Já existe uma categoria com esse name' });
    }
    return res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

// PUT /categories/:id -> atualiza uma categoria
router.put('/:id', async (req, res) => {
  const resultado = atualizarCategoriaSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: resultado.error.issues,
    });
  }

  try {
    const categoria = await prisma.category.update({
      where: { id: req.params.id },
      data: resultado.data,
    });
    return res.json(categoria);
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    return res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});

// DELETE /categories/:id -> exclui uma categoria (exceto padrão)
router.delete('/:id', async (req, res) => {
  const categoria = await prisma.category.findUnique({
    where: { id: req.params.id },
  });

  if (!categoria) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }

  if (categoria.isDefault) {
    return res
      .status(400)
      .json({ error: 'Categorias padrão não podem ser excluídas' });
  }

  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (erro) {
    // Falha por existirem transações vinculadas a esta categoria
    if (erro.code === 'P2003') {
      return res.status(400).json({
        error: 'Não é possível excluir: existem transações nesta categoria',
      });
    }
    return res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
});

export default router;