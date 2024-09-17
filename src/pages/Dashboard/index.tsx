import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

import {
  getRegistrations,
  updateRegistration as updateRegistrationService,
} from "~/services";
import { Columns, SearchBar } from "./components";
import * as S from "./styles";
import { useConfirmationModal } from "~/contexts";

const registrationStatusMap = {
  REVIEW: "Pronto para revisar",
  APPROVED: "Aprovado",
  REPROVED: "Reprovado",
};

const DashboardPage = () => {
  const { openModal } = useConfirmationModal();

  const [cpf, setCpf] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["registrations", cpf],
    queryFn: () => getRegistrations(cpf),
  });

  const { mutate: updateRegistration, isPending } = useMutation({
    mutationFn: updateRegistrationService,
    onSuccess: () => {
      // TODO: add an alert here
      refetch();
    },
    onError: () => {
      // TODO: add an alert here
    },
  });

  if (isError) {
    return <>Error</>;
  }

  const handleSearch = (value: string) => {
    const shouldSearch = value === "" || isValidCPF(value);

    if (shouldSearch) {
      const numericValue = value.replace(/\D/g, "");
      setCpf(numericValue);
    }
  };

  const handleRefresh = () => {
    openModal("Tem certeza que deseja atualizar a listagem de admissões?", () =>
      refetch()
    );
  };

  const handleUpdateRegistration = (registration: Registration) => {
    const message = `Tem certeza que deseja mover "${
      registration.employeeName
    }" para a coluna "${registrationStatusMap[registration.status]}"?`;
    openModal(message, () => updateRegistration(registration));
  };

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />

      {isLoading || isPending ? (
        <>Loading</>
      ) : (
        <Columns
          registrations={data}
          handleUpdateRegistration={handleUpdateRegistration}
        />
      )}
    </S.Container>
  );
};

export default DashboardPage;
