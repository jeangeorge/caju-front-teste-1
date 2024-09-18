import { createContext, ReactNode, useContext, useState } from "react";

type Function = () => void;

type OpenModalArgs = {
  message: string;
  onConfirm: Function;
};

type ConfirmationModalContextType = {
  message: string;
  open: boolean;
  onConfirm?: Function;
  openModal: ({ message, onConfirm }: OpenModalArgs) => void;
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

  const openModal = ({ message, onConfirm }: OpenModalArgs) => {
    setMessage(message);
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
