import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { AppState, BackHandler, StyleSheet } from "react-native";
import { Text, View } from "../../components/atomic";
import { useTimerHooks } from "../../hooks/useTimerHooks";
import { LabelWrapper } from "./CreateTimer";
import { STRINGS } from "../../constants/Strings";
import { useEffect, useMemo } from "react";
import { categories } from "../../utils/categories";
import { alignment, componentStyles, gap, padding } from "../../lib/commonStyles";
import { Measurements } from "../../constants/Measurements";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BaseButton } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatTime } from "../../lib/formatTimer";
import { useThemeColor } from "../../hooks/useThemeColor";
import { useDispatch } from "react-redux";
import { timerSlice } from "../../redux/features/timer/timerSlice";
import Entypo from "@expo/vector-icons/Entypo";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { BackButton } from "../../components/molecular/BackButton/BackButton";

type Props = StaticScreenProps<{
  id: string;
}>;
const WINDOW_HEIGHT = Measurements.WINDOW_HEIGHT;

const Content = ({ text }: { text?: string }) => {
  return (
    <View
      style={{
        height: 54,
        borderWidth: 1,
        width: "100%",
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 12,
      }}
      borderLightColor="border1"
      borderDarkColor="border1"
    >
      <Text style={{}} type="Medium" lightColor="foreground" darkColor="foreground">
        {text}
      </Text>
    </View>
  );
};

export function TimerScreen({ route }: Props) {
  const { getTimerById } = useTimerHooks();
  const timer = getTimerById(Number(route.params.id));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categoryName = useMemo(() => {
    return categories.find((category) => category.id === Number(timer?.categoryId))?.name;
  }, [timer?.id]);
  const resetButtonBackground = useThemeColor(
    { dark: "foreground", light: "background" },
    "transparent"
  );
  const foregroundColor = useThemeColor({}, "foreground");
  const resetTimer = () => {
    dispatch(timerSlice.actions.resetTimer(timer?.id as number));
  };

  const onTrigger = () => {
    dispatch(timerSlice.actions.triggerTimer(timer?.id as number));
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container} lightColor="background" darkColor="background">
      <View style={styles.progressContainer} lightColor="border1" darkColor="border1">
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={((timer?.remaining as number) / (timer?.duration as number)) * 100}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        >
          {() => (
            <Text type="Bold" lightColor="foreground" darkColor="foreground">
              {formatTime(timer?.remaining as number)}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <View lightColor="background" darkColor="background" style={[styles.contentContainer]}>
        <LabelWrapper label={STRINGS.TIMER_NAME}>
          <Content text={timer?.name} />
        </LabelWrapper>
        <LabelWrapper label={STRINGS.CATEGORY}>
          <Content text={categoryName} />
        </LabelWrapper>
      </View>
      <View style={[alignment.flex1, alignment.center, alignment.row, gap.gap_4]}>
        <View style={[padding.p_2, styles.buttonContainer]} lightColor="color3" darkColor="color3">
          <AntDesign name="reload1" size={24} color={resetButtonBackground} />
          <BaseButton style={componentStyles.absolute_fill} onPress={resetTimer} />
        </View>
        {timer?.remaining ? (
          <View
            style={[padding.p_2, alignment.center, styles.buttonContainer, { borderWidth: 1 }]}
            borderDarkColor="border1"
            borderLightColor="border1"
          >
            {timer?.running ? (
              <Ionicons name="pause-outline" size={24} color={foregroundColor} />
            ) : (
              <Entypo name="controller-play" size={24} color={foregroundColor} />
            )}
            <BaseButton style={componentStyles.absolute_fill} onPress={onTrigger} />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  progressContainer: {
    height: WINDOW_HEIGHT / 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ translateY: -40 }],
    overflow: "hidden",
    zIndex: 10,
    flex: 1,
    gap: 16,
  },
  buttonContainer: { overflow: "hidden", borderRadius: 9999 },
});
