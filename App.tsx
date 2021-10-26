import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/HomeScreen";
import Shoes from "./src/Shoes";
import Pants from "./src/Pants";
import Shirts from "./src/Shirts";
import Success from "./src/Success";

export type RootStackParamList = {
  Home: undefined;
  Shoes: undefined;
  Pants: undefined;
  Shirts: undefined;
  Success: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Shoes" component={Shoes} />
        <Stack.Screen name="Pants" component={Pants} />
        <Stack.Screen name="Shirts" component={Shirts} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
