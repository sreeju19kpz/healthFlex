import { StyleProp, StyleSheet, ViewStyle, TextStyle } from "react-native";
import React from "react";
import { LinearGradient } from "./LinearGradient";
import { BaseButton } from "react-native-gesture-handler";
import { Text } from "./Text";

type Props = {
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  buttonText?: string;
  disabled?: boolean;
  inactive?: boolean;
  onClickHandler?: () => void;
  type?: "normal" | "primary";
  children?: React.ReactNode;
};

const PrimaryButton = ({
  buttonStyles,
  textStyles,
  buttonText,
  disabled = false,
  inactive = false,
  onClickHandler,
  type = "normal",
  children,
}: Props) => {
  return (
    <LinearGradient
      colorsDark={
        disabled
          ? ["muted", "muted"]
          : inactive
          ? ["transparent", "transparent"]
          : ["primary", "secondary"]
      }
      colorsLight={
        disabled
          ? ["muted", "muted"]
          : inactive
          ? ["transparent", "transparent"]
          : type === "normal"
          ? ["primary", "secondary"]
          : ["secondary", "primary"]
      }
      locations={[0, 1]}
      style={[styles.button, buttonStyles, { elevation: disabled ? 0 : 2 }]}
      end={type === "normal" ? { x: 0.7, y: 4 } : undefined}
    >
      {buttonText && (
        <Text style={[styles.text, textStyles]} type="Bold">
          {buttonText}
        </Text>
      )}
      {children}
      <BaseButton enabled={!disabled} style={styles.baseButton} onPress={onClickHandler} />
    </LinearGradient>
  );
};

export { PrimaryButton };

const styles = StyleSheet.create({
  button: {
    shadowColor: "blue",
    borderRadius: 10,
    overflow: "hidden",
    height: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "white" },
  baseButton: { position: "absolute", inset: 0 },
});
