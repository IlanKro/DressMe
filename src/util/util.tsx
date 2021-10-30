import AsyncStorage from "@react-native-async-storage/async-storage";

export function addIndex(list: any[]) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({ id: i, value: list[i] });
  }
  return newList;
}
export function sortByProperty(property: string) {
  return function (a: any, b: any) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};
export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};
