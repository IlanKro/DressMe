import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ClothingItem, RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ClothingItem">;

const addIndex = (list: any[]) => {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({ id: i, value: list[i] });
  }
  return newList;
};
const Item = ({ name, brand, colors }: any) => (
  <View style={styles.item}>
    <Text>name: {name}</Text>
    <Text>brand: {brand}</Text>
    {colors && (
      <FlatList data={addIndex(colors.sort())} renderItem={renderColorButton} />
    )}
  </View>
);

const renderColorButton = ({ item }: any) => {
  return (
    <Button
      color={item.value}
      title={item.value}
      onPress={() => console.log("pressed")}
    />
  );
};

const renderItem = ({ item }: any) => {
  return <Item name={item.name} brand={item.brand} colors={item.colors} />;
};

type SearchOptions = "name" | "brand" | "color" | "size";

function sortByProperty(property: string) {
  return function (a: any, b: any) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}

export default function ClothingItemComponent({ route, navigation }: Props) {
  const type = route.params.type;
  navigation.setOptions({ title: type });
  const [search, setSearch] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<SearchOptions>("name");
  const [filteredData, SetFilteredData] = useState<ClothingItem[]>([]);
  const [data, setData] = useState<ClothingItem[]>([]);

  useEffect(() => {
    fetch("http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms")
      .then((response) => response.json())
      .then((data) => {
        let items = [];
        for (let i = 0; i < data.results.length; i++) {
          items.push(data.results[i]);
        }
        items = items.filter((item) => item["type"] == type);
        items.sort(sortByProperty("name"));
        setData(items);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>found {data.length} items</Text>
      {data && <FlatList data={data} renderItem={renderItem} />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    justifyContent: "flex-start",
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    borderColor: "black",
    borderRadius: 2,
    borderWidth: 2,
    margin: 3,
    flexGrow: 1,
  },
});
