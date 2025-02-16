import { useColorScheme } from "react-native";
import React from "react";

import { LinearGradient as LG, LinearGradientProps } from "expo-linear-gradient";
import { useThemeColor } from "../../hooks/useThemeColor";
import { COLORS } from "../../constants/Colors";

type Props = {
  children?: React.ReactNode;
  colorsLight?: (keyof typeof COLORS.light)[];
  colorsDark?: (keyof typeof COLORS.dark)[];
} & Omit<LinearGradientProps, "colors">;

const LinearGradient = ({
  children,
  colorsLight,
  colorsDark,

  ...props
}: Props) => {
  const theme = useColorScheme() ?? "light";
  const getValues = () => {
    if (theme === "light" && colorsLight) {
      return colorsLight?.map((key) => useThemeColor({ light: key }, "transparent"));
    } else if (theme === "dark" && colorsDark) {
      return colorsDark?.map((key) => useThemeColor({ dark: key }, "transparent"));
    } else return ["transparent", "transparent"];
  };

  const values = getValues();

  if (theme === "dark" && (!colorsDark || colorsDark?.length < 2))
    throw new Error("atleast two colors required");
  if (theme === "light" && (!colorsLight || colorsLight?.length < 2))
    throw new Error("atleast two colors required");

  return (
    <LG {...props} colors={[values[0], values[1], ...values?.slice(2)]}>
      {children}
    </LG>
  );
};

export { LinearGradient };
