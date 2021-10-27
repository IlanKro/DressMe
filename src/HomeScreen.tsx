import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, ClothingItem } from "../App";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ClothingItemComponent from "./ClothingItem";

//export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

/*export type HomeProps = {
  navigation: ScreenNavigationProp;
};*/

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};
const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ route, navigation }: HomeProps) {
  const [progress, setProgress] = useState<number>(3);
  const [completedSets, setcompletedSets] = useState<number>(0); //get from local later.
  const [set, setSet] = useState<ClothingItem[]>([]);
  //const [time, setTime] = useState<number>(0);
  const CLOTHING_ITEMS_NUMBER = 3;

  useEffect(() => {
    //setProgress(set.length);
  }, [set]);

  //console.log("item:", route.params?.item);

  getData("completed_sets").then((completed) =>
    setcompletedSets(completed ? parseInt(completed) : 0)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Dress Me</Text>
      <Text style={styles.label}>Sets completed: {completedSets}</Text>
      <View style={styles.buttons}>
        <Button
          title="Shirt"
          onPress={() => navigation.navigate("ClothingItem", { type: "shirt" })}
        />
        <Button
          title="Pants"
          onPress={() => navigation.navigate("ClothingItem", { type: "pants" })}
        />
        <Button
          title="Shoes"
          onPress={() => navigation.navigate("ClothingItem", { type: "shoes" })}
        />
        <Text style={styles.label}>
          Progress: {progress}/{CLOTHING_ITEMS_NUMBER}
        </Text>
        <Progress.Bar
          style={styles.progress_bar}
          progress={progress / CLOTHING_ITEMS_NUMBER}
          width={200}
        />
      </View>
      {progress === 3 && (
        <SafeAreaView style={styles.done_button}>
          <Button
            title="Finish!"
            onPress={() => {
              storeData("completed_sets", String(completedSets + 1));
              setcompletedSets(completedSets + 1);
              navigation.navigate("Success", { set: set });
            }}
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
  label: {
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
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
