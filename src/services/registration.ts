import { api } from "./api";

export const getRegistrations = async (
  cpf: string
): Promise<Registration[]> => {
  const { data } = await api.get("/registrations", {
    params: { cpf },
  });

  return data;
};
