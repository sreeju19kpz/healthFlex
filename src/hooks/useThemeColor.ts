import { COLORS } from "../constants/Colors";
import { useColorScheme } from "react-native";

export function useThemeColor(
  props: { light?: keyof typeof COLORS.light; dark?: keyof typeof COLORS.dark },
  colorName: keyof typeof COLORS.light | keyof typeof COLORS.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = () => {
    if (props[theme]) {
      return COLORS[theme][props[theme]];
    } else return COLORS[theme][colorName];
  };

  return colorFromProps();
}
