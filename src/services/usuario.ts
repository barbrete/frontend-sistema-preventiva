import api from "@/utils/axios";
import { Preventiva } from "@/utils/Interfaces";

export async function criarUsuario({ nome, email, tipo, ativo }: { nome: string; email: string; tipo: string; ativo: boolean }) {
  return api.post("/usuarios", { nome, email, tipo, ativo });
}

export async function editarUsuario(id: number, { nome, email, tipo, ativo }: { nome: string; email: string; tipo: string; ativo: boolean }) {
  return api.put(`/usuarios/${id}`, { nome, email, tipo, ativo });
}

export async function excluirUsuario(id: number) {
  return api.delete(`/usuarios/${id}`);
}

export async function buscarTecnicoPorId(tecnicoId: string | number) {
  return api.get(`/usuarios/${tecnicoId}`);
}

export async function buscarPreventivasPorTecnico(tecnicoId: string | number) {
  return api.get<Preventiva[]>(`/preventivas/usuario/${tecnicoId}`);
}