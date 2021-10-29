import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { ClothingItem, RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Table, Row, Rows } from "react-native-table-component";
import { successStyles } from "./Styles";

type SuccessProps = NativeStackScreenProps<RootStackParamList, "Success">;

export default function Success({ route, navigation }: SuccessProps) {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    fetch("https://source.unsplash.com/1600x900/?success")
      .then((responce) => setImage(responce.url))
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    <SafeAreaView style={successStyles.container}>
      <View style={successStyles.centeredContent}>
        <Image
          source={
            image
              ? {
                  width: 200,
                  height: 200,
                  uri: image,
                }
              : require("../assets/Default_Image.png")
          }
          style={{ height: 200, width: 200, resizeMode: "stretch" }}
        />

        <Text style={successStyles.header}>Success!</Text>
        <Text style={successStyles.timer}>
          Took you: {route.params.time} Seconds
        </Text>
      </View>
      <ScrollView style={successStyles.tableContainer}>
        <Table borderStyle={successStyles.tableBorder}>
          <Row
            data={tableHead()}
            style={successStyles.columnTitle}
            textStyle={successStyles.text}
          />
          <Rows
            data={tableData(route.params.set)}
            style={successStyles.row}
            textStyle={successStyles.text}
          />
        </Table>
      </ScrollView>
      <View style={successStyles.centeredContent}>
        <Button
          title="Choose another set"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
}
