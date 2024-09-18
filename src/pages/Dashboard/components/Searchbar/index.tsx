import { ChangeEvent, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { formatCPF, isValidCPF } from "@brazilian-utils/brazilian-utils";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";

import * as S from "./styles";

type Props = {
  onSearch: (value: string) => void;
  onRefresh: () => void;
};

const PLACEHOLDER_ERROR_MESSAGE = "Digite um CPF válido";

const SearchBar = ({ onSearch, onRefresh }: Props) => {
  const history = useHistory();

  const [value, setValue] = useState("");

  const isNotEmptyInvalidCpf = value !== "" && !isValidCPF(value);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(event.target.value);
    setValue(formattedValue);
    onSearch(formattedValue);
  };

  return (
    <S.Container>
      <TextField
        placeholder={PLACEHOLDER_ERROR_MESSAGE}
        value={value}
        onChange={onChange}
        error={isNotEmptyInvalidCpf ? PLACEHOLDER_ERROR_MESSAGE : ""}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={onRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};

export default SearchBar;
