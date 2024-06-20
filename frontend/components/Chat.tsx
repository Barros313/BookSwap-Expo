import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';

// Dados de exemplo para os contatos
const contactsData = [
  { id: 1, name: 'Clarice Lispector' },
  { id: 2, name: 'Maurício de Sousa' },
  { id: 3, name: 'Shakespeare' },
];

const ChatWindow: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: { contactId: number, message: string }[] }>({});
  const [inputMessage, setInputMessage] = useState('');

  // Função para mudar para a conversa de um contato específico
  const changeChat = (contactId: number | null) => {
    setSelectedContactId(contactId);
  };

  // Função para enviar uma mensagem
  const sendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }
    const newMessage = { contactId: selectedContactId!, message: inputMessage };
    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedContactId!]: [...(prevMessages[selectedContactId!] || []), newMessage]
    }));
    setInputMessage('');
  };

  // Componente para renderizar uma conversa particular
  const ConversationScreen: React.FC<{ contactName: string }> = ({ contactName }) => {
    const conversation = messages[selectedContactId!] || [];

    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
          <View style={{ padding: 20, flex: 1 }}>
            {conversation.map((msg, index) => (
              <View key={index} style={{ alignSelf: msg.contactId === selectedContactId ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                <View style={{ backgroundColor: msg.contactId === selectedContactId ? '#86C5EF' : '#FFFFFF', borderRadius: 8, padding: 10 }}>
                  <Text>{msg.message}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', padding: 10 }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10 }}
            placeholder="Digite uma mensagem..."
            multiline={true}
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <TouchableOpacity style={{ marginLeft: 10, padding: 10, backgroundColor: '#007BFF', borderRadius: 20 }} onPress={sendMessage}>
            <Text style={{ color: '#fff' }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Componente para renderizar a lista de contatos
  const ContactsList: React.FC = () => {
    return (
      <FlatList
        data={contactsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => changeChat(item.id)}>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#66ADDD' }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={ // Componente que aparece antes da lista de contatos
          <View style={{ backgroundColor: '#007BFF', paddingVertical: 30, alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold' }}>Mensagens</Text>
          </View>
        }
      />
    );
  };

  // Renderização condicional da tela de conversa ou da lista de contatos
  return (
    <View style={{ flex: 1 }}>
      {selectedContactId ? (
        <React.Fragment>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 40, padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <TouchableOpacity onPress={() => changeChat(null)}>
              <Text style={{ fontSize: 18, color: '#007BFF' }}>Voltar</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18 }}>{contactsData.find(c => c.id === selectedContactId)?.name}</Text>
            <View style={{ width: 80 }} />
          </View>
          <ConversationScreen contactName={contactsData.find(c => c.id === selectedContactId)?.name || ''} />
        </React.Fragment>
      ) : (
        <ContactsList />
      )}
    </View>
  );
};

export default ChatWindow;
