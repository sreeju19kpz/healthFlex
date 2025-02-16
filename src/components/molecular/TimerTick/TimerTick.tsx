import { AppState, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { AppDispatch } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import { timerSlice } from "../../../redux/features/timer/timerSlice";
import * as Notifications from "expo-notifications";
import { Modal, View } from "../../atomic";
import { alignment, componentStyles, gap } from "../../../lib/commonStyles";
import LottieView from "lottie-react-native";
import { ModalRef } from "../../atomic/Modal";

type Props = {
  children?: React.ReactNode;
};

const TimerTick = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const modalRef = useRef<ModalRef>(null);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      if (notification.request.content?.categoryIdentifier === "full") {
        modalRef.current?.openModal();
      }
      await Notifications.dismissNotificationAsync(notification.request.identifier);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(timerSlice.actions.decrementTime());
    }, 1000);

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        dispatch(timerSlice.actions.updateTimeFromBackground());
      }
    };

    const appStateListener = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      clearInterval(interval);
      appStateListener.remove();
    };
  }, [dispatch]);

  const onClose = () => {
    modalRef.current?.closeModal();
  };

  return (
    <>
      {props.children}
      <Modal transparent statusBarTranslucent ref={modalRef}>
        <View
          style={[alignment.flex1, alignment.center, gap.gap_10]}
          darkColor="overlay"
          lightColor="overlay"
        >
          <LottieView
            source={require("../../../assets/animations/success.json")}
            autoPlay
            style={{ width: "50%", aspectRatio: 1 }}
            loop={false}
          />
        </View>
        <Pressable style={componentStyles.absolute_fill} onPress={onClose} />
      </Modal>
    </>
  );
};

export default TimerTick;
