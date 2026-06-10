import React from 'react';
import { View, Text } from 'react-native';
import DespesaSumario from './DespesaSumario';

const DespesaSaida = ({ despesas, periodo }) => {
  return (
    <View>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <Text>Resumo das despesas...</Text>
    </View>
  );
};

export default DespesaSaida;