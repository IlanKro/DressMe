import React from "react";
import { Button, StyleSheet, Text, SafeAreaView } from "react-native";
import type { NavProps } from "./HomeScreen";

export default function Success({ navigation }: NavProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Success!</Text>
      <Button
        title="Back to home"
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
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
});
