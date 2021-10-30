import React, { useState, useEffect } from "react";
import { Button, Text, View, SafeAreaView } from "react-native";
import { ClothingItem } from "./ClothingItem";
import * as Progress from "react-native-progress";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { homeStyles } from "./Styles";
import { getUserstore, CLOTHING_ITEMS_NUMBER } from "./Storage";
import { storeData, getData } from "./util/util";
import { completionTimer } from "./util/Timer";

export default function HomeScreen({ navigation }: any) {
  const [progress, setProgress] = useState<number>(0);
  const [completedSets, setcompletedSets] = useState<number>(0);
  const [itemSet, setItemSet] = useState<ClothingItem[]>([]);
  const storage = getUserstore();

  useEffect(() => {
    let mounted = true;
    navigation.addListener("focus", () => {
      setItemSet(storage.itemSet);
    });
    if (mounted) {
      setItemSet(storage.itemSet);
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setProgress(storage.getProgress());
  }, [itemSet]);

  useEffect(() => {
    return function emptyItemSet() {
      setProgress(storage.getProgress());
    };
  }, [completedSets]);

  getData("completed_sets").then((completed) => {
    const sets = completed ? parseInt(completed) : 0;
    setcompletedSets(sets);
    storage.completedSets = sets;
  });

  return (
    <SafeAreaView style={homeStyles.container}>
      <Text style={homeStyles.header}>Dress Me</Text>
      <Text style={homeStyles.label}>Sets completed: {completedSets}</Text>
      <View style={homeStyles.buttons}>
        <Button
          title="Shirt"
          onPress={() => {
            storage.itemType = "shirt";
            navigation.navigate("ClothingItem");
          }}
        />
        <Button
          title="Pants"
          onPress={() => {
            storage.itemType = "pants";
            navigation.navigate("ClothingItem");
          }}
        />
        <Button
          title="Shoes"
          onPress={() => {
            storage.itemType = "shoes";
            navigation.navigate("ClothingItem");
          }}
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
              storage.completedSets = completedSets + 1;
              setProgress(0);
              storage.time = completionTimer.secondsPassed;
              navigation.navigate("Success");
              completionTimer.resetTimer();
            }}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
