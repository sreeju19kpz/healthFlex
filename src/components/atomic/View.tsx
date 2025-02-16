import { View as ViewRN, type ViewProps } from "react-native";
import React from "react";
import { useThemeColor } from "../../hooks/useThemeColor";
import { COLORS } from "../../constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: keyof typeof COLORS.light;
  darkColor?: keyof typeof COLORS.dark;
  borderLightColor?: keyof typeof COLORS.light;
  borderDarkColor?: keyof typeof COLORS.dark;
};

export function View({
  style,
  lightColor = "transparent",
  darkColor = "transparent",
  borderLightColor = "transparent",
  borderDarkColor = "transparent",

  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "transparent");
  const borderColor = useThemeColor(
    { light: borderLightColor, dark: borderDarkColor },
    "transparent"
  );

  return <ViewRN style={[{ backgroundColor, borderColor }, style]} {...otherProps} />;
}
