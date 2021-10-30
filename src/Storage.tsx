import { ClothingItem } from "./ClothingItem";

export const CLOTHING_ITEMS_NUMBER = 3;
export type itemType = "" | "shirt" | "shoes" | "pants";
//Saving "global" variables in a singelton storage.
class UserStore {
  itemSet: ClothingItem[] = [];
  progress: number = 0;
  time: number = 0;
  itemType: itemType = "";
  completedSets: number = 0;
  // adding an item to the set making sure that if the type exists it overrides it.
  addItem = (item: ClothingItem, type: string) => {
    this.itemSet = [...this.itemSet.filter((i) => i.type !== type), item];
  };
  //Get the progress of the set.
  getProgress = () => {
    return this.itemSet.length;
  };
}

let userStore: UserStore;

export function getUserstore() {
  if (!userStore) userStore = new UserStore();
  return userStore;
}
