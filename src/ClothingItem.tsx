import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import { addIndex, sortByProperty } from "./util/util";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { clothingStyles } from "./Styles";
import { getUserstore, itemType } from "./Storage";

export type ClothingItem = {
  id: number;
  type: string;
  name: string;
  colors: string[];
  sizes: number[];
  brand: string;
};
type SearchOptions = "name" | "brand" | "colors" | "sizes";

export default function ClothingItemComponent({ navigation }: any) {
  const [search, setSearch] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<SearchOptions>("name");
  const [filteredData, setFilteredData] = useState<ClothingItem[]>([]);
  const [data, setData] = useState<ClothingItem[]>([]);
  const [color, setColor] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  const [type, setType] = useState<itemType>("");
  const storage = getUserstore();

  //Adds icon and clothItem type to the header.
  const IconTitle = ({ type }: any) => {
    return (
      <View style={clothingStyles.header}>
        {type == "shirt" && <Ionicons name="shirt" size={32} color="blue" />}
        {type == "pants" && <Feather name="columns" size={32} color="blue" />}
        {type == "shoes" && (
          <MaterialCommunityIcons name="shoe-formal" size={32} color="blue" />
        )}
        <Text style={clothingStyles.headerText}>{type}</Text>
      </View>
    );
  };

  //Loads data from mock directory and filters it to the page type.
  useEffect(() => {
    let mounted = true;
    const itemtype = storage.itemType; //needed cause set state isn't immediate.
    setType(itemtype);
    if (mounted) {
      navigation.setOptions({
        headerTitle: (props: any) => <IconTitle {...props} type={itemtype} />,
      });
      fetch("http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms")
        .then((response) => response.json())
        .then((data) => {
          let items = [];
          for (let i = 0; i < data.results.length; i++) {
            items.push(data.results[i]);
          }
          items = items.filter((item) => item["type"] == itemtype);
          items.sort(sortByProperty("name"));
          //Remove duplicate ids I found some in the mock data, in actual apps the database should avoid duplicate primary keys
          items = [...new Set(items)];
          setData(items);
          setFilteredData(items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [storage.itemType]);

  //Queries the items for the search functionality.
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

  //Controls the search and changes the data shown.
  useEffect(() => {
    if (search === "") {
      setFilteredData(data);
    } else {
      search.length <= 2
        ? setFilteredData(queryItems().slice(0, 5))
        : setFilteredData(queryItems());
    }
  }, [search]);

  //Renders a single item.
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

  //The item JSX elements.
  const Item = ({ name, brand, colors, id, sizes }: any) => (
    <View style={clothingStyles.item}>
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
            renderItem={(item) => renderSizesButton(item)}
            listKey={id + "sizes"}
          />
        </View>
      )}
    </View>
  );

  //renders a single color button, the id is to locate which ittem is being selected.
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

  //renders a single sizes button, once pressed the item will be added to  the storage collection.
  const renderSizesButton = ({ item }: any) => {
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
                  storage.addItem(selectedItem, type);
                  navigation.navigate("Home");
                },
              },
            ]
          )
        }
      />
    );
  };

  return (
    <SafeAreaView style={clothingStyles.container}>
      <View style={clothingStyles.searchBar}>
        <TextInput
          style={clothingStyles.searchBarText}
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
          buttonStyle={clothingStyles.searchCategorySelect}
          dropdownStyle={clothingStyles.searchCategorySelect}
          defaultButtonText="Search By"
        />
      </View>
      <Text style={clothingStyles.found}>
        found {filteredData.length} items
      </Text>
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
