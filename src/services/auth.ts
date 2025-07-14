import api, { axios } from "@/utils/axios";

export async function login(email: string, senha: string) {
  const response = await api.post("/auth/login", { email, senha});
  return response.data;
}

export async function register(email: string, nome: string, senha: string) {
  let tipo = 'TECNICO'
  const response = await api.post("/auth/register", { email, nome, senha, tipo });
  return response.data;
}
