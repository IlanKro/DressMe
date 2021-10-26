import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dress Me</Text>
      <StatusBar style="auto" />
      <View style={styles.buttons}>
        <Button title="Shoes" onPress={() => navigation.navigate("Shoes")} />
        <Button title="Pants" onPress={() => navigation.navigate("Pants")} />
        <Button title="Shirts" onPress={() => navigation.navigate("Shirts")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
  },
});
