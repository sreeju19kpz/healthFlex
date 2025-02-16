import { StyleSheet, StyleProp, TextStyle, ViewStyle, Pressable } from "react-native";
import React from "react";
import { View } from "./View";
import { Text } from "./Text";
import { alignment, gap } from "../../lib/commonStyles";

type BasicProps = { id: string; selectedItem: string };

type Props = {
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  value?: string;
  selectedValue?: string;
  onPress?: (val: string) => void;
};

const RadioBasic = (props: BasicProps) => {
  return (
    <View
      style={[styles.container]}
      borderLightColor={props.selectedItem === props.id ? "primary" : "mutedText"}
      borderDarkColor={props.selectedItem === props.id ? "primary" : "mutedText"}
    >
      {props.selectedItem === props.id && (
        <View style={styles.circle} lightColor="primary" darkColor="primary" />
      )}
    </View>
  );
};

const Radio = (props: Props) => {
  const onPressHandler = () => {
    if (!props.onPress) return;
    props.onPress(props?.value ?? "");
  };
  return (
    <Pressable onPress={onPressHandler}>
      <View style={[alignment.row, gap.gap_1, props.containerStyles]}>
        <View
          style={styles.container}
          borderLightColor={props.selectedValue === props.value ? "primary" : "mutedText"}
          borderDarkColor={props.selectedValue === props.value ? "primary" : "mutedText"}
        >
          {props.selectedValue === props.value && (
            <View style={styles.circle} lightColor="primary" />
          )}
        </View>

        <Text style={props.labelStyles}>{props.label}</Text>
      </View>
    </Pressable>
  );
};

export { RadioBasic, Radio };

const styles = StyleSheet.create({
  container: {
    height: 18,
    width: 18,
    borderRadius: 99999,
    borderWidth: 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: { borderRadius: 9999, height: 12, width: 12 },
});
