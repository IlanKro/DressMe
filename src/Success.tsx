import React from "react";
import { Button, StyleSheet, Text, SafeAreaView, Image } from "react-native";
//import type { HomeProps } from "./HomeScreen";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SuccessProps = NativeStackScreenProps<RootStackParamList, "Home">;
export default function Success({ route, navigation }: SuccessProps) {
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
