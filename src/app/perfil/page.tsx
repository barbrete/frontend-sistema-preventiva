'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingOverlay from "@/components/Loading";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import api from "@/utils/axios";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import TabelaPreventivas from "@/components/Tabela";


export default function PerfilTecnico() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tecnicoId = searchParams.get("id");
    const [open, setOpen] = useState(false);
    const headerPadding = "pt-24";

    const [tecnico, setTecnico] = useState<any>(null);
    const [preventivas, setPreventivas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const resTec = await api.get(`/usuarios/${tecnicoId}`);
                setTecnico(resTec.data);
                // const resPrev = await api.get(`/preventivas?tecnicoId=${tecnicoId}`);
                // setPreventivas(resPrev.data as any[]);
            } catch {
                setTecnico(null);
                // setPreventivas([]);
            }
            setLoading(false);
        }
        if (tecnicoId) fetchData();
    }, [tecnicoId]);

    useEffect(() => {
    // Dados fakes para teste visual
    const preventivasFake = [
        {
            id: 1,
            nome: "Preventiva A",
            kilometragem_percorrida: 120,
            irregularidades_encontradas: 2,
            irregularidades_corrigidas: 2,
            created_at: new Date().toISOString(),
        },
        {
            id: 2,
            nome: "Preventiva B",
            kilometragem_percorrida: 80,
            irregularidades_encontradas: 1,
            irregularidades_corrigidas: 1,
            created_at: new Date().toISOString(),
        },
        {
            id: 3,
            nome: "Preventiva C",
            kilometragem_percorrida: 200,
            irregularidades_encontradas: 3,
            irregularidades_corrigidas: 2,
            created_at: new Date().toISOString(),
        },
        {
            id: 4,
            nome: "Preventiva D",
            kilometragem_percorrida: 10,
            irregularidades_encontradas: 5,
            irregularidades_corrigidas: 2,
            created_at: new Date().toISOString(),
        },
        {
            id: 5,
            nome: "Preventiva E",
            kilometragem_percorrida: 344,
            irregularidades_encontradas: 1,
            irregularidades_corrigidas: 1,
            created_at: new Date().toISOString(),
        },
        {
            id: 6,
            nome: "Preventiva F",
            kilometragem_percorrida: 230,
            irregularidades_encontradas: 7,
            irregularidades_corrigidas: 2,
            created_at: new Date().toISOString(),
        },
    ];
    setPreventivas(preventivasFake);
    setLoading(false);
}, []);

    if (loading) return <LoadingOverlay show={true} text="Carregando perfil..." />;

    if (!tecnico) return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow mt-20">
            <h2 className="text-2xl font-bold text-red-700">Técnico não encontrado</h2>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
            <Menu open={open} setOpen={setOpen} />
            <Header open={open} />
            <main className={`flex-1 w-full flex flex-col items-center justify-center ${headerPadding}`}>
                <div className="max-w-6xl w-full mx-auto bg-white rounded-2xl shadow-2xl p-10 mt-8">
                    <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl ml-5 text-blue-700 mb-2">{tecnico.name}</h2>
                            <span className={`px-4 py-2 rounded-full text-lg font-semibold ${tecnico.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {tecnico.ativo ? "Ativo" : "Desativado"}
                            </span>
                        </div>
                    </div>
                    <div className="flex-col gap-6 mb-8 items-center justify-center">
                        <p><b>E-mail:</b> {tecnico.email}</p>
                        <p><b>Tipo:</b> {tecnico.tipo}</p>
                    </div>
                    <hr className="my-8" />
                    <h3 className="text-4xl font-extrabold mb-8 text-blue-700 text-center">Preventivas realizadas</h3>
                    {preventivas.length === 0 ? (
                        <p className="text-gray-500 text-center text-lg">Nenhuma preventiva realizada.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <TabelaPreventivas
                                preventivas={preventivas}
                                onRowClick={(id) => router.push(`/preventiva/${id}`)}
                            />
                        </div>
                    )}
                    <div className="flex gap-4 mt-12 justify-center">
                        <button
                            className="flex items-center gap-2 px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-lg"
                            onClick={() => router.push(`/equipe?modo=editar&id=${tecnico.id}`)}
                        >
                            <Pencil size={22} /> Editar
                        </button>
                    </div>
                </div>
            </main>
            <div className="mb-20" />
            <Footer />
        </div>
    );
}