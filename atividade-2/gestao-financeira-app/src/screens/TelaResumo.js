import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { FiltroMesAno } from '../components/FiltroMesAno';
import { GraficoPizza } from '../components/GraficoPizza';
import { listarTransacoes } from '../api/transacoes.api';

const hoje = new Date();

// Paleta de cores para as fatias do gráfico.
const CORES = ['#3A86FF', '#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#06D6A0', '#EF476F'];

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function TelaResumo() {
  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [ano, setAno] = useState(hoje.getFullYear());
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const t = await listarTransacoes(mes, ano);
      setTransacoes(t);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo.');
    } finally {
      setCarregando(false);
    }
  }, [mes, ano]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const receitas = transacoes
    .filter((t) => t.category?.isIncome)
    .reduce((soma, t) => soma + t.value, 0);

  const despesas = transacoes
    .filter((t) => !t.category?.isIncome)
    .reduce((soma, t) => soma + t.value, 0);

  const saldo = receitas - despesas;

  // Agrupa despesas por categoria para o gráfico.
  const agrupado = {};
  transacoes
    .filter((t) => !t.category?.isIncome)
    .forEach((t) => {
      const nome = t.category?.displayName || 'Outros';
      agrupado[nome] = (agrupado[nome] || 0) + t.value;
    });

  const dadosGrafico = Object.keys(agrupado).map((nome, indice) => ({
    label: nome,
    value: agrupado[nome],
    color: CORES[indice % CORES.length],
  }));

  return (
    <ScrollView style={styles.container}>
      <FiltroMesAno mes={mes} ano={ano} aoMudarMes={setMes} aoMudarAno={setAno} />

      {carregando ? (
        <ActivityIndicator size="large" color="#3A86FF" style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.conteudo}>
          <View style={styles.cards}>
            <View style={[styles.card, { backgroundColor: '#E6F7F4' }]}>
              <Text style={styles.cardRotulo}>Receitas</Text>
              <Text style={[styles.cardValor, { color: '#2A9D8F' }]}>
                {formatarMoeda(receitas)}
              </Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#FDEAEA' }]}>
              <Text style={styles.cardRotulo}>Despesas</Text>
              <Text style={[styles.cardValor, { color: '#D62828' }]}>
                {formatarMoeda(despesas)}
              </Text>
            </View>
          </View>

          <View style={[styles.cardSaldo, { backgroundColor: saldo >= 0 ? '#EAF1FF' : '#FDEAEA' }]}>
            <Text style={styles.cardRotulo}>Saldo do período</Text>
            <Text style={[styles.saldoValor, { color: saldo >= 0 ? '#3A86FF' : '#D62828' }]}>
              {formatarMoeda(saldo)}
            </Text>
          </View>

          <Text style={styles.tituloGrafico}>Despesas por categoria</Text>
          <GraficoPizza data={dadosGrafico} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { padding: 16 },
  cards: { flexDirection: 'row' },
  card: { flex: 1, borderRadius: 14, padding: 16, marginHorizontal: 4 },
  cardRotulo: { fontSize: 13, color: '#5C6478' },
  cardValor: { fontSize: 18, fontWeight: 'bold', marginTop: 6 },
  cardSaldo: { borderRadius: 14, padding: 18, marginTop: 12, marginHorizontal: 4 },
  saldoValor: { fontSize: 24, fontWeight: 'bold', marginTop: 6 },
  tituloGrafico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3142',
    marginTop: 24,
    marginLeft: 4,
  },
});