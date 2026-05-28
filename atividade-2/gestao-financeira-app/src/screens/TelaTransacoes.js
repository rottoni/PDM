import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { FiltroMesAno } from '../components/FiltroMesAno';
import {
  listarTransacoes,
  criarTransacao,
  atualizarTransacao,
  excluirTransacao,
} from '../api/transacoes.api';
import { listarCategorias } from '../api/categorias.api';

const hoje = new Date();

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR');
}

export function TelaTransacoes() {
  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [ano, setAno] = useState(hoje.getFullYear());

  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Modal de formulário (criar/editar)
  const [modalFormVisivel, setModalFormVisivel] = useState(false);
  const [editando, setEditando] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoriaId, setCategoriaId] = useState(null);

  // Modal de ações (toque longo)
  const [modalAcoesVisivel, setModalAcoesVisivel] = useState(false);
  const [selecionada, setSelecionada] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [t, c] = await Promise.all([
        listarTransacoes(mes, ano),
        listarCategorias(),
      ]);
      setTransacoes(t);
      setCategorias(c);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da API.');
    } finally {
      setCarregando(false);
    }
  }, [mes, ano]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function abrirNova() {
    setEditando(null);
    setDescricao('');
    setValor('');
    setData(new Date().toISOString().slice(0, 10));
    setCategoriaId(categorias[0]?.id ?? null);
    setModalFormVisivel(true);
  }

  function abrirEdicao(transacao) {
    setEditando(transacao);
    setDescricao(transacao.description);
    setValor(String(transacao.value));
    setData(new Date(transacao.date).toISOString().slice(0, 10));
    setCategoriaId(transacao.categoryId);
    setModalAcoesVisivel(false);
    setModalFormVisivel(true);
  }

  async function salvar() {
    const valorNumerico = Number(String(valor).replace(',', '.'));

    if (!descricao.trim() || isNaN(valorNumerico) || !data || !categoriaId) {
      Alert.alert('Atenção', 'Preencha todos os campos corretamente.');
      return;
    }

    const corpo = {
      description: descricao.trim(),
      value: valorNumerico,
      date: data,
      categoryId: categoriaId,
    };

    try {
      if (editando) {
        await atualizarTransacao(editando.id, corpo);
      } else {
        await criarTransacao(corpo);
      }
      setModalFormVisivel(false);
      carregar();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar a transação.');
    }
  }

  function confirmarExclusao(transacao) {
    setModalAcoesVisivel(false);
    Alert.alert('Excluir', 'Deseja excluir esta transação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirTransacao(transacao.id);
            carregar();
          } catch (erro) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  }

  function renderItem({ item }) {
    const ehReceita = item.category?.isIncome;
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => {
          setSelecionada(item);
          setModalAcoesVisivel(true);
        }}
      >
        <View
          style={[
            styles.iconeCat,
            { backgroundColor: item.category?.background || '#E9ECF5' },
          ]}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemDesc}>{item.description}</Text>
          <Text style={styles.itemSub}>
            {item.category?.displayName} · {formatarData(item.date)}
          </Text>
        </View>
        <Text
          style={[styles.itemValor, { color: ehReceita ? '#2A9D8F' : '#D62828' }]}
        >
          {ehReceita ? '+' : '-'} {formatarMoeda(item.value)}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FiltroMesAno mes={mes} ano={ano} aoMudarMes={setMes} aoMudarAno={setAno} />

      {carregando ? (
        <ActivityIndicator size="large" color="#3A86FF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={transacoes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhuma transação neste período.</Text>
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={abrirNova}>
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>

      {/* Modal de ações (toque longo) */}
      <Modal transparent visible={modalAcoesVisivel} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalAcoesVisivel(false)}
        >
          <View style={styles.acoesCartao}>
            <Text style={styles.acoesTitulo}>{selecionada?.description}</Text>
            <TouchableOpacity
              style={styles.acaoBotao}
              onPress={() => abrirEdicao(selecionada)}
            >
              <Text style={styles.acaoTexto}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acaoBotao}
              onPress={() => confirmarExclusao(selecionada)}
            >
              <Text style={[styles.acaoTexto, { color: '#D62828' }]}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de formulário */}
      <Modal transparent visible={modalFormVisivel} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.formCartao}>
            <ScrollView>
              <Text style={styles.formTitulo}>
                {editando ? 'Editar transação' : 'Nova transação'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
              />
              <TextInput
                style={styles.input}
                placeholder="Valor (ex.: 1500.00)"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
              />
              <TextInput
                style={styles.input}
                placeholder="Data (AAAA-MM-DD)"
                value={data}
                onChangeText={setData}
              />

              <Text style={styles.rotulo}>Categoria</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categorias.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={[
                      styles.chipCat,
                      categoriaId === c.id && styles.chipCatAtivo,
                    ]}
                    onPress={() => setCategoriaId(c.id)}
                  >
                    <Text
                      style={[
                        styles.chipCatTexto,
                        categoriaId === c.id && styles.chipCatTextoAtivo,
                      ]}
                    >
                      {c.displayName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.formBotoes}>
                <TouchableOpacity
                  style={[styles.botao, styles.botaoCancelar]}
                  onPress={() => setModalFormVisivel(false)}
                >
                  <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botao, styles.botaoSalvar]} onPress={salvar}>
                  <Text style={styles.botaoSalvarTexto}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  iconeCat: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemDesc: { fontSize: 15, fontWeight: '600', color: '#2D3142' },
  itemSub: { fontSize: 12, color: '#8D99AE', marginTop: 2 },
  itemValor: { fontSize: 15, fontWeight: 'bold' },
  vazio: { textAlign: 'center', color: '#8D99AE', marginTop: 40 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3A86FF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabTexto: { color: '#FFFFFF', fontSize: 30, lineHeight: 34 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  acoesCartao: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16 },
  acoesTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#2D3142' },
  acaoBotao: { paddingVertical: 12 },
  acaoTexto: { fontSize: 16, color: '#3A86FF', fontWeight: '600' },
  formCartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
  },
  formTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#2D3142' },
  input: {
    backgroundColor: '#F6F7FB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  rotulo: { fontSize: 12, color: '#8D99AE', marginBottom: 8 },
  chipCat: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#E9ECF5',
    marginRight: 8,
  },
  chipCatAtivo: { backgroundColor: '#3A86FF' },
  chipCatTexto: { color: '#5C6478', fontWeight: '600' },
  chipCatTextoAtivo: { color: '#FFFFFF' },
  formBotoes: { flexDirection: 'row', marginTop: 20 },
  botao: { flex: 1, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  botaoCancelar: { backgroundColor: '#E9ECF5', marginRight: 8 },
  botaoCancelarTexto: { color: '#5C6478', fontWeight: '600' },
  botaoSalvar: { backgroundColor: '#3A86FF', marginLeft: 8 },
  botaoSalvarTexto: { color: '#FFFFFF', fontWeight: '600' },
});