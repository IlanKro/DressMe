import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Shirts() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shirts</Text>
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