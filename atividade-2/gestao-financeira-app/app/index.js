// gestao-financeira-app/app/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TelaPrincipal } from '../src/screens/TelaPrincipal';

// Usuário de teste (conforme documentação).
const USUARIO_VALIDO = {
  email: 'aluno@pdm.com',
  senha: '123456',
  nome: 'Aluno PDM',
};

function TelaLogin({ aoEntrar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function entrar() {
    setErro('');
    const emailNormalizado = email.trim().toLowerCase();
    if (
      emailNormalizado === USUARIO_VALIDO.email &&
      senha === USUARIO_VALIDO.senha
    ) {
      aoEntrar({ nome: USUARIO_VALIDO.nome, email: USUARIO_VALIDO.email });
    } else {
      setErro('E-mail ou senha inválidos.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Gestão Financeira</Text>
        <Text style={styles.subtitulo}>Acesse sua conta</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <TouchableOpacity style={styles.botao} onPress={entrar}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.dica}>Teste: aluno@pdm.com / 123456</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

// ✅ Este é o componente raiz — sem props externas.
// Ele gerencia qual tela exibir e passa as callbacks necessárias.
export default function App() {
  const [usuario, setUsuario] = useState(null);

  if (usuario) {
    return (
      <TelaPrincipal
        usuario={usuario}
        aoSair={() => setUsuario(null)}
      />
    );
  }

  return <TelaLogin aoEntrar={setUsuario} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    justifyContent: 'center',
    padding: 24,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3142',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#8D99AE',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F6F7FB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  erro: { color: '#D62828', marginBottom: 8, textAlign: 'center' },
  botao: {
    backgroundColor: '#3A86FF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoTexto: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  dica: {
    textAlign: 'center',
    color: '#8D99AE',
    fontSize: 12,
    marginTop: 16,
  },
});