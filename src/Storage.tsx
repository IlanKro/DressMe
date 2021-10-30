import { ClothingItem } from "../App";

export const CLOTHING_ITEMS_NUMBER = 3;
export type itemType = "" | "shirt" | "shoes" | "pants";
//Saving "global" variables in a singelton storage.
class UserStore {
  itemSet: ClothingItem[] = [];
  progress: number = 0;
  time: number = 0;
  itemType: itemType = "";
  completedSets: number = 0;
  addItem = (item: ClothingItem, type: string) => {
    this.itemSet = [...this.itemSet.filter((i) => i.type !== type), item];
  };
  getProgress = () => {
    return this.itemSet.length;
  };
}

let userStore: UserStore;

export function getUserstore() {
  if (!userStore) userStore = new UserStore();
  return userStore;
}
