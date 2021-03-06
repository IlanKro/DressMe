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
import { ClothingItem } from "./ClothingItem";
import { Table, Row, Rows } from "react-native-table-component";
import { successStyles } from "./Styles";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";
import { getUserstore } from "./Storage";

//type SuccessProps = NativeStackScreenProps<RootStackParamList, "Success">;

export default function Success({ navigation }: any) {
  const storage = getUserstore();
  const [itemSet, setItemSet] = useState<ClothingItem[]>([]);
  const [image, setImage] = useState<string>("");
  const IMAGE_SIZE = 150;
  const SUCCESS_TEXT = "Success!";
  //Loads success Image.
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setItemSet(storage.itemSet);
      storage.itemSet = []; //once loaded into the success page the item set on storage can get emptied.
      fetch("https://source.unsplash.com/1600x900/?success")
        .then((response) =>
          mounted
            ? setImage(response.url)
            : console.log("Couldn't update image.")
        )
        .catch((error) => {
          console.log(error);
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [storage]);

  //returns the content to share in clipboard or via the interface.
  const getShareableContent = () => {
    return SUCCESS_TEXT + " " + JSON.stringify(itemSet);
  };

  //Copies the shareable content to clipboard.
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

  //Shares shareable content via phone interface.
  const onShare = async () => {
    try {
      await Share.share({
        message: getShareableContent(),
      });
    } catch (error) {
      alert(error);
    }
  };

  //The argument on top of the table.
  const tableHead = () => {
    return ["Type", "Name", "Brand", "Color", "Size"];
  };

  //The data the table gets.
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
          Took you: {storage.time} Seconds
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
            data={tableData(itemSet)}
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
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Button title="Copy to clipboard" onPress={() => copyToClipboard()} />
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}
