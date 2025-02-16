import React, { useCallback, useRef, useState } from "react";
import { alignment, gap, padding } from "../../lib/commonStyles";
import { Modal, PrimaryButton, Text, TextInput, View } from "../../components/atomic";
import { SafeAreaView } from "react-native-safe-area-context";
import { STRINGS } from "../../constants/Strings";
import { BaseButton } from "react-native-gesture-handler";
import { ListRenderItem, Pressable } from "react-native";
import PageFooter from "../../components/molecular/PageFooter/PageFooter";
import { BottomSheetFlatList, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { categories } from "../../utils/categories";
import { useDispatch } from "react-redux";
import { timerSlice } from "../../redux/features/timer/timerSlice";
import { useNavigation } from "@react-navigation/native";
import { ModalRef } from "../../components/atomic/Modal";
import { convertToSeconds } from "../../lib/formatTimer";
import { BackButton } from "../../components/molecular/BackButton/BackButton";

export const LabelWrapper = ({
  children,
  label,
}: {
  children?: React.ReactNode;
  label?: string;
}) => {
  return (
    <View style={[gap.gap_1]}>
      <Text style={{ fontSize: 13 }} type="SemiBold" lightColor="foreground" darkColor="foreground">
        {label}
      </Text>
      {children}
    </View>
  );
};

const CreateTimer = () => {
  const [category, setCategory] = useState<CategoriesProps>(categories[0]);
  const [duration, setDuration] = useState({ minutes: 0, seconds: 0 });
  const name = useRef("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categorySheetModalRef = useRef<BottomSheetModal>(null);
  const durationSheetModalRef = useRef<ModalRef>(null);

  const setName = (text: string) => {
    name.current = text;
  };

  const fnSetDuration = ({
    seconds: sec,
    minutes: min,
  }: {
    seconds?: string;
    minutes?: string;
  }) => {
    if (sec) {
      setDuration((prev) => {
        const { minutes, seconds } = prev;
        return { minutes, seconds: Number(sec) };
      });
    }
    if (min) {
      setDuration((prev) => {
        const { minutes, seconds } = prev;
        return { minutes: Number(min), seconds };
      });
    }
  };

  const handlePresentCategoryModalPress = useCallback(() => {
    categorySheetModalRef.current?.present();
  }, []);
  const handleCategorySheetChanges = useCallback((index: number) => {
    if (index === 0) {
      categorySheetModalRef.current?.dismiss();
    }
  }, []);

  const handlePresentDurationModalPress = useCallback(() => {
    durationSheetModalRef.current?.openModal();
  }, []);
  const handleHideDurationSheet = useCallback(() => {
    durationSheetModalRef.current?.closeModal();
  }, []);

  const createTimer = () => {
    const durationUpdated = convertToSeconds(duration.minutes, duration.seconds);
    dispatch(
      timerSlice.actions.addTimer({
        categoryId: category.id,
        duration: durationUpdated,
        name: name.current,
      })
    );
    navigation.goBack();
  };

  const renderCategoryList: ListRenderItem<CategoriesProps> = ({ item }) => {
    const onPress = () => {
      setCategory(item);
      categorySheetModalRef.current?.close();
    };

    const selected = category?.id === item.id;

    return (
      <View
        style={[{ height: 50, borderWidth: 1, borderRadius: 8 }]}
        borderLightColor={selected ? "border" : "transparent"}
        borderDarkColor={selected ? "border" : "border1"}
        lightColor={selected ? "background" : "color2"}
        darkColor={selected ? "background" : "color2"}
      >
        <BaseButton onPress={onPress} style={[alignment.flex1, alignment.center]}>
          <Text
            style={{ fontSize: 12 }}
            lightColor={"border"}
            darkColor="foreground"
            type={selected ? "Bold" : "Medium"}
          >
            {item.name}
          </Text>
        </BaseButton>
      </View>
    );
  };

  return (
    <>
      <View style={[alignment.flex1]} lightColor="background" darkColor="background">
        <SafeAreaView style={[alignment.flex1]}>
          <View style={[alignment.flex1, padding.p_4, gap.gap_4]}>
            <BackButton
              lightColor="overlay"
              darkColor="overlay"
              iconDarkColor="foreground"
              iconLightColor="foreground"
            />
            <View style={gap.gap_2}>
              <Text
                style={{ fontSize: 20, paddingBottom: 10 }}
                type="Bold"
                lightColor="foreground"
                darkColor="foreground"
              >
                {STRINGS.CREATE_TIMER}
              </Text>
              <View style={[gap.gap_2]}>
                <LabelWrapper label={STRINGS.TIMER_NAME}>
                  <TextInput
                    placeholder={STRINGS.ENTER_TIMER_NAME}
                    backgroundColorLight="background"
                    borderLightColor="border1"
                    containerStyles={[
                      { borderWidth: 1, height: 50, borderRadius: 4 },
                      padding.px_2,
                    ]}
                    defaultValue={name.current}
                    onChangeText={setName}
                    borderDarkColor="border1"
                  />
                </LabelWrapper>
                <LabelWrapper label={STRINGS.TIMER_DURATION}>
                  <Pressable
                    onPress={handlePresentDurationModalPress}
                    style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                  >
                    <TextInput
                      placeholder={STRINGS.TIMER_DURATION}
                      backgroundColorLight="background"
                      borderLightColor="border1"
                      containerStyles={[
                        { borderWidth: 1, height: 50, borderRadius: 4 },
                        padding.px_2,
                      ]}
                      focusable={false}
                      editable={false}
                      value={duration.minutes + " : " + duration.seconds}
                      borderDarkColor="border1"
                    />
                  </Pressable>
                </LabelWrapper>
                <LabelWrapper label={STRINGS.CATEGORY}>
                  <Pressable
                    onPress={handlePresentCategoryModalPress}
                    style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                  >
                    <TextInput
                      placeholder={STRINGS.SELECT_CATEGORY}
                      backgroundColorLight="background"
                      borderLightColor="border1"
                      containerStyles={[
                        { borderWidth: 1, height: 50, borderRadius: 4 },
                        padding.px_2,
                      ]}
                      focusable={false}
                      editable={false}
                      value={category?.name}
                      borderDarkColor="border1"
                    />
                  </Pressable>
                </LabelWrapper>
              </View>
            </View>
          </View>
          <PageFooter>
            <PrimaryButton buttonText={STRINGS.CREATE} onClickHandler={createTimer} />
          </PageFooter>
        </SafeAreaView>
      </View>
      <BottomSheetModal
        ref={categorySheetModalRef}
        index={1}
        snapPoints={["50%"]}
        enablePanDownToClose
        enableDismissOnClose
      >
        <BottomSheetView style={[alignment.flex1]}>
          <View style={alignment.flex1} lightColor="background" darkColor="background">
            <BottomSheetFlatList
              data={categories}
              renderItem={renderCategoryList}
              contentContainerStyle={[gap.gap_4, padding.p_4]}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <Modal
        ref={durationSheetModalRef}
        onRequestClose={handleHideDurationSheet}
        transparent
        statusBarTranslucent
        animationType="fade"
      >
        <View
          style={[alignment.flex1, alignment.center, gap.gap_10]}
          lightColor="overlay"
          darkColor="overlay"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 24,
              height: 100,
              alignItems: "center",
              width: "90%",
            }}
            lightColor="background"
            darkColor="background"
          >
            <TextInput
              containerStyles={{
                borderWidth: 1,
                borderRadius: 8,
                width: 60,
                height: 50,
                paddingHorizontal: 12,
              }}
              borderLightColor="border1"
              borderDarkColor="border1"
              keyboardType="numeric"
              textAlign="center"
              onChangeText={(val: string) => fnSetDuration({ minutes: val })}
              defaultValue={duration.minutes.toString()}
            />
            <Text>:</Text>
            <TextInput
              containerStyles={{
                borderWidth: 1,
                borderRadius: 8,
                width: 60,
                height: 50,
                paddingHorizontal: 12,
              }}
              borderLightColor="border1"
              borderDarkColor="border1"
              keyboardType="numeric"
              textAlign="center"
              onChangeText={(val: string) => fnSetDuration({ seconds: val })}
              defaultValue={duration.seconds.toString()}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              style={{
                width: 60,
                height: 30,
              }}
              onPress={handleHideDurationSheet}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  flex: 1,
                  borderRadius: 4,
                }}
                borderLightColor="border1"
                borderDarkColor="border1"
                lightColor="primary"
                darkColor="primary"
              >
                <Text style={{ textAlign: "center" }} lightColor="background" type="Bold">
                  Done
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateTimer;
