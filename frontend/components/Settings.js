import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { Text, Header, ListItem, Icon } from 'react-native-elements';

const SettingsScreen: React.FC = () => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  useEffect(() => {
    setIsDarkMode(systemTheme === 'dark');
  }, [systemTheme]);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Configurações', style: styles.headerTitle }}
        containerStyle={styles.header}
      />
      <ScrollView>
        <TouchableOpacity>
          <ListItem bottomDivider containerStyle={styles.listItem}>
            <Icon name="person" color={styles.icon.color} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Editar Perfil</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <Icon name="brightness-6" color={styles.icon.color} />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Tema Escuro</ListItem.Title>
          </ListItem.Content>
          <Switch
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </ListItem>
        <TouchableOpacity>
          <ListItem bottomDivider containerStyle={styles.listItem}>
            <Icon name="accessibility" color={styles.icon.color} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Acessibilidade</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
        <TouchableOpacity>
          <ListItem bottomDivider containerStyle={styles.listItem}>
            <Icon name="exit-to-app" color={styles.icon.color} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Sair da Conta</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
        <TouchableOpacity>
          <ListItem bottomDivider containerStyle={styles.listItem}>
            <Icon name="delete" color={styles.icon.color} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Deletar Conta</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
  },
  header: {
    backgroundColor: isDarkMode ? '#1F1F1F' : '#3D6DCC',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  icon: {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
});

export default SettingsScreen;
