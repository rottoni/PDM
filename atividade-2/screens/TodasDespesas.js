import React from 'react';
import { View, Text } from 'react-native';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

const TodasDespesas = () => {
  const DUMMY_DESPESAS = [
    { id: '1', descricao: 'Conta de luz', valor: 100.99, data: new Date(2025, 2, 11) },
    { id: '2', descricao: 'Conta de água', valor: 40.99, data: new Date(2025, 2, 10) },
    { id: '3', descricao: 'Almoço', valor: 50.50, data: new Date(2025, 2, 15) },
  ];

  return (
    <View>
      <Text>Todas as Despesas</Text>
      <DespesaSumario despesas={DUMMY_DESPESAS} periodo="Março 2025" />
      <DespesaLista despesas={DUMMY_DESPESAS} />
    </View>
  );
};

export default TodasDespesas;