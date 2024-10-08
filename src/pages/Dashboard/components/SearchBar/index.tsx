import { ChangeEvent, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { Button, IconButton, TextField } from "~/components";

import routes from "~/router/routes";
import * as S from "./styles";
import { formatCpf, isValidCpf } from "~/utils";

type Props = {
  onSearch: (value: string) => void;
  onRefresh: () => void;
};

const PLACEHOLDER_ERROR_MESSAGE = "Digite um CPF válido";

const SearchBar = ({ onSearch, onRefresh }: Props) => {
  const history = useHistory();

  const [value, setValue] = useState("");

  const isNotEmptyInvalidCpf = value !== "" && !isValidCpf(value);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCpf(event.target.value);
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
