import { getUsuario } from "@/services/auth";
import { criarPreventiva, enviarFotoPreventiva } from "@/services/preventivas";
import { Usuario } from "@/utils/Interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function usePreventivaForm(initialForm, setLoadingText: (text: string) => void) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userInfo, setUserInfo] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUsuario()
      .then((user: any) => {
        setUserInfo(user.usuario as Usuario);
      })
      .catch(() => setUserInfo(null));

  }, []);

  if (!userInfo) return null;
  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    if (!form.kilometragem_percorrida) newErrors.kilometragem_percorrida = "Kilometragem é obrigatória";
    if (!form.descricao) newErrors.descricao = "Descrição é obrigatória";
    if (!form.tipo) newErrors.tipo = "Tipo é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // 1. Envia os dados da preventiva (sem fotos)
      setLoadingText("Enviando dados...");
      const preventivaRes = await criarPreventiva({
        nome: form.nome,
        kilometragem_percorrida: Number(form.kilometragem_percorrida),
        irregularidades_encontradas: Number(form.irregularidades_encontradas),
        irregularidades_corrigidas: Number(form.irregularidades_corrigidas),
        descricao: form.descricao,
        userId: userInfo.id,
        tipo: form.tipo
      }
      );

      const preventivaId = (preventivaRes as { id: number }).id;

      if (!preventivaId || isNaN(Number(preventivaId))) {
        throw new Error(`ID da preventiva inválido: ${preventivaId}`);
      }
      // 2. Envie as fotos "Antes"
      setLoadingText("Enviando fotos...");
      if (form.tipo === "CTO") {
        for (const foto of form.fotosAntes) {
          const fd = new FormData();
          fd.append("file", foto.file);
          fd.append("tipo", "ANTES");
          fd.append("descricao", foto.descricao || "");
          fd.append("preventiva_id", String(preventivaId));
          fd.append("userId", String(userInfo.id));
          await enviarFotoPreventiva(fd);
        }

        // 3. Envie as fotos "Depois"
        setLoadingText("Finalizando...");
        for (const foto of form.fotosDepois) {
          const fd = new FormData();
          fd.append("file", foto.file);
          fd.append("tipo", "DEPOIS");
          fd.append("descricao", foto.descricao || "");
          fd.append("preventiva_id", String(preventivaId));
          fd.append("userId", String(userInfo.id));

          await enviarFotoPreventiva(fd);
        }
      }
      else if (form.tipo === "POP") {
        // Envia fotosPop
        for (const foto of form.fotosPop) {
          const fd = new FormData();
          fd.append("file", foto.file);
          fd.append("tipo", "POP");
          fd.append("descricao", foto.descricao || "");
          fd.append("preventiva_id", String(preventivaId));
          fd.append("userId", String(userInfo.id));
          await enviarFotoPreventiva(fd);
        }
      }

      alert("Preventiva criada com sucesso!");
      router.push(`/preventiva/${preventivaId}`);
    } catch (err: any) {
      console.log("Erro ao salvar preventiva:", err?.response?.data || err);
      setLoadingText("Erro ao enviar!");
    } finally {
      setLoadingText("Enviando preventiva...");
      setLoading(false);
    }
  }
  return { form, setForm, errors, handleSubmit, loading };
}