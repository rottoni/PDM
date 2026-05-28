import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MESES, gerarAnos } from '../utils/meses';

const ANOS = gerarAnos(5);

export function FiltroMesAno({ mes, ano, aoMudarMes, aoMudarAno }) {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Mês</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {MESES.map((m) => (
          <TouchableOpacity
            key={m.value}
            style={[styles.chip, mes === m.value && styles.chipAtivo]}
            onPress={() => aoMudarMes(m.value)}
          >
            <Text style={[styles.chipTexto, mes === m.value && styles.chipTextoAtivo]}>
              {m.label.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.rotulo}>Ano</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ANOS.map((a) => (
          <TouchableOpacity
            key={a}
            style={[styles.chip, ano === a && styles.chipAtivo]}
            onPress={() => aoMudarAno(a)}
          >
            <Text style={[styles.chipTexto, ano === a && styles.chipTextoAtivo]}>
              {a}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 8 },
  rotulo: { fontSize: 12, color: '#8D99AE', marginTop: 8, marginBottom: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#E9ECF5',
    marginRight: 8,
  },
  chipAtivo: { backgroundColor: '#3A86FF' },
  chipTexto: { color: '#5C6478', fontWeight: '600', fontSize: 13 },
  chipTextoAtivo: { color: '#FFFFFF' },
});