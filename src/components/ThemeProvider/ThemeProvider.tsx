import { Appearance, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

type Props = { children?: React.ReactNode };

const ThemeProvider = (props: Props) => {
  const theme = useSelector((state: RootState) => state.preference.theme);
  const colorTheme = useColorScheme();
  const colorTheme2 = Appearance.getColorScheme();
  console.log(colorTheme);

  React.useEffect(() => {
    async function prepare() {
      try {
        if (theme === "system") {
          Appearance.setColorScheme(undefined);
        }
        if (theme) {
          if (theme !== colorTheme && theme !== "system") {
            Appearance.setColorScheme(theme);
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [theme]);
  return <>{props.children}</>;
};

export default ThemeProvider;
