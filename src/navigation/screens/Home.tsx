import { SectionList, SectionListRenderItem, StyleSheet } from "react-native";
import { alignment, gap, padding } from "../../lib/commonStyles";
import { ItemSeparator, Text, View } from "../../components/atomic";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "../../hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import SectionWithTitle from "../../components/molecular/SectionWithTitle/SectionWithTitle";
import { STRINGS } from "../../constants/Strings";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../constants/Screen_Names";
import { useGetTimersByCategory } from "../../hooks/useGetTimersByCategory";
import TimerCard from "../../components/molecular/TimerCard/TimerCard";
import { Timer, timerSlice } from "../../redux/features/timer/timerSlice";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BaseButton } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Measurements } from "../../constants/Measurements";
import Entypo from "@expo/vector-icons/Entypo";
import ThemeSelector from "../../components/organism/ThemeSelector";

const requestNotificationPermission = async () => {
  await Notifications.requestPermissionsAsync();
};

export function Home() {
  const today = new Date().toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const navigation = useNavigation();
  const mutedTextColor = useThemeColor({}, "mutedText");
  const primaryColor = useThemeColor({}, "primary");
  const dispatch = useDispatch();
  const data = useGetTimersByCategory();

  const { top } = useSafeAreaInsets();
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  const dateAndNotificationHeader = () => {
    const onPressHistory = () => {
      navigation.navigate(SCREEN_NAMES.HISTORY);
    };

    return (
      <View style={[alignment.row, alignment.justify_between, padding.px_4]}>
        <View style={[alignment.row, alignment.items_center, gap.gap_1]}>
          <AntDesign name="calendar" size={14} color={mutedTextColor} />
          <Text lightColor="mutedText" darkColor="mutedText" style={styles.smallText}>
            {today}
          </Text>
        </View>
        <View style={[alignment.row, gap.gap_2, alignment.items_center]}>
          <BaseButton style={[padding.p_1, { borderRadius: 9999 }]} onPress={onPressHistory}>
            <MaterialIcons name="history" size={22} color={mutedTextColor} />
          </BaseButton>
          <ThemeSelector />
        </View>
      </View>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View
        style={[
          alignment.flex1,
          alignment.center,
          { height: Measurements.WINDOW_HEIGHT - 200, width: Measurements.WINDOW_WIDTH - 32 },
        ]}
      >
        <Text lightColor="foreground" darkColor="foreground">
          List is Empty
        </Text>
      </View>
    );
  };

  const createTimerHeader = () => {
    const icon = () => {
      return <Feather name="plus-circle" size={22} color={primaryColor} />;
    };

    const onPress = () => {
      navigation.navigate(SCREEN_NAMES.CREATE_TIMER);
    };

    return (
      <SectionWithTitle
        title={STRINGS.CREATE_TIMER}
        titleType="Bold"
        headerContainerStyles={[padding.px_4]}
        buttonIcon={icon()}
        onPress={onPress}
      ></SectionWithTitle>
    );
  };

  const renderSectionSeparator = () => {
    return <ItemSeparator height={12} />;
  };

  const stickHeader = () => {
    return (
      <View style={[gap.gap_6, padding.py_4, { top, paddingBottom: 36 }]}>
        {dateAndNotificationHeader()}
        {createTimerHeader()}
      </View>
    );
  };

  const renderItem: SectionListRenderItem<Timer> = ({ item }) => {
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

  return (
    <>
      <View style={[alignment.flex1]} lightColor="background" darkColor="background">
        {stickHeader()}
        <SectionList
          sections={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => {
            const onPress = () => {
              navigation.navigate(SCREEN_NAMES.TIMERS_BY_CATEGORY, { name: title });
            };
            return (
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text
                  style={[styles.header]}
                  type="Bold"
                  lightColor="foreground"
                  darkColor="foreground"
                >
                  {title}
                </Text>
                <BaseButton onPress={onPress}>
                  <Entypo name="chevron-right" size={20} color={mutedTextColor} />
                </BaseButton>
              </View>
            );
          }}
          SectionSeparatorComponent={renderSectionSeparator}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={renderSectionSeparator}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
          ListHeaderComponentStyle={{ height: 200, alignItems: "center" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  smallText: { fontSize: 12 },
  title: { fontSize: 20 },
  header: { fontSize: 17 },
});
