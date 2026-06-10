import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import categoriasRoutes from './routes/categorias.routes.js';
import transacoesRoutes from './routes/transacoes.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health-check
app.get('/', (req, res) => {
  res.json({ ok: true, name: 'gestao-financeira-api' });
});

// Rotas principais
app.use('/categories', categoriasRoutes);
app.use('/transactions', transacoesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});