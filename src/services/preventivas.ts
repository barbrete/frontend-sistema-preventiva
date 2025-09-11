import api, { apiUpload } from "@/utils/axios";
import { Preventiva } from "@/utils/Interfaces"

export async function fetchPreventivas(): Promise<Preventiva[]> {
    const { data } = await api.get<Preventiva[]>("/preventivas");
    return data;
}

export async function criarPreventiva(dados: any) {
  const response = await api.post("/preventivas", dados); 
  return response.data;
}

export async function atualizarPreventiva(dados: Preventiva) {
  const response = await api.put(`/preventivas/${dados.id}`, dados); 
  return response.data;
}

export async function enviarFotoPreventiva(fd: FormData) {
  const response = await apiUpload.post("/fotos", fd, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
}

export async function deletePreventiva(id: number): Promise<void> {
    await api.delete(`/preventivas/${id}`);
}