import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

import { getRegistrations } from "~/services";
import { Columns, SearchBar } from "./components";
import * as S from "./styles";
import { useConfirmationModal } from "~/contexts";

const DashboardPage = () => {
  const { openModal } = useConfirmationModal();

  const [cpf, setCpf] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["registrations", cpf],
    queryFn: () => getRegistrations(cpf),
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

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} handleRefresh={handleRefresh} />

      {isLoading ? <>Loading</> : <Columns registrations={data} />}
    </S.Container>
  );
};

export default DashboardPage;
