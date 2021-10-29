import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Share,
} from "react-native";
import { ClothingItem, RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Table, Row, Rows } from "react-native-table-component";
import { successStyles } from "./Styles";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";

type SuccessProps = NativeStackScreenProps<RootStackParamList, "Success">;

export default function Success({ route, navigation }: SuccessProps) {
  const [image, setImage] = useState<string>("");
  const IMAGE_SIZE = 150;
  const SUCCESS_TEXT = "Success!";
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetch("https://source.unsplash.com/1600x900/?success")
        .then((responce) => setImage(responce.url))
        .catch((error) => {
          console.log(error);
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  const getShareableContent = () => {
    return SUCCESS_TEXT + " " + JSON.stringify(route.params.set);
  };

  const copyToClipboard = async () => {
    Clipboard.setString(getShareableContent());
    if ((await Clipboard.getStringAsync()) === getShareableContent()) {
      Toast.show({
        type: "success",
        text1: "Copied to clipboard",
        visibilityTime: 3000,
        autoHide: true,
        position: "top",
        bottomOffset: 60,
      });
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: getShareableContent(),
      });
    } catch (error) {
      alert(error);
    }
  };

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
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  uri: image,
                }
              : require("../assets/Default_Image.png")
          }
          style={{
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
          }}
        />

        <Text style={successStyles.header}>{SUCCESS_TEXT}</Text>
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
        <Button title="Share" onPress={() => onShare()} />
      </View>
      <View style={successStyles.buttonPanel}>
        <Button
          title="Choose another set"
          onPress={() => navigation.navigate("Home")}
        />
        <Button title="Copy to clipboard" onPress={() => copyToClipboard()} />
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}
