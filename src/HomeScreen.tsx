import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { RootStackParamList, ClothingItem } from "../App";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { makeAutoObservable } from "mobx";
import { homeStyles } from "./Styles";

class Timer {
  secondsPassed: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }

  resetTimer() {
    this.secondsPassed = 0;
  }
}

const completionTimer = new Timer();
setInterval(() => {
  completionTimer.increaseTimer();
}, 1000);

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
  const [progress, setProgress] = useState<number>(0);
  const [completedSets, setcompletedSets] = useState<number>(0);
  const [itemSet, setItemSet] = useState<ClothingItem[]>([]);
  const CLOTHING_ITEMS_NUMBER = 3;

  useEffect(() => {
    setProgress(itemSet.length);
  }, [itemSet]);

  useEffect(() => {
    return function emptyItemSet() {
      setProgress(0);
      setItemSet([]);
    };
  }, [completedSets]);

  navigation.addListener("focus", () => {
    const item = route.params?.item;
    if (item) {
      const type: string = item.type;
      setItemSet([...itemSet.filter((i) => i.type !== item.type), item]); //Remove items with the same type if they exist.
      //navigation.setParams({ item: undefined }); //delete item after using.
    }
  });

  getData("completed_sets").then((completed) =>
    setcompletedSets(completed ? parseInt(completed) : 0)
  );

  return (
    <SafeAreaView style={homeStyles.container}>
      <Text style={homeStyles.header}>Dress Me</Text>
      <Text style={homeStyles.label}>Sets completed: {completedSets}</Text>
      <View style={homeStyles.buttons}>
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
        <Text style={homeStyles.label}>
          Progress: {progress}/{CLOTHING_ITEMS_NUMBER}
        </Text>
        <View style={homeStyles.icons}>
          <Ionicons
            name="shirt"
            size={32}
            color={
              itemSet.findIndex((i) => i.type === "shirt") != -1
                ? "green"
                : "grey"
            }
          />
          <Feather
            name="columns"
            size={32}
            color={
              itemSet.findIndex((i) => i.type === "pants") != -1
                ? "green"
                : "grey"
            }
          />
          <MaterialCommunityIcons
            name="shoe-formal"
            size={32}
            color={
              itemSet.findIndex((i) => i.type === "shoes") != -1
                ? "green"
                : "grey"
            }
          />
        </View>
        <Progress.Bar
          style={homeStyles.progress_bar}
          progress={progress / CLOTHING_ITEMS_NUMBER}
          width={200}
        />
      </View>
      {progress === 3 && (
        <SafeAreaView style={homeStyles.done_button}>
          <Button
            title="Finish!"
            onPress={() => {
              storeData("completed_sets", String(completedSets + 1));
              setcompletedSets(completedSets + 1);
              setProgress(0);
              navigation.navigate("Success", {
                set: itemSet,
                time: completionTimer.secondsPassed,
              });
              completionTimer.resetTimer();
            }}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
