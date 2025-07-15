import api, { axios } from "@/utils/axios";
import {Usuario} from "@/utils/Interfaces"

export async function login(email: string, senha: string) {
  const response = await api.post("/auth/login", { email, senha});
  return response.data;
}

export async function register(email: string, nome: string, senha: string) {
  let tipo = 'TECNICO'
  const response = await api.post("/auth/register", { email, nome, senha, tipo });
  return response.data;
}

export async function getUsuario() {
  const response = await api.get("auth/usuario", { withCredentials: true });
  return response.data;
}