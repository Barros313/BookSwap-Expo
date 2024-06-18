import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert} from "react-native";
import Constants from "expo-constants";

const BookForm = () => {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const titlePlaceholder = 'Insira o título do livro';
  const authorPlaceholder = 'Insira o autor do livro';
  const genrePlaceholder = 'Insira o gênero literário do livro';
  const submitButtonPlaceholder = 'Anunciar';

  const handleSubmit = () => {
    const newBook = {
      title,
      author,
      genre
    };
    setBooks([...books, newBook]);
    Alert.alert('Book information', `Title: ${title}\nAuthor: ${author}\nGenre: ${genre}`);
    setTitle('');
    setAuthor('');
    setGenre('');
  }

  return (
      <View style={styles.container}>

        <Text style={styles.label}> Título: </Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder={titlePlaceholder}
        />

        <Text style={styles.label}> Gênero: </Text>
        <TextInput
         style={styles.input}
         value={genre}
         onChangeText={setGenre}
         placeholder={genrePlaceholder}
        />

        <Text style={styles.label}> Autor: </Text>
        <TextInput
          style={styles.input}
          value={author}
          onChangeText={setAuthor}
          placeholder={authorPlaceholder}
        />
        
        <Button title={submitButtonPlaceholder} onPress={handleSubmit} />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  booksList: {
    marginTop: 20,
  },
  bookItem: {
    marginBottom: 10,
  }
})

export default BookForm;