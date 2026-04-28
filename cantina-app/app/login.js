import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [darkMode, setDarkMode] = useState(params.dark === 'true');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};

    if (modoCadastro && !nome.trim()) {
      novosErros.nome = 'Nome obrigatório';
    }

    if (!email.includes('@')) {
      novosErros.email = 'E-mail inválido';
    }

    if (senha.length < 4) {
      novosErros.senha = 'Senha deve ter mínimo 4 caracteres';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;

    router.replace({
      pathname: '/',
      params: {
        nome: modoCadastro ? nome : 'Usuário',
        dark: darkMode.toString(),
      },
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[
      styles.mainContainer,
      { backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5' }
    ]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={[
          styles.titulo,
          { color: darkMode ? '#fff' : '#000' }
        ]}>
          {modoCadastro ? 'Cadastro' : 'Login'}
        </Text>

        {modoCadastro && (
          <>
            <TextInput
              placeholder="Nome"
              placeholderTextColor={darkMode ? '#aaa' : '#666'}
              value={nome}
              onChangeText={setNome}
              style={[
                styles.input,
                {
                  backgroundColor: darkMode ? '#444' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                  borderColor: erros.nome ? 'red' : '#ddd'
                }
              ]}
              accessibilityLabel="Campo de nome"
            />
            {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
          </>
        )}

        <TextInput
          placeholder="E-mail"
          placeholderTextColor={darkMode ? '#aaa' : '#666'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[
            styles.input,
            {
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#000',
              borderColor: erros.email ? 'red' : '#ddd'
            }
          ]}
          accessibilityLabel="Campo de e-mail"
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        <View style={[
          styles.senhaContainer,
          { 
            backgroundColor: darkMode ? '#444' : '#fff',
            borderColor: erros.senha ? 'red' : '#ddd'
          }
        ]}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor={darkMode ? '#aaa' : '#666'}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            style={[
              styles.input,
              {
                flex: 1,
                marginBottom: 0,
                backgroundColor: 'transparent',
                color: darkMode ? '#fff' : '#000',
              }
            ]}
            accessibilityLabel="Campo de senha"
          />
          <Text
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            style={styles.olho}
            accessibilityRole="button"
            accessibilityLabel={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
          >
            {senhaVisivel ? '🙈' : '👁️'}
          </Text>
        </View>
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        <TouchableOpacity 
          style={styles.botao} 
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel={modoCadastro ? "Botão cadastrar" : "Botão entrar"}
        >
          <Text style={styles.botaoTexto}>
            {modoCadastro ? 'Cadastrar' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            setModoCadastro(!modoCadastro);
            setErros({});
          }}
          accessibilityRole="button"
          accessibilityLabel={modoCadastro ? "Ir para login" : "Ir para cadastro"}
        >
          <Text style={[
            styles.switch,
            { color: darkMode ? '#87CEFA' : '#1E90FF' }
          ]}>
            {modoCadastro
              ? 'Já tem conta? Entrar'
              : 'Não tem conta? Cadastrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar para página anterior"
        >
          <Text style={{ 
            color: darkMode ? '#fff' : '#4169E1', 
            textAlign: 'center', 
            marginTop: 20 
          }}>
            ← Voltar
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Botão de Dark Mode */}
      <TouchableOpacity
        style={[
          styles.darkModeBtn,
          { backgroundColor: darkMode ? '#FFD700' : '#2c2c2c' }
        ]}
        onPress={toggleDarkMode}
        accessibilityRole="button"
        accessibilityLabel={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        <Text style={styles.darkModeIcon}>
          {darkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  darkModeBtn: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },

  darkModeIcon: {
    fontSize: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    fontSize: 16,
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
  },
  olho: { 
    padding: 14, 
    fontSize: 18 
  },
  erro: { 
    color: 'red', 
    marginBottom: 8,
    marginLeft: 4,
  },
  botao: {
    backgroundColor: '#32CD32',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  switch: { 
    textAlign: 'center', 
    marginTop: 10,
    fontSize: 14,
  },
});