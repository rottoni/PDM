import React from 'react';
import { View, Text } from 'react-native';

const DespesaSumario = ({ despesas, periodo }) => {
  // Calculando a soma das despesas usando .reduce()
  const somaDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);

  return (
    <View>
      <Text>Período: {periodo}</Text>
      <Text>Total: R${somaDespesas.toFixed(2)}</Text> {/* Exibe com 2 casas decimais */}
    </View>
  );
};

export default DespesaSumario;