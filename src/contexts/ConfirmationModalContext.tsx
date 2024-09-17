import { createContext, ReactNode, useContext, useState } from "react";

type Function = () => void;

type ConfirmationModalContextType = {
  message: string;
  open: boolean;
  onConfirm?: Function;
  openModal: (message: string, onConfirm?: Function) => void;
  closeModal: Function;
};

const ConfirmationModalContext =
  createContext<ConfirmationModalContextType | null>(null);

type ConfirmationModalProviderProps = {
  children: ReactNode;
};

export const ConfirmationModalProvider = ({
  children,
}: ConfirmationModalProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<Function>();

  const openModal = (text: string, onConfirm?: Function) => {
    setMessage(text);
    setOnConfirm(() => onConfirm);
    setOpen(true);
  };

  const closeModal = () => {
    setMessage("");
    setOnConfirm(undefined);
    setOpen(false);
  };

  return (
    <ConfirmationModalContext.Provider
      value={{ message, open, onConfirm, openModal, closeModal }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);

  if (!context) {
    throw new Error(
      "useConfirmationModal must be used within a ConfirmationModalProvider"
    );
  }

  return context;
};
