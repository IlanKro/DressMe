import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ClothProps = {
  type: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "ClothingItem">;

export default function ClothingItem({ route, navigation }: Props) {
  const type = route.params.type;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{type}</Text>
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
