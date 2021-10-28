import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { ClothingItem, RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addIndex, sortByProperty } from "./util/util";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

type Props = NativeStackScreenProps<RootStackParamList, "ClothingItem">;

type SearchOptions = "name" | "brand" | "colors" | "sizes";

export default function ClothingItemComponent({ route, navigation }: Props) {
  const type = route.params.type;
  navigation.setOptions({
    headerTitle: (props: any) => <LogoTitle {...props} />,
  });
  const [search, setSearch] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<SearchOptions>("name");
  const [filteredData, setFilteredData] = useState<ClothingItem[]>([]);
  const [data, setData] = useState<ClothingItem[]>([]);
  const [color, setColor] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  function LogoTitle() {
    return (
      <View style={styles.header}>
        {type == "shirt" && <Ionicons name="shirt" size={32} color="blue" />}
        {type == "pants" && <Feather name="columns" size={32} color="blue" />}
        {type == "shoes" && (
          <MaterialCommunityIcons name="shoe-formal" size={32} color="blue" />
        )}
        <Text style={styles.headerText}>{type}</Text>
      </View>
    );
  }

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
        //Remove duplicate ids I found some in the mock data, in actual apps the database should avoid duplicate primary keys
        items = [...new Set(items)];
        setData(items);
        setFilteredData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const queryItems = () => {
    return ["name", "brand"].includes(searchCategory)
      ? data.filter((item) =>
          String(item[searchCategory])
            .toLocaleLowerCase() //Match without case sensitivity.
            .includes(search.toLocaleLowerCase())
        )
      : data.filter(
          (item) =>
            //If it's colors/sizes which are string[]
            (item[searchCategory] as String[]).filter((element) =>
              String(element)
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ).length > 0
        );
  };

  useEffect(() => {
    if (search === "") {
      setFilteredData(data);
    } else {
      search.length <= 2
        ? setFilteredData(queryItems().slice(0, 5))
        : setFilteredData(queryItems());
    }
  }, [search]);

  const renderItem = ({ item }: any) => {
    return (
      <Item
        name={item.name}
        brand={item.brand}
        colors={item.colors}
        id={item.id}
        sizes={item.sizes}
      />
    );
  };

  const Item = ({ name, brand, colors, id, sizes }: any) => (
    <View style={styles.item}>
      <Text>name: {name}</Text>
      <Text>brand: {brand}</Text>
      <Text>colors: </Text>
      {id == selected && <Text>{color} selected</Text>}
      {colors && (
        <FlatList
          data={addIndex(colors.sort())}
          renderItem={(item) => renderColorButton(item, id)}
          listKey={id + "colors"}
        />
      )}
      {id == selected && (
        <View>
          <Text>sizes: </Text>
          <FlatList
            data={addIndex(sizes.sort())}
            renderItem={(item) => renderSizesButton(item, id)}
            listKey={id + "sizes"}
          />
        </View>
      )}
    </View>
  );

  const renderColorButton = ({ item }: any, id: string) => {
    return (
      <Button
        color={item.value}
        title={item.value}
        onPress={() => {
          setColor(item.value);
          setSelected(id);
        }}
      />
    );
  };

  const renderSizesButton = ({ item }: any, id: string) => {
    return (
      <Button
        title={item.value.toString()}
        onPress={() =>
          Alert.alert(
            "Do you want to select this item?",
            "Once selected you will return to the home screen",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                onPress: () => {
                  let selectedItem = data.filter(
                    (item) => String(item["id"]) == selected
                  )[0]; //Ids are unique.
                  selectedItem.colors = [color];
                  selectedItem.sizes = [item.value.toString()];
                  navigation.navigate("Home", { item: selectedItem });
                },
              },
            ]
          )
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarText}
          defaultValue=""
          placeholder="search here..."
          onChangeText={setSearch}
        />
        <SelectDropdown
          data={["name", "brand", "sizes", "colors"]}
          onSelect={setSearchCategory}
          buttonTextAfterSelection={(selectedItem: SearchOptions) => {
            return selectedItem;
          }}
          rowTextForSelection={(item: SearchOptions) => {
            return item;
          }}
          buttonStyle={styles.searchCategorySelect}
          dropdownStyle={styles.searchCategorySelect}
          defaultButtonText="Search By"
        />
      </View>
      <Text style={styles.found}>found {filteredData.length} items</Text>
      {filteredData && (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          ListEmptyComponent={<Text>no results found</Text>}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    borderColor: "black",
    borderRadius: 2,
    borderWidth: 2,
    margin: 3,
    flex: 2,
  },
  found: {
    alignSelf: "center",
  },
  searchBar: {
    flexDirection: "row",
  },
  searchBarText: {
    borderWidth: 1,
    width: 250,
    flex: 0.7,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  searchCategorySelect: {
    flex: 0.4,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 20,
  },
});
