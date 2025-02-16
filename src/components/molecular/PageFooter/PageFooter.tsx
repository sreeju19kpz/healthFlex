import { Keyboard, Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

type Props = { children: React.ReactNode };

const PageFooter = ({ children }: Props) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const bottomTabbar = () => {
    return <View style={styles.container}>{children}</View>;
  };

  if (Platform.OS === "ios") {
    return bottomTabbar();
  }
  if (isKeyboardVisible) return null;
  return bottomTabbar();
};

export default PageFooter;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    boxShadow: [
      { offsetX: 0, offsetY: 0, blurRadius: 15, spreadDistance: 0, color: "rgba(0,0,0,.15)" },
    ],
    width: "100%",
    paddingBottom: 24,
  },
});
