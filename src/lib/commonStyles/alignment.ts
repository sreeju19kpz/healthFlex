import { StyleSheet } from "react-native";

export const alignment = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  justify_between: {
    justifyContent: "space-between",
  },
  justify_center: {
    justifyContent: "center",
  },
  items_center: {
    alignItems: "center",
  },
  items_start: {
    alignItems: "flex-start",
  },
  grow: { flexGrow: 1 },
  center: { justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row" },
  self_center: { alignSelf: "center" },
});
