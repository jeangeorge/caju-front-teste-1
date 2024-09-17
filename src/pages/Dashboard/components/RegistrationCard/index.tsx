import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";

import * as S from "./styles";

type Props = {
  data: Registration;
  handleUpdateRegistration: (registration: Registration) => void;
};

const RegistrationCard = (props: Props) => {
  const { data, handleUpdateRegistration } = props;
  const { employeeName, email, admissionDate, status } = data;

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {status === "REVIEW" && (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() =>
              handleUpdateRegistration({ ...data, status: "REPROVED" })
            }
          >
            Reprovar
          </ButtonSmall>
        )}
        {status === "REVIEW" && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() =>
              handleUpdateRegistration({ ...data, status: "APPROVED" })
            }
          >
            Aprovar
          </ButtonSmall>
        )}
        {status !== "REVIEW" && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() =>
              handleUpdateRegistration({ ...data, status: "REVIEW" })
            }
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
