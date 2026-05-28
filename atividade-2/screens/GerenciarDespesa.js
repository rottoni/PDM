import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const GerenciarDespesa = () => {
  // Estados para armazenar os valores de cada campo
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  // Função para adicionar a despesa
  const adicionarDespesa = () => {
    const novaDespesa = {
      descricao: descricao,
      valor: parseFloat(valor),
      data: new Date(data),
    };
    console.log(novaDespesa);
    // Aqui você pode adicionar a despesa ao seu banco de dados ou estado global
  };

  return (
    <View>
      <Text>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição da despesa"
      />
      
      <Text>Valor</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        placeholder="Valor da despesa"
      />
      
      <Text>Data</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        placeholder="Data da despesa (YYYY-MM-DD)"
      />
      
      <Button title="Adicionar Despesa" onPress={adicionarDespesa} />
    </View>
  );
};

export default GerenciarDespesa;