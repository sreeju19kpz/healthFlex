import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import React from "react";
import { Text, View } from "../../atomic";
import { alignment, gap } from "../../../lib/commonStyles";
import { TextTypes } from "../../atomic/Text";
import { BaseButton } from "react-native-gesture-handler";

type Props = {
  title: string;
  children?: React.ReactNode;
  description?: string;
  button_text?: string;
  titleStyles?: StyleProp<TextStyle>;
  buttonTextStyles?: StyleProp<TextStyle>;
  headerContainerStyles?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
  titleType?: TextTypes;
  buttonIcon?: React.ReactNode;
};

const SectionWithTitle = ({ titleType = "ExtraBold", ...props }: Props) => {
  return (
    <View style={[gap.gap_4, props.containerStyles]}>
      <View style={[styles.headerContainer, props.headerContainerStyles]}>
        <View style={gap.gap_1}>
          <Text
            style={[styles.headerText, props.titleStyles]}
            type={titleType}
            numberOfLines={1}
            lightColor="foreground"
            darkColor="foreground"
          >
            {props.title}
          </Text>
          {props.description && (
            <Text style={styles.desc} darkColor="mutedText" lightColor="mutedText">
              {props.description ?? "ffff"}
            </Text>
          )}
        </View>
        {props.buttonIcon && (
          <BaseButton onPress={props.onPress} style={[alignment.center, styles.button]}>
            {props.buttonIcon}
          </BaseButton>
        )}
      </View>
      <View>{props.children}</View>
    </View>
  );
};

export default SectionWithTitle;

const styles = StyleSheet.create({
  headerText: { fontSize: 20, lineHeight: 24 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  desc: { fontSize: 14, lineHeight: 17 },
  buttonText: { fontSize: 16, lineHeight: 24 },
  button: { aspectRatio: 1, borderRadius: 9999 },
});
