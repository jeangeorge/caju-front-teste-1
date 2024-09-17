import { useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { formatCPF, isValidCPF } from "@brazilian-utils/brazilian-utils";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";

import * as S from "./styles";

type Props = {
  handleSearch: (value: string) => void;
  handleRefresh: () => void;
};

const PLACEHOLDER_MESSAGE = "Digite um CPF válido";

const SearchBar = ({ handleSearch, handleRefresh }: Props) => {
  const history = useHistory();

  const [value, setValue] = useState("");

  const invalidCpf = value !== "" && !isValidCPF(value);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatCPF(event.target.value);
    setValue(newValue);
    handleSearch(newValue);
  };

  return (
    <S.Container>
      <TextField
        placeholder={PLACEHOLDER_MESSAGE}
        value={value}
        onChange={onChange}
        error={invalidCpf ? PLACEHOLDER_MESSAGE : ""}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};

export default SearchBar;
