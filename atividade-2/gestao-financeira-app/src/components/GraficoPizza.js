import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// data: [{ label, value, color }]
export function GraficoPizza({ data = [], tamanho = 200 }) {
  const total = data.reduce((soma, item) => soma + item.value, 0);

  if (!data.length || total <= 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTexto}>
          Sem despesas no período selecionado.
        </Text>
      </View>
    );
  }

  const raio = tamanho / 2;
  const centro = raio;
  let anguloInicial = 0;

  // Converte ângulo (graus) em coordenada cartesiana na circunferência.
  const ponto = (angulo) => {
    const rad = ((angulo - 90) * Math.PI) / 180;
    return {
      x: centro + raio * Math.cos(rad),
      y: centro + raio * Math.sin(rad),
    };
  };

  const fatias = data.map((item, indice) => {
    const proporcao = item.value / total;
    const anguloFinal = anguloInicial + proporcao * 360;

    const inicio = ponto(anguloInicial);
    const fim = ponto(anguloFinal);
    const largeArc = proporcao > 0.5 ? 1 : 0;

    const d = [
      `M ${centro} ${centro}`,
      `L ${inicio.x} ${inicio.y}`,
      `A ${raio} ${raio} 0 ${largeArc} 1 ${fim.x} ${fim.y}`,
      'Z',
    ].join(' ');

    anguloInicial = anguloFinal;
    return <Path key={indice} d={d} fill={item.color} />;
  });

  return (
    <View style={styles.container}>
      <Svg width={tamanho} height={tamanho}>
        {/* Caso especial: uma única categoria ocupa o círculo inteiro */}
        {data.length === 1 ? (
          <Circle cx={centro} cy={centro} r={raio} fill={data[0].color} />
        ) : (
          fatias
        )}
      </Svg>

      <View style={styles.legenda}>
        {data.map((item, indice) => {
          const percentual = ((item.value / total) * 100).toFixed(1);
          return (
            <View key={indice} style={styles.legendaItem}>
              <View style={[styles.bolinha, { backgroundColor: item.color }]} />
              <Text style={styles.legendaTexto}>
                {item.label} — {percentual}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 12 },
  legenda: { marginTop: 16, width: '100%' },
  legendaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  bolinha: { width: 14, height: 14, borderRadius: 7, marginRight: 8 },
  legendaTexto: { fontSize: 14, color: '#333' },
  vazio: { padding: 24, alignItems: 'center' },
  vazioTexto: { color: '#888', fontSize: 14, textAlign: 'center' },
});