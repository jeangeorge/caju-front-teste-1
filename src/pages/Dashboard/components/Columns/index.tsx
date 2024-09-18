import RegistrationCard from "../RegistrationCard";
import * as S from "./styles";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: Registration[];
  onDeleteRegistration: (registration: Registration) => void;
  onUpdateRegistration: (registration: Registration) => void;
};

const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations?.map((registration) => {
                  if (registration.status === collum.status) {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        onDeleteRegistration={props.onDeleteRegistration}
                        onUpdateRegistration={props.onUpdateRegistration}
                      />
                    );
                  }
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
