import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";
import React from "react";

type Props = Omit<StyleProp<ViewStyle>, "height" & "width"> & {
  height?: DimensionValue;
  width?: DimensionValue;
  backgroundColor?: string;
};

const ItemSeparator = ({
  height = 0,
  width = 0,
  backgroundColor = "transparent",
  ...props
}: Props) => {
  return <View style={{ height: height, width: width, backgroundColor }} {...props} />;
};

export { ItemSeparator };
