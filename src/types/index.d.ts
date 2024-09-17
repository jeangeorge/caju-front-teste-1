type RegistrationStatus = "APPROVED" | "REVIEW" | "REPROVED";

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
};
