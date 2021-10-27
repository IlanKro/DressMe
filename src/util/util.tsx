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
