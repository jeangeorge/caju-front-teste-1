import { formatCPF } from "@brazilian-utils/brazilian-utils";
import { HiOutlineArrowLeft } from "react-icons/hi";

import { Button, IconButton, TextField } from "~/components";

import * as S from "./styles";
import useNewUserPage from "./useNewUserPage";

const NewUserPage = () => {
  const { methods, goToHome, onSubmit } = useNewUserPage();

  const {
    formState: { errors },
    register,
    setValue,
  } = methods;

  return (
    <S.Container>
      <S.Form onSubmit={onSubmit}>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          error={errors.employeeName?.message}
          placeholder="Nome"
          label="Nome"
          {...register("employeeName")}
        />
        <TextField
          error={errors.email?.message}
          placeholder="Email"
          label="Email"
          type="email"
          {...register("email")}
        />
        <TextField
          error={errors.cpf?.message}
          placeholder="CPF"
          label="CPF"
          {...register("cpf")}
          onChange={(event) => setValue("cpf", formatCPF(event.target.value))}
        />
        <TextField
          error={errors.admissionDate?.message}
          label="Data de admissão"
          type="date"
          {...register("admissionDate")}
        />
        <Button type="submit">Cadastrar</Button>
      </S.Form>
    </S.Container>
  );
};

export default NewUserPage;
