import React from 'react';
import { View, FlatList } from 'react-native';
import DespesaItem from './DespesaItem';

const DespesaLista = ({ despesas }) => {
  return (
    <View>
      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DespesaItem despesa={item} />}
      />
    </View>
  );
};

export default DespesaLista;