import { cliente } from './cliente';

export async function listarCategorias() {
  const { data } = await cliente.get('/categories');
  return data;
}

export async function criarCategoria(categoria) {
  const { data } = await cliente.post('/categories', categoria);
  return data;
}

export async function atualizarCategoria(id, dados) {
  const { data } = await cliente.put(`/categories/${id}`, dados);
  return data;
}

export async function excluirCategoria(id) {
  await cliente.delete(`/categories/${id}`);
}