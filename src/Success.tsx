import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SuccessProps = NativeStackScreenProps<RootStackParamList, "Success">;

export default function Success({ route, navigation }: SuccessProps) {
  const Item = ({ type, name, brand, color, size }: any) => (
    <View style={styles.item}>
      <Text>type: {type} </Text>
      <Text>name: {name}</Text>
      <Text>brand: {brand}</Text>
      <Text>color: {color} </Text>
      <Text>size: {size} </Text>
    </View>
  );

  const renderItem = ({ item }: any) => {
    return (
      <Item
        type={item.type}
        name={item.name}
        brand={item.brand}
        color={item.colors}
        size={item.sizes}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          width: 200,
          height: 200,
          uri: "https://source.unsplash.com/1600x900/?success",
        }}
      />
      <Text style={styles.header}>Success!</Text>
      <Text style={styles.timer}>Took you: Seconds</Text>
      <FlatList
        data={route.params.set}
        renderItem={renderItem}
        ListEmptyComponent={<Text>no results found</Text>}
      />
      <Button
        title="Choose another set"
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  timer: {
    fontSize: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {},
});
