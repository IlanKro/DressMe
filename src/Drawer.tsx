import * as React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import { getUserstore, CLOTHING_ITEMS_NUMBER } from "./Storage";
import ClothingItemComponent from "./ClothingItem";
import Success from "./Success";
import { CommonActions } from "@react-navigation/native";

export type RootDrawerParamList = {
  Home: undefined;
  ClothingItem: undefined;
  Success: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="ClothingItem"
        component={ClothingItemComponent}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Success"
        component={Success}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
}

function DrawerContent({ navigation }: any) {
  const storage = getUserstore();
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        icon={() => <Ionicons name="home" size={32} color="black" />}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <DrawerItem
        label="Shirt"
        icon={() => <Ionicons name="shirt" size={32} color="black" />}
        onPress={() => {
          storage.setType("shirt");
          //navigation.navigate("ClothingItem");
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: "ClothingItem" }],
            })
          );
        }}
      />
      <DrawerItem
        label="Pants"
        icon={() => <Feather name="columns" size={32} color="black" />}
        onPress={() => {
          storage.setType("pants");
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: "ClothingItem" }],
            })
          );
        }}
      />
      <DrawerItem
        label="Shoes"
        icon={() => (
          <MaterialCommunityIcons name="shoe-formal" size={32} color="black" />
        )}
        onPress={() => {
          storage.setType("shoes");
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: "ClothingItem" }],
            })
          );
        }}
      />
      {storage.getProgress() === CLOTHING_ITEMS_NUMBER && (
        <DrawerItem
          label="Finish"
          icon={() => (
            <Ionicons
              name="md-checkmark-circle-sharp"
              size={32}
              color="green"
            />
          )}
          onPress={() => {
            storage.setTime(100);
            navigation.navigate("Success");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
}
