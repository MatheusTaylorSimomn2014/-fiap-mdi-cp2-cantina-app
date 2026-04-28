import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';

export default function SobreCantina() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [darkMode, setDarkMode] = useState(params.dark === 'true');
  const [fila, setFila] = useState(5);
  const [tempos, setTempos] = useState([]);
  const [media, setMedia] = useState(0);
  const [variancia, setVariancia] = useState(0);
  const [estimativa, setEstimativa] = useState(0);

  const gerarTempoAtendimento = useCallback(() => {
    return Math.floor(Math.random() * 5) + 2;
  }, []);

  const calcularMedia = useCallback((lista) => {
    const soma = lista.reduce((acc, val) => acc + val, 0);
    return lista.length ? soma / lista.length : 0;
  }, []);

  const calcularVariancia = useCallback((lista, media) => {
    const soma = lista.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
    return lista.length ? soma / lista.length : 0;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFila(prevFila => {
        const novaFila = prevFila + (Math.random() > 0.5 ? 1 : -1);
        return Math.max(novaFila, 0);
      });

      setTempos(prevTempos => {
        const novoTempo = gerarTempoAtendimento();
        const novosTempos = [...prevTempos, novoTempo].slice(-10);
        
        const novaMedia = calcularMedia(novosTempos);
        const novaVariancia = calcularVariancia(novosTempos, novaMedia);
        
        setMedia(novaMedia.toFixed(2));
        setVariancia(novaVariancia.toFixed(2));
        
        return novosTempos;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [gerarTempoAtendimento, calcularMedia, calcularVariancia]);

  useEffect(() => {
    setEstimativa((media * fila).toFixed(1));
  }, [fila, media]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[
      styles.mainContainer,
      { backgroundColor: darkMode ? '#1a1a1a' : '#fff' }
    ]}>
      <View style={styles.container}>
        
        <Text style={[
          styles.titulo,
          { color: darkMode ? '#fff' : '#000' }
        ]}>
          Simulação da Cantina
        </Text>

        <View style={styles.cardGrande}>
          <Text style={styles.cardTitulo}>Fila atual</Text>
          <Text style={styles.numero}>{fila} pessoas</Text>
        </View>

        {fila === 0 && (
          <Text style={[
            styles.vazio,
            { color: darkMode ? '#ccc' : '#888' }
          ]}>
            Sem fila no momento 🎉
          </Text>
        )}

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTexto}>Média</Text>
            <Text style={styles.valor}>{media} min</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTexto}>Variância</Text>
            <Text style={styles.valor}>{variancia}</Text>
          </View>
        </View>

        <View style={styles.cardEstimativa}>
          <Text style={styles.cardTitulo}>Tempo estimado</Text>
          <Text style={styles.numero}>{estimativa} min</Text>
        </View>

        <TouchableOpacity 
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar para página inicial"
        >
          <Text style={[
            styles.voltar,
            { color: darkMode ? '#fff' : '#4169E1' }
          ]}>
            ← Voltar
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
    padding: 20
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
    fontSize: 26, 
    fontWeight: 'bold',
    marginBottom: 20
  },

  vazio: {
    marginBottom: 10
  },

  cardGrande: {
    backgroundColor: '#F23064',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center'
  },

  cardEstimativa: {
    backgroundColor: '#32CD32',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    width: '80%',
    alignItems: 'center'
  },

  numero: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold'
  },

  cardTitulo: {
    color: '#fff',
    fontSize: 16
  },

  cardsContainer: {
    flexDirection: 'row',
    gap: 15
  },

  card: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
  },

  cardTexto: {
    color: '#fff'
  },

  valor: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },

  voltar: { 
    fontSize: 16, 
    fontWeight: '600',
    marginTop: 20
  },
});