"use client";
import { useState } from "react";
import { FileText, Gauge, AlertTriangle, CheckCircle, StickyNote } from "lucide-react";
import Input from "@/components/Input";
import Textarea from "@/components/TextArea";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Menu from "@/components/Menu";
import FotoUploader from "@/components/FotoUploader";
import { usePreventivaForm } from "@/hooks/usePreventivaForm";
import LoadingOverlay from "@/components/Loading";
import Auth from "@/components/Auth";

export default function CreatePreventiva() {
    const [loadingText, setLoadingText] = useState("Enviando preventiva...");
    const [open, setOpen] = useState(false);
    const headerPadding = "pl-24";
    const hookResult = usePreventivaForm({
        nome: "",
        tipo: "",
        kilometragem_percorrida: "",
        irregularidades_encontradas: "",
        irregularidades_corrigidas: "",
        descricao: "",
        fotosAntes: [] as { file: File, descricao: string }[],
        fotosDepois: [] as { file: File, descricao: string }[],
        fotosPop: [] as { file: File, descricao: string }[],
    }, setLoadingText);

    if (!hookResult) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-lg text-gray-600">Carregando usuário...</span>
            </div>
        );
    }

    const { form, setForm, errors, handleSubmit, loading } = hookResult;

    return (
        <Auth>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
                <LoadingOverlay show={loading} text={loadingText} />
                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main
                    className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch mt-8 transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"} ${headerPadding}`}
                >
                    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-3xl bg-blue-50 shadow-2xl rounded-2xl p-10 space-y-6 border border-blue-200"
                        >
                            <h1 className="text-4xl font-bold text-blue-800 text-center mb-4">
                                Criar Preventiva
                            </h1>

                            <select
                                value={form.tipo}
                                onChange={e => setForm({ ...form, tipo: e.target.value })}
                                className="w-full border rounded-md p-2"
                                required
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="CTO">REDE</option>
                                <option value="POP">POP</option>
                            </select>

                            <Input
                                icon={<FileText />}
                                label="Nome da Rota"
                                name="nome"
                                value={form.nome}
                                onChange={e => setForm({ ...form, nome: e.target.value })}
                                error={errors.nome}
                                required
                            />

                            <Input
                                icon={<Gauge />}
                                label="Kilometragem Percorrida"
                                name="kilometragem_percorrida"
                                value={form.kilometragem_percorrida}
                                onChange={e => setForm({ ...form, kilometragem_percorrida: e.target.value })}
                                error={errors.kilometragem_percorrida}
                                required
                                type="number"
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    icon={<AlertTriangle />}
                                    label="Irregularidades Encontradas"
                                    name="irregularidades_encontradas"
                                    value={form.irregularidades_encontradas}
                                    onChange={e => setForm({ ...form, irregularidades_encontradas: e.target.value })}
                                    error={errors.irregularidades_encontradas}
                                    required
                                    type="number"
                                />

                                <Input
                                    icon={<CheckCircle />}
                                    label="Irregularidades Corrigidas"
                                    name="irregularidades_corrigidas"
                                    value={form.irregularidades_corrigidas}
                                    onChange={e => setForm({ ...form, irregularidades_corrigidas: e.target.value })}
                                    error={errors.irregularidades_corrigidas}
                                    required
                                    type="number"
                                />
                            </div>

                            <Textarea
                                icon={<StickyNote />}
                                label="Descrição Técnica"
                                name="descricao"
                                value={form.descricao}
                                onChange={e => setForm({ ...form, descricao: e.target.value })}
                                required
                            />

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
                                <>
                                    <FotoUploader
                                        fotos={form.fotosPop || []}
                                        onChange={(files) => setForm({ ...form, fotosPop: files })}
                                        label="Fotos POP"
                                        qtdMaxFotos={15}
                                    />
                                </>
                            )}

                            {/* Linha divisória final */}
                            <div className="flex items-center justify-center mb-12">
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-4 rounded-md"
                                onClick={e => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }}
                            >
                                Salvar Preventiva
                            </button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </Auth>
    );
}
