/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import StackNavigator from './src/Navigator/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';



function App() {
  
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#000'}
      />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}



export default App;
