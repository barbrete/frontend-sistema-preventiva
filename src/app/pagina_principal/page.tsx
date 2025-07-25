'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import api from "@/utils/axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// Troque os ícones do react-icons pelos do lucide-react
import { ClipboardList, UserCheck, UserX, Users } from "lucide-react";

export default function PaginaPrincipal() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const [estatisticas, setEstatisticas] = useState({
        preventivas: 0,
        usuariosAtivos: 0,
        usuariosInativos: 0,
        totalUsuarios: 0
    });

    useEffect(() => {
        async function fetchEstatisticas() {
            try {
                const [resPreventivas, resUsuarios] = await Promise.all([
                    api.get("/preventivas/stats"),
                    api.get("/usuarios/stats"),
                ]);

                setEstatisticas({
                    preventivas: (resPreventivas.data as { total: number }).total || 0,
                    usuariosAtivos: (resUsuarios.data as {active: number}).active || 0,
                    usuariosInativos: (resUsuarios.data as {inactive: number}).inactive || 0,
                    totalUsuarios: (resUsuarios.data as {total: number}).total || 0,
                });
            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
            }
        }

        fetchEstatisticas();
    }, []);

    // Dados para o gráfico
    const data = [
        { name: "Preventivas", value: estatisticas.preventivas },
        { name: "Ativos", value: estatisticas.usuariosAtivos },
        { name: "Desligados", value: estatisticas.usuariosInativos },
        { name: "Total", value: estatisticas.totalUsuarios },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
            <Menu open={open} setOpen={setOpen} />
            <Header open={open} />
            <main className="flex-1 w-full max-w-5xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Dashboard Preventiva</h1>
                
                {/* Cards de estatísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <CardEstatistica label="Preventivas" valor={estatisticas.preventivas} color="from-green-400 to-green-600" icon={<ClipboardList size={28} />} />
                    <CardEstatistica label="Usuários Ativos" valor={estatisticas.usuariosAtivos} color="from-blue-400 to-blue-600" icon={<UserCheck size={28} />} />
                    <CardEstatistica label="Usuários Desligados" valor={estatisticas.usuariosInativos} color="from-red-400 to-red-600" icon={<UserX size={28} />} />
                    <CardEstatistica label="Total de Usuários" valor={estatisticas.totalUsuarios} color="from-purple-400 to-purple-600" icon={<Users size={28} />} />
                </div>

                {/* Gráfico de barras */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h2 className="text-xl font-bold mb-4 text-blue-700">Resumo Visual</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Botões de navegação */}
                <div className="flex gap-8 justify-center mb-8">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition" onClick={() => router.push("/criar_preventiva")}>Criar Preventiva</button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition" onClick={() => router.push("/equipe")}>Equipe</button>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition" onClick={() => router.push("/mostrar_preventivas")}>Preventivas</button>
                </div>

                
                <footer className="mt-auto py-4 text-blue-900 text-sm">
                    &copy; {new Date().getFullYear()} Preventiva. Todos os direitos reservados.
                </footer>
            </main>
            <Footer />
        </div>
    );
}

// Card de estatística com ícone
function CardEstatistica({ label, valor, color, icon }: { label: string; valor: string | number; color: string; icon: React.ReactNode }) {
    return (
        <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform hover:scale-105`}>
            <div className="mb-2">{icon}</div>
            <span className="text-2xl font-bold">{valor}</span>
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}