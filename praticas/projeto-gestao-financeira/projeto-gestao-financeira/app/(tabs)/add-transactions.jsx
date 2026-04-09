import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import Button from '../../components/Button';
import { globalStyles } from '../../styles/globalStyles';

export default function AddTransactions() {
  // Estado inicial como um objeto
  const [form, setForm] = useState({
    description: '',
    value: '',
    date: '',
    category: 'Renda'
  });

  const handleAddTransaction = () => {
    Alert.alert("Dados Salvos!", `Desc: ${form.description} \nValor: ${form.value}`);
  };

  return (
    <ScrollView style={globalStyles.screenContainer} contentContainerStyle={globalStyles.content}>
      
      {/* Campo Descrição */}
      <View>
        <Text style={globalStyles.inputLabel}>Descrição</Text>
        <TextInput 
          style={globalStyles.input}
          value={form.description}
          // Usamos o Spread Operator (...) para copiar o form antigo e alterar só a description!
          onChangeText={(text) => setForm({ ...form, description: text })}
        />
      </View>

      {/* Campo Valor */}
      <View>
        <Text style={globalStyles.inputLabel}>Valor</Text>
        <TextInput 
          style={globalStyles.input}
          keyboardType="numeric" // Teclado de números!
          value={form.value}
          onChangeText={(text) => setForm({ ...form, value: text })}
        />
      </View>

      {/* Adicione os campos Data e Categoria de forma similar... */}

      <View style={{ marginTop: 30 }}>
        <Button title="Adicionar" onPress={handleAddTransaction} />
      </View>

    </ScrollView>
  );
}