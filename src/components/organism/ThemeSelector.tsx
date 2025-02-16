import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import React, { useCallback, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, View } from "../atomic";
import { BaseButton } from "react-native-gesture-handler";
import { alignment, gap, padding } from "../../lib/commonStyles";
import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Radio, RadioBasic } from "../atomic/Radio";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import {
  preferenceSlice,
  ThemeState,
  ThemeTypes,
} from "../../redux/features/preference/preferenceSlice";

const ThemeSelector = () => {
  const sheet = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const handlePresentCategoryModalPress = useCallback(() => {
    sheet.current?.present();
  }, []);
  const mutedTextColor = useThemeColor({}, "mutedText");
  const theme = useSelector((state: RootState) => state.preference.theme);

  const renderItem: ListRenderItem<ThemeTypes> = ({ item }) => {
    const onPress = () => {
      dispatch(preferenceSlice.actions.setTheme({ theme: item }));
    };

    return (
      <BaseButton
        style={[padding.p_2, alignment.row, alignment.items_center, alignment.justify_between]}
        onPress={onPress}
      >
        <Text
          lightColor="foreground"
          darkColor="foreground"
          type="SemiBold"
          style={{ fontSize: 16, lineHeight: 18 }}
        >
          {item}
        </Text>
        <RadioBasic id={item} selectedItem={theme} />
      </BaseButton>
    );
  };

  return (
    <>
      <BaseButton
        style={[padding.p_1, { borderRadius: 9999 }]}
        onPress={handlePresentCategoryModalPress}
      >
        <Feather name="settings" size={20} color={mutedTextColor} />
      </BaseButton>
      <BottomSheetModal ref={sheet} snapPoints={["40%"]}>
        <BottomSheetView style={alignment.flex1}>
          <View
            style={[alignment.flex1, padding.p_4, gap.gap_6]}
            lightColor="background"
            darkColor="background"
          >
            <Text
              lightColor="foreground"
              darkColor="foreground"
              style={{ fontSize: 24 }}
              type="Bold"
            >
              Select Theme
            </Text>
            <FlatList data={["system", "dark", "light"]} renderItem={renderItem} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default ThemeSelector;
