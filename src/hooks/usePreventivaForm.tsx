import { getUsuario } from "@/services/auth";
import { atualizarPreventiva, criarPreventiva, enviarFotoPreventiva } from "@/services/preventivas";
import api from "@/utils/axios";
import { Foto, Preventiva, Usuario } from "@/utils/Interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PreventivaFormData {
  nome: string;
  tipo: string;
  kilometragem_percorrida: string; 
  irregularidades_encontradas: string;
  irregularidades_corrigidas: string;
  descricao: string;
  fotosAntes: { id?: number; file: File | null; descricao: string; url?: string }[];
  fotosDepois: { id?: number; file: File | null; descricao: string; url?: string }[];
  fotosPop: { id?: number; file: File | null; descricao: string; url?: string }[];
}

interface usePreventivaFormProps {
  initialForm: PreventivaFormData;
  setLoadingText: (text: string) => void;
  preventiva_id?: string
}

export function usePreventivaForm({ initialForm, setLoadingText, preventiva_id }: usePreventivaFormProps) {
  const [form, setForm] = useState<PreventivaFormData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userInfo, setUserInfo] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Carregar dados do usuário
  useEffect(() => {
    getUsuario()
      .then((user: any) => {
        setUserInfo(user.usuario as Usuario);
      })
      .catch(() => setUserInfo(null));
  }, []);

  // Carregar dados da preventiva (edição)
  useEffect(() => {
    if (preventiva_id) {
      setLoading(true);
      setLoadingText("Carregando dados da preventiva...");
      api.get<Preventiva>(`/preventivas/${preventiva_id}`)
        .then((res) => {
          const preventiva = res.data;

          console.log('📡 Dados carregados da API:', preventiva);
          console.log('📸 Fotos da API:', preventiva.fotos);

          const novoForm = {
            nome: preventiva.nome,
            tipo: preventiva.tipo,
            kilometragem_percorrida: preventiva.kilometragem_percorrida.toString(),
            irregularidades_encontradas: preventiva.irregularidades_encontradas.toString(),
            irregularidades_corrigidas: preventiva.irregularidades_corrigidas.toString(),
            descricao: preventiva.descricao,
            fotosAntes: preventiva.fotos?.filter(f => f.tipo === "ANTES").map(f => ({
              id: f.id, // ✅ INCLUIR ID
              file: null,
              descricao: f.descricao || "",
              url: f.url
            })) || [],
            fotosDepois: preventiva.fotos?.filter(f => f.tipo === "DEPOIS").map(f => ({
              id: f.id, // ✅ INCLUIR ID
              file: null,
              descricao: f.descricao || "",
              url: f.url
            })) || [],
            fotosPop: preventiva.fotos?.filter(f => f.tipo === "POP").map(f => ({
              id: f.id, // ✅ INCLUIR ID
              file: null,
              descricao: f.descricao || "",
              url: f.url
            })) || [],
          };

          setForm(novoForm);
        })
        .catch((err) => console.error("Erro ao carregar preventiva:", err))
        .then(() => setLoading(false));
    }
  }, [preventiva_id]);

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
    setLoadingText("Salvando preventiva...");

    try {
      console.log('🚀 Form antes de processar:', form);

      const payload = {
        nome: form.nome,
        tipo: form.tipo,
        kilometragem_percorrida: Number(form.kilometragem_percorrida),
        irregularidades_encontradas: Number(form.irregularidades_encontradas),
        irregularidades_corrigidas: Number(form.irregularidades_corrigidas),
        descricao: form.descricao,
        user_id: userInfo?.id || 0,
      };

      if (preventiva_id) {
        await api.put(`/preventivas/${preventiva_id}`, payload);

        // Enviar fotos
        const todasFotos = [
          ...form.fotosAntes.map(f => ({ ...f, tipo: "ANTES" })),
          ...form.fotosDepois.map(f => ({ ...f, tipo: "DEPOIS" })),
          ...form.fotosPop.map(f => ({ ...f, tipo: "POP" })),
        ];

        for (const foto of todasFotos) {
          if (foto.id && !foto.file && foto.url) {
            try {
              await api.put(`/fotos/${foto.id}`, {
                descricao: foto.descricao,
                tipo: foto.tipo,
                userId: userInfo?.id,
                preventiva_id: preventiva_id
              });
              console.log(`✅ Descrição da foto ${foto.id} atualizada`);
            } catch (err) {
              console.error(`❌ Erro ao atualizar foto ${foto.id}:`, err);
            }
          }
        }

        // ✅ 2. Enviar fotos novas
        for (const foto of todasFotos) {
          if (foto.file && !foto.id) {
            const fd = new FormData();
            fd.append("file", foto.file);
            fd.append("tipo", foto.tipo);
            fd.append("descricao", foto.descricao || "");
            fd.append("preventiva_id", String(preventiva_id));
            fd.append("userId", String(userInfo?.id || 0));
            await enviarFotoPreventiva(fd);
            console.log(`✅ Nova foto enviada`);
          }
        }

        alert("Preventiva criada com sucesso!");
        router.push(`/preventiva/${preventiva_id}`);
      }
    } catch (error) {
      console.error("Erro ao salvar preventiva:", error);
      alert("Erro ao salvar preventiva.");
    } finally {
      setLoading(false);
    }
  }

  if (!userInfo) {
    return { form, setForm, errors, handleSubmit, loading };
  }

  return { form, setForm, errors, handleSubmit, loading, userInfo };
}