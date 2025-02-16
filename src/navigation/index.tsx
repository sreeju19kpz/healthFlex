import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTimer from "./screens/CreateTimer";
import { TimerScreen } from "./screens/Timer";
import { Home } from "./screens/Home";
import CompletedTimers from "./screens/CompletedTimers";
import TimersByCategory from "./screens/TimersByCategory";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    CreateTimer: {
      screen: CreateTimer,
      options: {
        presentation: "fullScreenModal",
        headerShown: false,
        animation: "fade_from_bottom",
      },
    },
    Timer: {
      screen: TimerScreen,
      options: {
        title: "Timer",
        headerShown: false,
        animation: "fade",
      },
    },
    History: {
      screen: CompletedTimers,
      options: {
        title: "CompletedTimer",
        headerShown: false,
        animation: "fade",
      },
    },
    TimersByCategory: {
      screen: TimersByCategory,
      options: {
        title: "CompletedTimer",
        headerShown: false,
        animation: "fade",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
