import { Measurements } from "../../constants/Measurements";
import { StyleSheet } from "react-native";

export const width = StyleSheet.create({
  widthScreen: {
    width: Measurements.SCREEN_WIDTH,
  },
  widthWindow: {
    width: Measurements.SCREEN_WIDTH,
  },
  "w-100": { width: "100%" },
});
