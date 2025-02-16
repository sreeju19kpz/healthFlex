import Entypo from "@expo/vector-icons/Entypo";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../../atomic";
import { COLORS } from "../../../constants/Colors";
import { alignment, componentStyles } from "../../../lib/commonStyles";

interface Props {
  onPressHandler?: () => void;
  lightColor?: keyof typeof COLORS.light;
  iconLightColor?: keyof typeof COLORS.light;
  darkColor?: keyof typeof COLORS.dark;
  iconDarkColor?: keyof typeof COLORS.dark;
  isBack?: boolean;
  isDismiss?: boolean;
  isDismissAll?: boolean;
  label?: string;
  labelPosition?: "center" | "start";
  containerStyles?: StyleProp<ViewStyle>;
}

const BackButton = ({
  onPressHandler,
  darkColor = "input",
  iconDarkColor = "mutedText2",
  iconLightColor = "mutedText2",
  lightColor = "input",
  label,
  labelPosition = "start",
  containerStyles,
}: Props) => {
  const color = useThemeColor({ dark: iconDarkColor, light: iconLightColor }, "foreground");
  const navigation = useNavigation();
  const onPress = () => {
    if (onPressHandler) {
      return onPressHandler();
    } else {
      return navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {label && (
        <View style={{ paddingHorizontal: 50 }}>
          <Text
            style={[
              styles.label,
              {
                paddingLeft: labelPosition === "start" ? 62 : 0,
                textAlign: labelPosition === "center" ? "center" : "auto",
                paddingRight: 20,
              },
            ]}
            type="Bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
        </View>
      )}
      <View
        darkColor={darkColor}
        lightColor={lightColor}
        style={[alignment.flex1, alignment.center, styles.backBtn]}
      >
        <Entypo name="chevron-small-left" size={32} color={color} />
        <BaseButton style={componentStyles.absolute_fill} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    height: 46,
    width: 46,
    borderRadius: 9999,
    position: "absolute",
    overflow: "hidden",
  },
  container: {
    gap: 16,
    height: 46,
    minWidth: 46,
    justifyContent: "center",
  },
  label: { fontSize: 18, lineHeight: 22.5 },
});
export { BackButton };
