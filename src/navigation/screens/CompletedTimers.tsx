import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import React from "react";
import { useTimerHooks } from "../../hooks/useTimerHooks";
import { CompletedTimerProps } from "../../redux/features/timer/timerSlice";
import { Text, View } from "../../components/atomic";
import { alignment, gap } from "../../lib/commonStyles";
import { useThemeColor } from "../../hooks/useThemeColor";
import { BackButton } from "../../components/molecular/BackButton/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatTime } from "../../lib/formatTimer";

type Props = {};

const CompletedTimers = (props: Props) => {
  const { getAllCompletedTimers } = useTimerHooks();
  const completedTimers = getAllCompletedTimers();
  const backgroundColor = useThemeColor({}, "background");

  const renderItem: ListRenderItem<CompletedTimerProps> = ({ item }) => {
    return (
      <View
        borderDarkColor="border1"
        borderLightColor="border1"
        style={{ flexDirection: "row", borderWidth: 1, padding: 16, borderRadius: 8, gap: 16 }}
      >
        <View>
          <Text lightColor="foreground" darkColor="foreground" style={{ fontSize: 18 }}>
            {item.name}
          </Text>
        </View>
        <View style={gap.gap_1}>
          <Text lightColor="mutedText" darkColor="mutedText" style={{ fontSize: 10 }}>
            Completed On
          </Text>
          <Text lightColor="foreground" darkColor="foreground">
            {new Date(item.completedOn).toLocaleDateString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
        <View style={gap.gap_1}>
          <Text lightColor="mutedText" darkColor="mutedText" style={{ fontSize: 10 }}>
            Time
          </Text>
          <Text lightColor="foreground" darkColor="foreground">
            {new Date(item.completedOn).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              dayPeriod: "short",
              hourCycle: "h12",
            })}
          </Text>
        </View>
        <View>
          <Text lightColor="mutedText" darkColor="mutedText" style={{ fontSize: 10 }}>
            Duration
          </Text>
          <Text lightColor="foreground" darkColor="foreground">
            {formatTime(item.duration)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[alignment.flex1, { backgroundColor, gap: 24, padding: 16 }]}>
      <BackButton iconDarkColor="foreground" />
      <FlatList data={completedTimers} renderItem={renderItem} contentContainerStyle={gap.gap_4} />
    </SafeAreaView>
  );
};

export default CompletedTimers;
