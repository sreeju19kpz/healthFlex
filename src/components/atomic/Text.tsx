import React from "react";
import { type TextProps, StyleSheet, Text as TextRN } from "react-native";

import { useThemeColor } from "../../hooks/useThemeColor";
import { COLORS } from "../../constants/Colors";

export type TextTypes = "Bold" | "ExtraBold" | "Light" | "Regular" | "Medium" | "SemiBold";

export type ThemedTextProps = TextProps & {
  lightColor?: keyof typeof COLORS.light;
  darkColor?: keyof typeof COLORS.dark;
  type?: TextTypes;
};

function Text({ style, lightColor, darkColor, type = "Regular", ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <TextRN
      style={[
        { color },
        type === "Bold" ? styles.bold : undefined,
        type === "ExtraBold" ? styles.extraBold : undefined,
        type === "Light" ? styles.light : undefined,
        type === "Regular" ? styles.regular : undefined,
        type === "Medium" ? styles.medium : undefined,
        type === "SemiBold" ? styles.SemiBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

export { Text };

const styles = StyleSheet.create({
  bold: {
    fontFamily: "OpenSans-Bold", //font weight 700
    letterSpacing: -0.35,
  },
  extraBold: {
    fontFamily: "OpenSans-ExtraBold", //font weight 800
    letterSpacing: -0.35,
  },
  light: {
    fontFamily: "OpenSans-Light", //font weight 300
    letterSpacing: -0.35,
  },
  regular: {
    fontFamily: "OpenSans-Regular", //font weight 400
    letterSpacing: -0.1,
  },
  medium: {
    fontFamily: "OpenSans-Medium", //font weight 400
    letterSpacing: -0.1,
  },
  SemiBold: {
    fontFamily: "OpenSans-SemiBold", //font weight 100
    letterSpacing: -0.1,
  },
  Link: {
    fontFamily: "OpenSans-Light", //font weight 100
    letterSpacing: -0.1,
    borderBottomWidth: 1,
  },
});
