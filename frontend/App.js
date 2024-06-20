import {useCallback, useEffect, useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Home, Profile, Publish, Chat, Settings } from './components';
import Login from './components/authentication/Login';
import Register from "./components/authentication/Register";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Kavoon-Regular': require('./assets/fonts/Kavoon-Regular.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
    }, 1000)
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />

      <NavigationContainer>

        { isAuthenticated ? (
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
        ) : (
            <Stack.Navigator initialRouteName="Login" >
              <Stack.Screen
                  name="Login"
                  component={Login}
                  initialParams={{ onLoginSuccess: () => setIsAuthenticated(true) }}
              />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        ) }


      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  tabHeader: {
    backgroundColor: '#3498DB',
  },
  tabHeaderTitle: {
    fontFamily: 'Kavoon-Regular',
    color: '#000000'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
