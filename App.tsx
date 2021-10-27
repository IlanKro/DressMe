import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/HomeScreen";
import ClothingItem from "./src/ClothingItem";
import Success from "./src/Success";

export type ClothingItem = {
  id: number;
  type: string;
  name: string;
  colors: string[];
  sizes: number[];
  brand: string;
};

export type RootStackParamList = {
  Home: { set: ClothingItem[] } | undefined;
  Success: { set: ClothingItem[] };
  ClothingItem: { type: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ClothingItem" component={ClothingItem} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
