import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getRegistrations } from "~/services";
import { Columns, SearchBar } from "./components";
import * as S from "./styles";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

const DashboardPage = () => {
  const [cpf, setCpf] = useState("");

  const { data, isLoading, isError } = useQuery({
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

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} />

      {isLoading ? <>Loading</> : <Columns registrations={data} />}
    </S.Container>
  );
};

export default DashboardPage;
