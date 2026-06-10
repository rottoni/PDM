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
  Switch,
} from 'react-native';

import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria,
} from '../api/categorias.api';

const CORES_SUGERIDAS = ['#FFB6B6', '#BBDEFB', '#C8E6C9', '#FFE0B2', '#E1BEE7', '#B2EBF2'];

export function TelaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [editando, setEditando] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState(CORES_SUGERIDAS[0]);
  const [ehReceita, setEhReceita] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const c = await listarCategorias();
      setCategorias(c);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar as categorias.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function abrirNova() {
    setEditando(null);
    setDisplayName('');
    setNome('');
    setCor(CORES_SUGERIDAS[0]);
    setEhReceita(false);
    setModalVisivel(true);
  }

  function abrirEdicao(categoria) {
    setEditando(categoria);
    setDisplayName(categoria.displayName);
    setNome(categoria.name);
    setCor(categoria.background);
    setEhReceita(categoria.isIncome);
    setModalVisivel(true);
  }

  async function salvar() {
    if (!displayName.trim()) {
      Alert.alert('Atenção', 'Informe o nome de exibição.');
      return;
    }

    try {
      if (editando) {
        await atualizarCategoria(editando.id, {
          displayName: displayName.trim(),
          background: cor,
          isIncome: ehReceita,
        });
      } else {
        const nomeInterno =
          nome.trim() ||
          displayName.trim().toLowerCase().replace(/\s+/g, '_');
        await criarCategoria({
          name: nomeInterno,
          displayName: displayName.trim(),
          icon: 'label',
          background: cor,
          isIncome: ehReceita,
        });
      }
      setModalVisivel(false);
      carregar();
    } catch (erro) {
      const msg = erro?.response?.data?.error || 'Não foi possível salvar.';
      Alert.alert('Erro', msg);
    }
  }

  function excluir(categoria) {
    if (categoria.isDefault) {
      Alert.alert('Atenção', 'Categorias padrão não podem ser excluídas.');
      return;
    }
    Alert.alert('Excluir', `Excluir a categoria "${categoria.displayName}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirCategoria(categoria.id);
            carregar();
          } catch (erro) {
            const msg = erro?.response?.data?.error || 'Não foi possível excluir.';
            Alert.alert('Erro', msg);
          }
        },
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <View style={[styles.cor, { backgroundColor: item.background }]} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemNome}>{item.displayName}</Text>
          <View style={styles.tags}>
            <Text style={[styles.tag, item.isIncome ? styles.tagReceita : styles.tagDespesa]}>
              {item.isIncome ? 'Receita' : 'Despesa'}
            </Text>
            {item.isDefault && <Text style={styles.tagPadrao}>Padrão</Text>}
          </View>
        </View>
        <TouchableOpacity onPress={() => abrirEdicao(item)} style={styles.acao}>
          <Text style={styles.acaoTexto}>Editar</Text>
        </TouchableOpacity>
        {!item.isDefault && (
          <TouchableOpacity onPress={() => excluir(item)} style={styles.acao}>
            <Text style={[styles.acaoTexto, { color: '#D62828' }]}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {carregando ? (
        <ActivityIndicator size="large" color="#3A86FF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={abrirNova}>
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisivel} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.formCartao}>
            <Text style={styles.formTitulo}>
              {editando ? 'Editar categoria' : 'Nova categoria'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome de exibição (ex.: Saúde)"
              value={displayName}
              onChangeText={setDisplayName}
            />
            {!editando && (
              <TextInput
                style={styles.input}
                placeholder="Identificador (opcional, ex.: health)"
                autoCapitalize="none"
                value={nome}
                onChangeText={setNome}
              />
            )}

            <Text style={styles.rotulo}>Cor</Text>
            <View style={styles.cores}>
              {CORES_SUGERIDAS.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCor(c)}
                  style={[
                    styles.bolinhaCor,
                    { backgroundColor: c },
                    cor === c && styles.bolinhaCorAtiva,
                  ]}
                />
              ))}
            </View>

            <View style={styles.linhaSwitch}>
              <Text style={styles.rotulo}>É receita?</Text>
              <Switch value={ehReceita} onValueChange={setEhReceita} />
            </View>

            <View style={styles.formBotoes}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoCancelar]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botao, styles.botaoSalvar]} onPress={salvar}>
                <Text style={styles.botaoSalvarTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
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
  cor: { width: 28, height: 28, borderRadius: 14, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 15, fontWeight: '600', color: '#2D3142' },
  tags: { flexDirection: 'row', marginTop: 4 },
  tag: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 6,
  },
  tagReceita: { backgroundColor: '#E6F7F4', color: '#2A9D8F' },
  tagDespesa: { backgroundColor: '#FDEAEA', color: '#D62828' },
  tagPadrao: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#E9ECF5',
    color: '#5C6478',
  },
  acao: { paddingHorizontal: 8 },
  acaoTexto: { color: '#3A86FF', fontWeight: '600', fontSize: 13 },
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
  formCartao: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  formTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#2D3142' },
  input: {
    backgroundColor: '#F6F7FB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  rotulo: { fontSize: 13, color: '#5C6478', marginBottom: 8 },
  cores: { flexDirection: 'row', marginBottom: 12 },
  bolinhaCor: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  bolinhaCorAtiva: { borderWidth: 3, borderColor: '#2D3142' },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  formBotoes: { flexDirection: 'row', marginTop: 16 },
  botao: { flex: 1, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  botaoCancelar: { backgroundColor: '#E9ECF5', marginRight: 8 },
  botaoCancelarTexto: { color: '#5C6478', fontWeight: '600' },
  botaoSalvar: { backgroundColor: '#3A86FF', marginLeft: 8 },
  botaoSalvarTexto: { color: '#FFFFFF', fontWeight: '600' },
});