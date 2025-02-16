import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
const { width: windWidth, height: windHeight } = Dimensions.get("window");

export const Measurements = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  WINDOW_WIDTH: windWidth,
  WINDOW_HEIGHT: windHeight,
};
