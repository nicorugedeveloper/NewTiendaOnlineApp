import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}