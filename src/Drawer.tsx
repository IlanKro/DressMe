import * as React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";

import HomeScreen from "./HomeScreen";
import { getUserstore, CLOTHING_ITEMS_NUMBER } from "./Storage";
import ClothingItemComponent from "./ClothingItem";
import Success from "./Success";

export type RootDrawerParamList = {
  Home: undefined;
  ClothingItem: undefined;
  Success: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
type DrawerProps = DrawerScreenProps<RootDrawerParamList>; //Handle later.

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
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <DrawerItem
        label="Shirt"
        onPress={() => {
          storage.setType("shirt");
          navigation.navigate("ClothingItem");
        }}
      />
      <DrawerItem
        label="Pants"
        onPress={() => {
          storage.setType("pants");
          navigation.navigate("ClothingItem");
        }}
      />
      <DrawerItem
        label="Shoes"
        onPress={() => {
          storage.setType("shoes");
          navigation.navigate("ClothingItem");
        }}
      />
      {storage.getProgress() === CLOTHING_ITEMS_NUMBER && (
        <DrawerItem
          label="Finish"
          onPress={() => {
            storage.setTime(100);
            navigation.navigate("Success");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
}
