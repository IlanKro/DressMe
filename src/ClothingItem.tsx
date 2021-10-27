import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { ClothingItem, RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ClothingItem">;

const Item = ({ name }: any) => (
  <View>
    <Text>{name}</Text>
  </View>
);

const renderItem = ({ item }: any) => {
  return <Item name={item.name} />;
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
});
