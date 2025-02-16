import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { BackHandler, Modal as ModalComponent, ModalProps } from "react-native";
export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};
type Props = ModalProps & { children?: React.ReactNode };

const Modal = forwardRef<ModalRef, Props>(({ children, ...props }: Props, ref) => {
  const [visible, setIsVisible] = useState(false);
  useEffect(() => {
    const backAction = () => {
      fnCloseModal();
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsVisible(true),
    closeModal: () => setIsVisible(false),
  }));

  const fnCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalComponent {...props} visible={visible}>
      {children}
    </ModalComponent>
  );
});

export { Modal };
