"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";
import Textarea from "@/components/TextArea";
import FotoUploader from "@/components/FotoUploader";
import LoadingOverlay from "@/components/Loading";
import Auth from "@/components/Auth";
import { Usuario } from "@/utils/Interfaces";
import Menu from "@/components/Menu";
import { Header } from "@/components/Header";
import { FileText, Gauge, AlertTriangle, CheckCircle, StickyNote } from "lucide-react";
import Footer from "@/components/Footer";
import { usePreventivaForm } from "@/hooks/usePreventivaForm";


export default function EditarPreventiva() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [loadingText, setLoadingText] = useState("Carregando...");

    const initialForm = {
        nome: "",
        tipo: "",
        kilometragem_percorrida: "",
        irregularidades_encontradas: "",
        irregularidades_corrigidas: "",
        descricao: "",
        fotosAntes: [],
        fotosDepois: [],
        fotosPop: [],
    };

    const hookResult = usePreventivaForm({
        initialForm,
        setLoadingText,
        preventiva_id: id as string,
    });

    if (!hookResult.userInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-lg text-gray-600">Carregando usuário...</span>
            </div>
        );
    }

    const { form, setForm, handleSubmit, loading } = hookResult;

    // ✅ Log 4: Função personalizada para monitorar mudanças nas fotos
    const handleFotosChange = (tipo: 'fotosAntes' | 'fotosDepois' | 'fotosPop', novasFotos: any[]) => {
        console.log(`🖼️ ${tipo} alteradas:`, novasFotos);
        setForm({ ...form, [tipo]: novasFotos });
    };

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
                                        onChange={(files) => {
                                            console.log('📤 FotoUploader onChange - fotosAntes:', files);
                                            handleFotosChange('fotosAntes', files);
                                        }}
                                        label="Fotos Antes"
                                        qtdMaxFotos={5}
                                    />
                                    <FotoUploader
                                        fotos={form.fotosDepois}
                                        onChange={(files) => {
                                            console.log('📤 FotoUploader onChange - fotosDepois:', files);
                                            handleFotosChange('fotosDepois', files);
                                        }}
                                        label="Fotos Depois"
                                        qtdMaxFotos={5}
                                    />
                                </>
                            )}

                            {form.tipo === "POP" && (
                                <FotoUploader
                                    fotos={form.fotosPop}
                                    onChange={(files) => {
                                        console.log('📤 FotoUploader onChange - fotosPop:', files);
                                        handleFotosChange('fotosPop', files);
                                    }}
                                    label="Fotos POP"
                                    qtdMaxFotos={15}
                                />
                            )}


                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-4 rounded-md"
                                disabled={loading}
                            >
                                {loading ? "Atualizando..." : "Atualizar Preventiva"}
                            </button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </Auth>
    );
}