import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './component/Home';
import Profile from './component/Profile';
import Publish from './component/Publish';
import Chat from './component/Chat';
import Settings from './component/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer>

        <Tab.Navigator screenOptions={{
          headerShown: false
        }}>
          <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon:({color, size})=>(
              <Ionicons name='home' size={size} color={color}/>
            )
          }}
          />

          <Tab.Screen
          name="Publish"
          component={Publish}
          options={{
            tabBarIcon:({color, size})=>(
              <Ionicons name='add-circle-outline' size={size} color={color}/>
            )
          }}
          />

          <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon:({color, size})=>(
              <Ionicons name='chatbox-outline' size={size} color={color}/>
            )
          }}
          />

          <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon:({color, size})=>(
              <Ionicons name='person-circle-outline' size={size} color={color}/>
            )
          }}
          />

          <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon:({color, size})=>(
              <Ionicons name='settings-outline' size={size} color={color}/>
            )
          }}
          />

        </Tab.Navigator>

      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
