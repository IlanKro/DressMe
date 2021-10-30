import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppDrawer } from "./src/Drawer";

export type ClothingItem = {
  id: number;
  type: string;
  name: string;
  colors: string[];
  sizes: number[];
  brand: string;
};

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}
