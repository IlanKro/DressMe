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
          uri: "https://source.unsplash.com/1600x900/?success",
        }}
      />
      <Text style={styles.header}>Success!</Text>
      <Text style={styles.timer}>Took you: Seconds</Text>
      <Button
        title="Choose another set"
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  timer: {
    fontSize: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
});
