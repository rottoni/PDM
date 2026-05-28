import 'dotenv/config';

const express = require('express');
const cors = require('cors');

const categoriasRoutes = require('./routes/categorias.routes');
const transacoesRoutes = require('./routes/transacoes.routes');

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