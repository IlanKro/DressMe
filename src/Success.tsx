import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { ClothingItem, RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Table, Row, Rows } from "react-native-table-component";

type SuccessProps = NativeStackScreenProps<RootStackParamList, "Success">;

export default function Success({ route, navigation }: SuccessProps) {
  const tableHead = () => {
    return ["Type", "Name", "Brand", "Color", "Size"];
  };

  const tableData = (collection: ClothingItem[]) => {
    let tableData: any[][] = [];
    collection.forEach((element) => {
      tableData.push([
        element.type,
        element.name,
        element.brand,
        element.colors[0],
        element.sizes[0],
      ]);
    });
    return tableData;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContent}>
        <Image
          source={{
            width: 200,
            height: 200,
            uri: "https://source.unsplash.com/1600x900/?success",
          }}
        />
        <Text style={styles.header}>Success!</Text>
        <Text style={styles.timer}>Took you: {route.params.time} Seconds</Text>
      </View>
      <ScrollView style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={tableHead()}
            style={styles.columnTitle}
            textStyle={styles.text}
          />
          <Rows
            data={tableData(route.params.set)}
            style={styles.row}
            textStyle={styles.text}
          />
        </Table>
      </ScrollView>
      <View style={styles.centeredContent}>
        <Button
          title="Choose another set"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  centeredContent: {
    alignItems: "center",
  },
  timer: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tableContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  tableBorder: { borderWidth: 2, borderColor: "#c8e1ff" },
  columnTitle: { height: 50, backgroundColor: "#f1f8ff" },
  row: { height: 50 },
  text: { textAlign: "center" },
});
