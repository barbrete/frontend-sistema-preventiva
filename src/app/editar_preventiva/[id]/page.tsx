"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/utils/axios";
import Input from "@/components/Input";
import Textarea from "@/components/TextArea";
import FotoUploader from "@/components/FotoUploader";
import LoadingOverlay from "@/components/Loading";
import Auth from "@/components/Auth";
import { Preventiva } from "@/utils/Interfaces";
import Menu from "@/components/Menu";
import { Header } from "@/components/Header";
import { FileText, Gauge, AlertTriangle, CheckCircle, StickyNote } from "lucide-react";
import Footer from "@/components/Footer";

export default function EditarPreventiva() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nome: "",
        tipo: "",
        kilometragem_percorrida: "",
        irregularidades_encontradas: "",
        irregularidades_corrigidas: "",
        descricao: "",
        fotosAntes: [] as { file: File, descricao: string }[],
        fotosDepois: [] as { file: File, descricao: string }[],
        fotosPop: [] as { file: File, descricao: string }[],
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get<Preventiva>(`/preventivas/${id}`)
                .then((res) => {
                    const preventiva = res.data;
                    setForm({
                        nome: preventiva.nome,
                        tipo: preventiva.tipo,
                        kilometragem_percorrida: preventiva.kilometragem_percorrida.toFixed(),
                        irregularidades_encontradas: preventiva.irregularidades_encontradas.toFixed(),
                        irregularidades_corrigidas: preventiva.irregularidades_corrigidas.toFixed(),
                        descricao: preventiva.descricao,
                        fotosAntes: preventiva.fotos
                            ?.filter((foto) => foto.tipo === "ANTES")
                            .map((foto) => ({
                                file: null, // Não há arquivo disponível, então defina como null
                                descricao: foto.descricao || "",
                                url: foto.url, // Adicionado
                            })) || [],
                        fotosDepois: preventiva.fotos
                            ?.filter((foto) => foto.tipo === "DEPOIS")
                            .map((foto) => ({
                                file: null,
                                descricao: foto.descricao || "",
                                url: foto.url,
                            })) || [],
                        fotosPop: preventiva.fotos
                            ?.filter((foto) => foto.tipo === "POP")
                            .map((foto) => ({
                                file: null,
                                descricao: foto.descricao || "",
                                url: foto.url,
                            })) || []
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Erro ao carregar preventiva:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (id) {
            setLoading(true);
            const payload = {
            ...form,
            kilometragem_percorrida: parseFloat(form.kilometragem_percorrida),
            irregularidades_encontradas: parseInt(form.irregularidades_encontradas, 10),
            irregularidades_corrigidas: parseInt(form.irregularidades_corrigidas, 10),
        };
            try {
                await api.put(`/preventivas/${id}`, payload);
                router.push(`/preventiva/${id}`)
                alert("Preventiva atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar preventiva:", error);
                alert("Erro ao atualizar preventiva.");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <Auth>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
                <LoadingOverlay show={loading} text="Atualizando preventiva..." />
                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main
                    className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch mt-8 transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"}`}
                >                    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-3xl bg-blue-50 shadow-2xl rounded-2xl p-10 space-y-6 border border-blue-200"
                        >
                            <h1 className="text-4xl font-bold text-blue-800 text-center mb-4">
                                Editar Preventiva
                            </h1>

                            <select
                                value={form.tipo}
                                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                                className="w-full border rounded-md p-2"
                                required
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="CTO">CTO</option>
                                <option value="POP">POP</option>
                            </select>

                            <Input
                                icon={<FileText />}
                                label="Nome"
                                name="nome"
                                value={form.nome}
                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                required
                            />

                            <Input
                                icon={<Gauge />}
                                label="Kilometragem Percorrida"
                                name="kilometragem_percorrida"
                                value={form.kilometragem_percorrida}
                                onChange={(e) => setForm({ ...form, kilometragem_percorrida: e.target.value })}
                                required
                                type="number"
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    icon={<AlertTriangle />}
                                    label="Irregularidades Encontradas"
                                    name="irregularidades_encontradas"
                                    value={form.irregularidades_encontradas}
                                    onChange={(e) => setForm({ ...form, irregularidades_encontradas: e.target.value })}
                                    required
                                    type="number"
                                />

                                <Input
                                    icon={<CheckCircle />}
                                    label="Irregularidades Corrigidas"
                                    name="irregularidades_corrigidas"
                                    value={form.irregularidades_corrigidas}
                                    onChange={(e) => setForm({ ...form, irregularidades_corrigidas: e.target.value })}
                                    required
                                    type="number"
                                />
                            </div>

                            <Textarea
                                icon={<StickyNote />}
                                label="Descrição Técnica"
                                name="descricao"
                                value={form.descricao}
                                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                                required />

                            {form.tipo === "CTO" && (
                                <>
                                    <FotoUploader
                                        fotos={form.fotosAntes}
                                        onChange={(files) => setForm({ ...form, fotosAntes: files })}
                                        label="Fotos Antes"
                                        qtdMaxFotos={5}
                                    />
                                    <FotoUploader
                                        fotos={form.fotosDepois}
                                        onChange={(files) => setForm({ ...form, fotosDepois: files })}
                                        label="Fotos Depois"
                                        qtdMaxFotos={5}
                                    />
                                </>
                            )}

                            {form.tipo === "POP" && (
                                <FotoUploader
                                    fotos={form.fotosPop}
                                    onChange={(files) => setForm({ ...form, fotosPop: files })}
                                    label="Fotos POP"
                                    qtdMaxFotos={15}
                                />
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-4 rounded-md"
                            >
                                Atualizar Preventiva
                            </button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </Auth>
    );
}