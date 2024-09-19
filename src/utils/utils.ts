import { formatCPF, isValidCPF } from "@brazilian-utils/brazilian-utils";

export const isValidCpf = (value: string) => isValidCPF(value);

export const formatCpf = (value: string) => formatCPF(value);
