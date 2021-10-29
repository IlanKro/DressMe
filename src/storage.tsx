import { ClothingItem } from "../App";

type itemType = "" | "shirt" | "shoes" | "pants";

class UserStore {
  itemSet: ClothingItem[] = [];
  progress: number = 0;
  time: number = 0;
  itemType: itemType = "";

  getItemSet = () => {
    return this.itemSet;
  };

  addItem = (item: ClothingItem, type: string) => {
    this.itemSet = [...this.itemSet.filter((i) => i.type !== type), item];
  };
  emptySet = () => {
    this.itemSet = [];
  };
  getProgress = () => {
    return this.itemSet.length;
  };
  getTime = () => {
    return this.time;
  };
  setTime = (time: number) => {
    this.time = time;
  };
  getType = () => {
    return this.itemType;
  };
  setType = (itemType: itemType) => {
    this.itemType = itemType;
  };
}
let userStore: UserStore; //Singelton userstorage.
export function getUserstore() {
  if (!userStore) userStore = new UserStore();
  return userStore;
}
