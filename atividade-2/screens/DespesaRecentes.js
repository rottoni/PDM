import React from 'react';
import { View, Text, FlatList } from 'react-native';

const DespesaRecentes = () => {
  // Exemplo de despesas
  const DUMMY_DESPESAS = [
    { id: '1', descricao: 'Conta de luz', valor: 100.99, data: new Date(2025, 2, 11) },
    { id: '2', descricao: 'Conta de água', valor: 40.99, data: new Date(2025, 2, 10) },
    { id: '3', descricao: 'Almoço', valor: 50.50, data: new Date(2025, 2, 15) },
  ];

  // Função para filtrar despesas dos últimos 7 dias
  const filtrarUltimos7Dias = (despesas) => {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);
    
    return despesas.filter((despesa) => despesa.data >= seteDiasAtras);
  };

  // Aplicando o filtro
  const despesasRecentes = filtrarUltimos7Dias(DUMMY_DESPESAS);

  return (
    <View>
      <Text>Despesas Recentes</Text>
      <FlatList
        data={despesasRecentes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.descricao}</Text>
            <Text>R${item.valor}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DespesaRecentes;