import { useConfirmationModal } from "~/contexts";
import { ButtonSmall } from "~/components";

import * as S from "./ConfirmationModal.styles";

const ConfirmationModal = () => {
  const { message, onConfirm, open, closeModal } = useConfirmationModal();

  if (!open) {
    return null;
  }

  const onClickCancel = () => {
    closeModal();
  };

  const onClickConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.ModalHeader>Confirmação</S.ModalHeader>
        <S.ModalContent>{message}</S.ModalContent>
        <S.ButtonGroup>
          <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={onClickCancel}>
            Não
          </ButtonSmall>
          <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={onClickConfirm}>
            Sim
          </ButtonSmall>
        </S.ButtonGroup>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ConfirmationModal;
