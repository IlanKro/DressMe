import AsyncStorage from "@react-native-async-storage/async-storage";

// Adds index to a collection 0-N N being the collection length
export const addIndex = (list: any[]) => {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({ id: i, value: list[i] });
  }
  return newList;
};
//Sorsts a JSON collection property alphabetically
export const sortByProperty = (property: string) => {
  return function (a: any, b: any) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
};

//stores data in user storage with key,value (both strings)
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

//Fetchs data from user storage with a key(string).
export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};
