import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';

export default function StatusFila() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [darkMode, setDarkMode] = useState(params.dark === 'true');
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const adicionarDado = useCallback(() => {
    const novaFila = Math.floor(Math.random() * 15);
    const horario = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    setDados((prev) => {
      const novo = [...prev, { fila: novaFila, hora: horario }];
      return novo.slice(-10);
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    adicionarDado();
    const interval = setInterval(adicionarDado, 2000);
    return () => clearInterval(interval);
  }, [adicionarDado]);

  const obterCorBarra = (fila) => {
    if (fila < 5) return '#32CD32';
    if (fila < 10) return '#FFD700';
    return '#FF4500';
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
        
        <Text style={[
          styles.titulo,
          { color: darkMode ? '#fff' : '#000' }
        ]}>
          Gráfico da Fila da Cantina
        </Text>

        {loading && (
          <Text style={[
            styles.loading,
            { color: darkMode ? '#aaa' : '#999' }
          ]}>
            Carregando dados...
          </Text>
        )}

        {!loading && dados.length === 0 && (
          <Text style={[
            styles.vazio,
            { color: darkMode ? '#aaa' : '#999' }
          ]}>
            Sem dados ainda 📭
          </Text>
        )}

        {!loading && dados.length > 0 && (
          <View style={styles.graficoContainer}>
            
            <View style={styles.grafico}>
              {dados.map((item, index) => (
                <View key={index} style={styles.coluna}>
                  
                  <Text style={[
                    styles.valorTopo,
                    { color: darkMode ? '#fff' : '#000' }
                  ]}>
                    {item.fila}
                  </Text>

                  <View 
                    style={[
                      styles.barra,
                      { 
                        height: Math.max(item.fila * 10, 4),
                        backgroundColor: obterCorBarra(item.fila)
                      }
                    ]}
                  />
                  
                  <Text style={[
                    styles.label,
                    { color: darkMode ? '#ccc' : '#666' }
                  ]}>
                    {item.hora}
                  </Text>

                </View>
              ))}
            </View>

            <Text style={[
              styles.legenda,
              { color: darkMode ? '#fff' : '#000' }
            ]}>
              Pessoas na fila ao longo do tempo
            </Text>

          </View>
        )}

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

  loading: {
    color: '#999'
  },

  vazio: {
    color: '#999'
  },

  graficoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },

  grafico: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 220,
    gap: 5
  },

  coluna: {
    alignItems: 'center'
  },

  valorTopo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4
  },

  barra: {
    width: 20,
    borderRadius: 5,
    minHeight: 4,
  },

  label: {
    fontSize: 10,
    marginTop: 5
  },

  legenda: {
    marginTop: 10,
    fontSize: 16,
  },

  voltar: { 
    fontSize: 16, 
    fontWeight: '600'
  },
});