import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Success() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Success</Text>
      <StatusBar style="auto" />
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
});
