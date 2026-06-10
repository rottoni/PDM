import React from 'react';
import { View, Text } from 'react-native';

const DespesaItem = ({ despesa }) => {
  return (
    <View>
      <Text>{despesa.descricao}</Text>
      <Text>R${despesa.valor.toFixed(2)}</Text>
      <Text>{despesa.data.toLocaleDateString()}</Text>
    </View>
  );
};

export default DespesaItem;