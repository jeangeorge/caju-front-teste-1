import { api } from "./api";

export const getRegistrations = async (
  cpf: string
): Promise<Registration[]> => {
  const { data } = await api.get("/registrations", {
    params: { cpf },
  });

  return data;
};

export const createRegistration = async (
  registration: Omit<Registration, "id">
) => {
  await api.post("/registrations/", registration);
};

export const updateRegistration = async (registration: Registration) => {
  await api.put(`/registrations/${registration.id}`, registration);
};

export const deleteRegistration = async (id: string) => {
  await api.delete(`/registrations/${id}`);
};
