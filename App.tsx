

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { PaperProvider } from 'react-native-paper';
import Chat from './screen/chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/login';
import HomeScreen from './screen/home';
import RegisterScreen from './screen/register';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#3498db',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: '#f8f9fa',
              },
          }}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
            title: 'Register',
            headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              title: 'Chat',
            }}
          />
        </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
