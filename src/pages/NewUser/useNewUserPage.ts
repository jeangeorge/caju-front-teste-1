import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import routes from "~/router/routes";
import { createRegistration } from "~/services";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { z } from "zod";

const newUserSchema = z.object({
  employeeName: z
    .string()
    .min(1, { message: "Insira um nome!" })
    .regex(/\s+/, { message: "O nome deve conter pelo menos um espaço!" })
    .min(2, { message: "O nome deve conter no mínimo duas letras!" })
    .regex(/^[^\d]/, {
      message: "A primeira letra do nome não pode ser um número!",
    }),
  email: z
    .string()
    .min(1, { message: "Insira um email!" })
    .email({ message: "Insira um email válido!" }),
  cpf: z
    .string()
    .min(1, { message: "Insira um CPF!" })
    .refine((cpf: string) => isValidCPF(cpf), {
      message: "Insira um CPF válido!",
    }),
  admissionDate: z
    .string()
    .min(1, { message: "Insira uma data de admissão!" })
    .date("Insira uma data válida!"),
});

type NewUserFormData = z.infer<typeof newUserSchema>;

const useNewUserPage = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const methods = useForm<NewUserFormData>({
    resolver: zodResolver(newUserSchema),
  });

  const { mutate: createRegistrationMutation } = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      toast.success("Registro criado com sucesso!", {
        position: "bottom-right",
      });
      goToHome();
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao tentar criar o registro. Por favor, tente novamente.",
        {
          position: "bottom-right",
        }
      );
    },
  });

  const onSubmit = (data: NewUserFormData) => {
    const admissionDate = format(parseISO(data.admissionDate), "dd/MM/yyyy");
    createRegistrationMutation({ ...data, admissionDate, status: "REVIEW" });
  };

  return {
    methods,
    goToHome,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};

export default useNewUserPage;
