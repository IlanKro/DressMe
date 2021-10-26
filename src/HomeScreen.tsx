import React, { useState } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import * as Progress from "react-native-progress";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export type NavProps = {
  navigation: ProfileScreenNavigationProp;
};

export default function HomeScreen({ navigation }: NavProps) {
  const [progress, setProgress] = useState<number>(3);
  const [completedSets, setcompletedSets] = useState<number>(0); //get from local later.
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Dress Me</Text>
      <Text style={styles.sets}>Sets completed: {completedSets}</Text>
      <View style={styles.buttons}>
        <Button title="Shirts" onPress={() => navigation.navigate("Shirts")} />
        <Button title="Pants" onPress={() => navigation.navigate("Pants")} />
        <Button title="Shoes" onPress={() => navigation.navigate("Shoes")} />
        <Progress.Bar
          style={styles.progress_bar}
          progress={progress / 3}
          width={200}
        />
      </View>
      {progress === 3 && (
        <SafeAreaView style={styles.done_button}>
          <Button
            title="Done!"
            onPress={() => navigation.navigate("Success")}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  sets: {
    fontSize: 14,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  buttons: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  progress_bar: {
    borderColor: "black",
    marginTop: 10,
  },
  done_button: {
    marginBottom: 20,
    marginTop: 50,
  },
});
