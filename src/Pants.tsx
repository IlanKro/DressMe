import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

export default function Pants() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pants</Text>
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
