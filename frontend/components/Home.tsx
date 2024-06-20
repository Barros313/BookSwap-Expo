import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const dataRecommended = [
  { id: '1', title: 'Troco 5 livros', distance: '3.7 Km', rating: '8.5', image: 'link_da_imagem' },
  { id: '2', title: 'Troco livros e mais', distance: '7.5 Km', rating: '7.5', image: 'link_da_imagem' },
  { id: '3', title: 'Troco livros', distance: '10.3 Km', rating: '', image: 'link_da_imagem' },
];

const dataNearby = [
  { id: '1', title: 'O que me faz pular', distance: '2.5 Km', rating: '8.7', image: 'link_da_imagem' },
  { id: '2', title: 'Nado Livre', distance: '7.5 Km', rating: '', image: 'link_da_imagem' },
  { id: '3', title: 'Diversos', distance: '9.7 Km', rating: '8.9', image: 'link_da_imagem' },
];

const dataTopRated = [
  { id: '1', title: 'Coleção 15 livros', distance: '3.9 Km', rating: '9.5', image: 'link_da_imagem' },
  { id: '2', title: 'Livros para trocar', distance: '3.9 Km', rating: '9.6', image: 'link_da_imagem' },
  { id: '3', title: 'Linguagens', distance: '10 Km', rating: '10', image: 'link_da_imagem' },
];

const HomeScreen = () => {
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookDistance}>{item.distance}</Text>
      <Text style={styles.bookRating}>{item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar título" placeholderTextColor="#888" />
      </View>
      <Text style={styles.sectionTitle}>Recomendados</Text>
      <FlatList
        horizontal
        data={dataRecommended}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Perto de você</Text>
      <FlatList
        horizontal
        data={dataNearby}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Melhores avaliados</Text>
      <FlatList
        horizontal
        data={dataTopRated}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Anunciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bookItem: {
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: '#ccc',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  bookDistance: {
    fontSize: 12,
    color: '#666',
  },
  bookRating: {
    fontSize: 12,
    color: '#f39c12',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default HomeScreen;
