import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import TimerTick from "./components/molecular/TimerTick/TimerTick";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const [loaded, error] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Black": require("../assets/fonts/OpenSans-ExtraBold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
  });

  const [navReady, setNavReady] = React.useState(false);

  React.useEffect(() => {
    if (navReady && loaded) {
      SplashScreen.hideAsync();
    }
  }, [navReady, loaded]);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <ThemeProvider>
            <TimerTick>
              <Navigation
                linking={{
                  enabled: "auto",
                  prefixes: [
                    // Change the scheme to match your app's scheme defined in app.json
                    "healthflex://",
                  ],
                }}
                onReady={() => {
                  setNavReady(true);
                }}
              />
            </TimerTick>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
