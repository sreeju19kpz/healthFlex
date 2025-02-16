import { StyleSheet } from "react-native";
import React from "react";
import { BaseButton } from "react-native-gesture-handler";
import { Text, View } from "../../atomic";
import { Timer } from "../../../redux/features/timer/timerSlice";
import { componentStyles, gap } from "../../../lib/commonStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { formatTime } from "../../../lib/formatTimer";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useThemeColor } from "../../../hooks/useThemeColor";

type Props = {
  onPressCard?: () => void;
  onPressTrigger?: () => void;
  onReset?: () => void;
} & Timer;

const TimerCard = (props: Props) => {
  const foregroundColor = useThemeColor({}, "foreground");

  return (
    <BaseButton onPress={props.onPressCard} style={{ borderRadius: 8 }}>
      <View
        style={styles.container}
        borderLightColor="border1"
        borderDarkColor="border1"
        lightColor="transparent"
        darkColor="transparent"
      >
        <View style={gap.gap_3}>
          <Text style={{ fontSize: 18 }} type="Bold" lightColor="foreground" darkColor="foreground">
            {props.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12 }} lightColor="mutedText" darkColor="mutedText">
              {formatTime(props.remaining)}
            </Text>
          </View>
        </View>
        {props.remaining === 0 ? (
          <View style={styles.triggerConteiner}>
            <Fontisto name="undo" size={18} color={foregroundColor} />
            <BaseButton style={componentStyles.absolute_fill} onPress={props.onReset} />
          </View>
        ) : (
          <View style={styles.triggerConteiner}>
            {props.running ? (
              <FontAwesome6 name="pause" size={18} color={foregroundColor} />
            ) : (
              <Entypo name="controller-play" size={20} color={foregroundColor} />
            )}
            <BaseButton style={componentStyles.absolute_fill} onPress={props.onPressTrigger} />
          </View>
        )}
      </View>
    </BaseButton>
  );
};

export default TimerCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  triggerConteiner: {
    zIndex: 10,
    padding: 2,
    aspectRatio: 1,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 8,
  },
});
