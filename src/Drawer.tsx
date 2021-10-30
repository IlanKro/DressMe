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
import { storeData } from "./util/util";
import { completionTimer } from "./util/Timer";

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
          storage.itemType = "shirt";
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
          storage.itemType = "pants";
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
          storage.itemType = "shoes";
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
            storage.time = completionTimer.secondsPassed;
            storage.completedSets = storage.completedSets + 1;
            storeData("completed_sets", String(storage.completedSets));
            completionTimer.resetTimer();
            navigation.navigate("Success");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
}
