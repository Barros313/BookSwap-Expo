import { useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Home, Profile, Publish, Chat, Settings } from './screens';

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Kavoon-Regular': require('./assets/fonts/Kavoon-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }



  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />

      <NavigationContainer>

        <Tab.Navigator>
          <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon:({color, size})=>(
              <Ionicons name='home' size={size} color={color}/>
            ),

          }}
          />

          <Tab.Screen
          name="Publish"
          component={Publish}
          options={
            {
            title: "Anunciar",
            tabBarIcon:({color, size})=>(
              <Ionicons name='add-circle-outline' size={size} color={color}/>
            ),
            headerStyle: styles.tabHeader,
            headerTitleStyle: styles.tabHeaderTitle
            }
          }
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
  }, tabHeader: {
    backgroundColor: '#3498DB',
  }, tabHeaderTitle: {
    fontFamily: 'Kavoon-Regular',
    color: '#000000'
  }
});
