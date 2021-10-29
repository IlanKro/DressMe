import { StyleSheet } from "react-native";
export const homeStyles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  label: {
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  buttons: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  progress_bar: {
    borderColor: "black",
    marginTop: 10,
  },
  done_button: {
    marginBottom: 20,
    marginTop: 50,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const clothingStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    borderColor: "black",
    borderRadius: 2,
    borderWidth: 2,
    margin: 3,
    flex: 2,
  },
  found: {
    alignSelf: "center",
  },
  searchBar: {
    flexDirection: "row",
  },
  searchBarText: {
    borderWidth: 1,
    width: 250,
    flex: 0.7,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  searchCategorySelect: {
    flex: 0.4,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 20,
  },
});

export const successStyles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  centeredContent: {
    alignItems: "center",
  },
  timer: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tableContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  tableBorder: { borderWidth: 2, borderColor: "#c8e1ff" },
  columnTitle: { height: 50, backgroundColor: "#f1f8ff" },
  row: { height: 50 },
  text: { textAlign: "center" },
  buttonPanel: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
});
