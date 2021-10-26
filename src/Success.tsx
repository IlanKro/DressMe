import React from "react";
import { Button, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import type { HomeProps } from "./HomeScreen";

export default function Success({ navigation }: HomeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          width: 200,
          height: 200,
          uri: "https://picsum.photos/200",
        }}
      />
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
