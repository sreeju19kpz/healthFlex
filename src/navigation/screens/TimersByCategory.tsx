import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../../components/molecular/BackButton/BackButton";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { categories } from "../../utils/categories";
import { useTimerHooks } from "../../hooks/useTimerHooks";
import { Timer, timerSlice } from "../../redux/features/timer/timerSlice";
import { SCREEN_NAMES } from "../../constants/Screen_Names";
import { useDispatch } from "react-redux";
import TimerCard from "../../components/molecular/TimerCard/TimerCard";
import { alignment, gap, padding } from "../../lib/commonStyles";
import { useThemeColor } from "../../hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "../../components/atomic";
import Entypo from "@expo/vector-icons/Entypo";
import { BaseButton } from "react-native-gesture-handler";
import Fontisto from "@expo/vector-icons/Fontisto";
type Props = StaticScreenProps<{
  name: string;
}>;

const TimersByCategory = ({ route }: Props) => {
  const categoryName = route.params.name;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const backgroundColor = useThemeColor({}, "background");
  const foregroundColor = useThemeColor({}, "foreground");
  const categoryId = useMemo(() => {
    return categories.find((category) => category.name === categoryName)?.id;
  }, [categoryName]);

  const { getAllTimersByCategory } = useTimerHooks();
  const data = getAllTimersByCategory(categoryId as number);

  const renderItem: ListRenderItem<Timer> = ({ item }) => {
    const onPress = () => {
      navigation.navigate(SCREEN_NAMES.TIMER, { id: item.id });
    };
    const onPressTrigger = () => {
      dispatch(timerSlice.actions.triggerTimer(item.id));
    };
    const onPressReset = () => {
      dispatch(timerSlice.actions.resetTimer(item.id));
    };
    return (
      <TimerCard
        {...item}
        onPressCard={onPress}
        onPressTrigger={onPressTrigger}
        onReset={onPressReset}
      />
    );
  };
  const resetTimerByCategory = () => {
    dispatch(timerSlice.actions.resetTimerByCategoryId(categoryId as number));
  };
  const startTimerByCategory = () => {
    dispatch(timerSlice.actions.startTimerByCategoryId(categoryId as number));
  };
  const stopTimerByCategory = () => {
    dispatch(timerSlice.actions.stopTimerByCategoryId(categoryId as number));
  };

  return (
    <SafeAreaView style={[padding.p_4, alignment.flex1, { backgroundColor }]}>
      <View style={[alignment.flex1, gap.gap_6]}>
        <BackButton iconDarkColor="foreground" />
        <FlatList data={data} renderItem={renderItem} contentContainerStyle={gap.gap_4} />
      </View>
      <View>
        <View style={[padding.p_4, alignment.center, alignment.row, gap.gap_6]}>
          <BaseButton onPress={resetTimerByCategory}>
            <View
              style={styles.buttonContainer}
              borderLightColor="border1"
              borderDarkColor="border1"
            >
              <Fontisto name="undo" size={24} color={foregroundColor} />
            </View>
          </BaseButton>
          <BaseButton onPress={stopTimerByCategory}>
            <View
              style={styles.buttonContainer}
              borderLightColor="border1"
              borderDarkColor="border1"
            >
              <Ionicons name="pause-outline" size={24} color={foregroundColor} />
            </View>
          </BaseButton>
          <BaseButton onPress={startTimerByCategory}>
            <View
              style={styles.buttonContainer}
              borderLightColor="border1"
              borderDarkColor="border1"
            >
              <Entypo name="controller-play" size={24} color={foregroundColor} />
            </View>
          </BaseButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TimersByCategory;

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    padding: 8,
    aspectRatio: 1,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
