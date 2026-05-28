// Lista de meses para os filtros (value = 1..12).
export const MESES = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

// Retorna uma lista de anos em torno do ano atual para o filtro.
export function gerarAnos(quantidade = 5) {
  const anoAtual = new Date().getFullYear();
  const anos = [];
  for (let i = 0; i < quantidade; i++) {
    anos.push(anoAtual - i);
  }
  return anos;
}

export function nomeDoMes(value) {
  const mes = MESES.find((m) => m.value === value);
  return mes ? mes.label : '';
}