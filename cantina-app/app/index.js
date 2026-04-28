import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fila, setFila] = useState(0);
  const [status, setStatus] = useState('Carregando...');
  const [nome, setNome] = useState('');
  const [logado, setLogado] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Usar ref para controlar se já fez login inicial
  const loginInicialFeito = useRef(false);

  useEffect(() => {
    // Evitar loop: só executa quando params.nome existe e não fez login ainda
    if (params.nome && !loginInicialFeito.current) {
      setNome(params.nome);
      setLogado(true);
      loginInicialFeito.current = true;
    }
  }, [params.nome]);

  useEffect(() => {
    const interval = setInterval(() => {
      const pessoas = Math.floor(Math.random() * 15);
      setFila(pessoas);

      if (pessoas < 5) setStatus('🟢 Tranquilo');
      else if (pessoas < 10) setStatus('🟡 Moderado');
      else setStatus('🔴 Cheio');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    setNome('');
    setLogado(false);
    loginInicialFeito.current = false;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[
      styles.mainContainer,
      { backgroundColor: darkMode ? '#1a1a1a' : '#fff' }
    ]}>
      <View style={styles.container}>
        
        {logado ? (
          <TouchableOpacity style={styles.loginBtn} onPress={logout}>
            <Text style={styles.loginTexto}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push({
              pathname: '/login',
              params: { dark: darkMode.toString() }
            })}
          >
            <Text style={styles.loginTexto}>Login</Text>
          </TouchableOpacity>
        )}

        {logado && (
          <Text style={[
            styles.saudacao,
            { color: darkMode ? '#fff' : '#000' }
          ]}>
            Olá, {nome} 👋
          </Text>
        )}

        <Text style={[
          styles.titulo,
          { color: darkMode ? '#fff' : '#000' }
        ]}>
          Cantina Inteligente FIAP
        </Text>

        <Text style={[
          styles.subtitulo,
          { color: darkMode ? '#ccc' : '#000' }
        ]}>
          Monitoramento de Fila em Tempo Real
        </Text>

        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' }}
          style={styles.imagem}
          accessibilityLabel="Ícone da cantina"
        />

        <View style={styles.cardPrincipal}>
          <Text style={styles.cardTitulo}>Fila atual</Text>
          <Text style={styles.numero}>{fila} pessoas</Text>
          <Text style={styles.status}>{status}</Text>
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push({
            pathname: '/sobre',
            params: { dark: darkMode.toString() }
          })}
          accessibilityRole="button"
          accessibilityLabel="Ver análise completa da fila"
        >
          <Text style={styles.botaoTexto}>
            Ver análise completa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => router.push({
            pathname: '/status',
            params: { dark: darkMode.toString() }
          })}
          accessibilityRole="button"
          accessibilityLabel="Ver histórico da fila"
        >
          <Text style={styles.botaoTexto}>
            Ver histórico da fila
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => router.push({
            pathname: '/menu',
            params: { dark: darkMode.toString() }
          })}
          accessibilityRole="button"
          accessibilityLabel="Ver cardápio da cantina"
        >
          <Text style={styles.botaoTexto}>
            Ver cardápio da cantina
          </Text>
        </TouchableOpacity>
      </View>

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
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20,
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

  loginBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8
  },

  loginTexto: { 
    color: '#fff',
    fontWeight: '600'
  },

  saudacao: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontWeight: 'bold'
  },

  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold'
  },

  subtitulo: { 
    marginBottom: 10,
    textAlign: 'center'
  },

  imagem: { 
    width: 80, 
    height: 80, 
    marginBottom: 20 
  },

  cardPrincipal: {
    backgroundColor: '#F23064',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '85%',
    alignItems: 'center'
  },

  cardTitulo: {
    color: '#fff'
  },

  numero: { 
    fontSize: 32, 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  status: { 
    color: '#fff' 
  },

  botao: { 
    backgroundColor: '#32CD32', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10,
    width: '85%',
    alignItems: 'center'
  },

  botaoSecundario: { 
    backgroundColor: '#1E90FF', 
    padding: 15, 
    borderRadius: 10,
    marginBottom: 10,
    width: '85%',
    alignItems: 'center'
  },

  botaoMenu: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center'
  },

  botaoTexto: { 
    color: '#fff',
    fontWeight: '600'
  }
});