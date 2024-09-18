import { useEffect, useState } from "react";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteRegistration,
  getRegistrations,
  updateRegistration,
} from "~/services";
import { useConfirmationModal } from "~/contexts";

const registrationStatusMap = {
  REVIEW: "Pronto para revisar",
  APPROVED: "Aprovado",
  REPROVED: "Reprovado",
};

const useDashboardPage = () => {
  const { openModal } = useConfirmationModal();

  const [cpf, setCpf] = useState("");

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["registrations", cpf],
    queryFn: () => getRegistrations(cpf),
  });

  const { mutate: updateRegistrationMutation, isPending } = useMutation({
    mutationFn: updateRegistration,
    onSuccess: () => {
      toast.success("Registro atualizado com sucesso!", {
        position: "bottom-right",
      });
      refetch();
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao atualizar o registro. Por favor, tente novamente.",
        {
          position: "bottom-right",
        }
      );
    },
  });

  const { mutate: deleteRegistrationMutation } = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      toast.success("Registro excluído com sucesso!", {
        position: "bottom-right",
      });
      refetch();
    },
    onError: () => {
      toast.error(
        "Ocorreu um erro ao excluir o registro. Por favor, tente novamente.",
        {
          position: "bottom-right",
        }
      );
    },
  });

  const onSearch = (value: string) => {
    const shouldSearch = value === "" || isValidCPF(value);
    if (shouldSearch) {
      const numericValue = value.replace(/\D/g, "");
      setCpf(numericValue);
    }
  };

  const onRefresh = () => {
    openModal({
      message: "Tem certeza que deseja atualizar a listagem de admissões?",
      onConfirm: () => refetch(),
    });
  };

  const onUpdateRegistration = (registration: Registration) => {
    const message = `Tem certeza que deseja mover "${
      registration.employeeName
    }" para a coluna "${registrationStatusMap[registration.status]}"?`;

    openModal({
      message,
      onConfirm: () => updateRegistrationMutation(registration),
    });
  };

  const onDeleteRegistration = (registration: Registration) => {
    const message = `Tem certeza que deseja excluir "${registration.employeeName}"?`;

    openModal({
      message,
      onConfirm: () => deleteRegistrationMutation(registration.id),
    });
  };

  return {
    error: isError,
    loading: isLoading || isFetching,
    registrations: data,
    onDeleteRegistration,
    onUpdateRegistration,
    onSearch,
    onRefresh,
  };
};

export default useDashboardPage;
