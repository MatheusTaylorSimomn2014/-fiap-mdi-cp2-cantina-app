import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function MenuCantina() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [darkMode, setDarkMode] = useState(params.dark === 'true');

  const [itens, setItens] = useState([
    {
      id: 1,
      nome: 'Salgados',
      imagem: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
      favorito: false,
    },
    {
      id: 2,
      nome: 'Pizza',
      imagem: 'https://cdn-icons-png.flaticon.com/512/3595/3595458.png',
      favorito: false,
    },
    {
      id: 3,
      nome: 'Refrigerantes',
      imagem: 'https://cdn-icons-png.flaticon.com/512/2405/2405479.png',
      favorito: false,
    },
    {
      id: 4,
      nome: 'Café',
      imagem: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
      favorito: false,
    },
    {
      id: 5,
      nome: 'Salgados',
      imagem: 'https://cdn-icons-png.flaticon.com/512/2718/2718224.png',
      favorito: false,
    },
    {
      id: 6,
      nome: 'Sucos',
      imagem: 'https://cdn-icons-png.flaticon.com/512/590/590685.png',
      favorito: false,
    },
  ]);

  const toggleFavorito = (id) => {
    const novosItens = itens.map((item) =>
      item.id === id ? { ...item, favorito: !item.favorito } : item
    );
    setItens(novosItens);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: darkMode ? '#2c2c2c' : '#fff' }
        ]}
      >
        <Text style={[
          styles.titulo,
          { color: darkMode ? '#fff' : '#000' }
        ]}>
          Cardápio da Cantina 🍽️
        </Text>

        <View style={styles.grid}>
          {itens.map((item) => (
            <View
              key={item.id}
              style={[
                styles.card,
                { backgroundColor: darkMode ? '#444' : '#fff' }
              ]}
            >
              <TouchableOpacity
                style={styles.estrela}
                onPress={() => toggleFavorito(item.id)}
                accessibilityRole="button"
                accessibilityLabel={item.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Text style={styles.estrelaTexto}>
                  {item.favorito ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>

              <Image 
                source={{ uri: item.imagem }} 
                style={styles.imagem}
                accessibilityLabel={`Imagem de ${item.nome}`}
              />

              <Text style={[
                styles.nome,
                { color: darkMode ? '#fff' : '#000' }
              ]}>
                {item.nome}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar para página anterior"
        >
          <Text style={[
            styles.voltar,
            { color: darkMode ? '#fff' : '#4169E1' }
          ]}>
            ← Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
    flexGrow: 1,
    alignItems: 'center',
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

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  card: {
    width: 140,
    height: 180,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 15,
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  estrela: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },

  estrelaTexto: {
    fontSize: 24,
  },

  imagem: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  voltar: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 30,
  },
});