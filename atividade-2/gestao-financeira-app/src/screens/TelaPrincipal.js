import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { TelaTransacoes } from './TelaTransacoes';
import { TelaResumo } from './TelaResumo';
import { TelaCategorias } from './TelaCategorias';

const ABAS = [
  { chave: 'transacoes', label: 'Transações' },
  { chave: 'resumo', label: 'Resumo' },
  { chave: 'categorias', label: 'Categorias' },
];

export function TelaPrincipal({ usuario, aoSair }) {
  const [abaAtiva, setAbaAtiva] = useState('transacoes');

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com mensagem de boas-vindas */}
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.saudacao}>Bem-vindo(a),</Text>
          <Text style={styles.nome}>{usuario.nome}</Text>
        </View>
        <TouchableOpacity onPress={aoSair} style={styles.sair}>
          <Text style={styles.sairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Abas internas */}
      <View style={styles.abas}>
        {ABAS.map((aba) => (
          <TouchableOpacity
            key={aba.chave}
            style={[styles.aba, abaAtiva === aba.chave && styles.abaAtiva]}
            onPress={() => setAbaAtiva(aba.chave)}
          >
            <Text
              style={[
                styles.abaTexto,
                abaAtiva === aba.chave && styles.abaTextoAtivo,
              ]}
            >
              {aba.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conteúdo da aba */}
      <View style={styles.conteudo}>
        {abaAtiva === 'transacoes' && <TelaTransacoes />}
        {abaAtiva === 'resumo' && <TelaResumo />}
        {abaAtiva === 'categorias' && <TelaCategorias />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB' },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  saudacao: { fontSize: 14, color: '#8D99AE' },
  nome: { fontSize: 20, fontWeight: 'bold', color: '#2D3142' },
  sair: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFE5E5',
  },
  sairTexto: { color: '#D62828', fontWeight: '600' },
  abas: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#E9ECF5',
    borderRadius: 12,
    padding: 4,
  },
  aba: { flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: 'center' },
  abaAtiva: { backgroundColor: '#FFFFFF' },
  abaTexto: { color: '#8D99AE', fontWeight: '600' },
  abaTextoAtivo: { color: '#3A86FF' },
  conteudo: { flex: 1, marginTop: 8 },
});