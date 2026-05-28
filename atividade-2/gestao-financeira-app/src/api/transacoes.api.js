import { cliente } from './cliente';

export async function listarTransacoes(mes, ano) {
  const params = {};
  if (mes && ano) {
    params.month = mes;
    params.year = ano;
  }
  const { data } = await cliente.get('/transactions', { params });
  return data;
}

export async function criarTransacao(transacao) {
  const { data } = await cliente.post('/transactions', transacao);
  return data;
}

export async function atualizarTransacao(id, dados) {
  const { data } = await cliente.put(`/transactions/${id}`, dados);
  return data;
}

export async function excluirTransacao(id) {
  await cliente.delete(`/transactions/${id}`);
}