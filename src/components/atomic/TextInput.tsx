import {
  StyleProp,
  TextInput as TextInputRN,
  TextStyle,
  ViewStyle,
  type TextInputProps,
} from "react-native";
import React, { forwardRef } from "react";

import { useThemeColor } from "../../hooks/useThemeColor";
import { COLORS } from "../../constants/Colors";
import { View } from "./View";
import { Text } from "./Text";

type Ref = TextInputRN;
export type ThemedTextInputProps = {
  style?: StyleProp<TextStyle>;
  fontColorLight?: keyof typeof COLORS.light;
  fontColorDark?: keyof typeof COLORS.dark;
  placeholderTextColorLight?: keyof typeof COLORS.light;
  placeholderTextColorDark?: keyof typeof COLORS.dark;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
  borderLightColor?: keyof typeof COLORS.light;
  borderDarkColor?: keyof typeof COLORS.dark;
  backgroundColorLight?: keyof typeof COLORS.light;
  backgroundColorDark?: keyof typeof COLORS.dark;
  error?: string;
} & Omit<TextInputProps, "placeholderTextColor" & "color">;

const TextInput = forwardRef<Ref, ThemedTextInputProps>(
  (
    {
      style,
      leftChildren,
      rightChildren,
      containerStyles,
      placeholderTextColorDark,
      placeholderTextColorLight,
      fontColorDark,
      fontColorLight,
      borderLightColor,
      borderDarkColor,
      backgroundColorDark,
      backgroundColorLight,
      error,
      ...InputProps
    }: ThemedTextInputProps,
    ref
  ) => {
    const color = useThemeColor({ light: fontColorLight, dark: fontColorDark }, "foreground");

    const pColor = useThemeColor(
      { light: placeholderTextColorLight, dark: placeholderTextColorDark },
      "mutedText2"
    );

    if (InputProps.placeholderTextColor) {
      console.log("please use placeholderTextColorDark and placeholderTextColorlLight");
    }

    return (
      <View
        darkColor={backgroundColorDark}
        lightColor={backgroundColorLight}
        borderDarkColor={error ? "color14" : borderDarkColor}
        borderLightColor={error ? "color14" : borderLightColor}
        style={[containerStyles]}
      >
        {leftChildren}
        <TextInputRN
          {...InputProps}
          style={[{ color, flexGrow: 1, padding: 0 }, style]}
          placeholderTextColor={pColor}
          ref={ref}
        />
        {rightChildren}
        {error && (
          <View
            style={{ position: "absolute", bottom: -5, paddingHorizontal: 8, marginLeft: 8 }}
            darkColor={backgroundColorDark}
            lightColor={backgroundColorLight}
          >
            <Text lightColor="color14">{error}</Text>
          </View>
        )}
      </View>
    );
  }
);

export { TextInput };
