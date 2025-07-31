'use client'
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Auth from "@/components/Auth";
import { getUsuario } from "@/services/auth";
import { Usuario } from "@/utils/Interfaces";
import PainelEstatisticas from "@/components/Painel";
import { AcoesDashboard } from "@/components/Buttons";
import NotificacoesRecentes from "@/components/Notificacoes";
import GraficoPreventivas from "@/components/Graficos";
import GraficoArea from "@/components/Graficos";

export default function PaginaPrincipal() {
    const [open, setOpen] = useState(false);
    const menuMargin = open ? "ml-80 md:ml-60 sm:ml-45" : "ml-24 ";
    const headerPadding = "pt-24";
    const [userInfo, setUserInfo] = useState<Usuario | null>(null);

    useEffect(() => {
        getUsuario()
            .then((user: any) => {
                setUserInfo(user.usuario as Usuario);
            })
            .catch(() => setUserInfo(null));
    }, []);

    const [notificacoes, setNotificacoes] = useState<string[]>([
        "Preventiva #123 criada com sucesso.",
        "Equipe atualizada.",

    ]);

    return (
        <Auth>
            <div className="min-h-screen bg-gradient-to-b from-offWhite to-royalBlue flex flex-col">
                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main className={`flex-1 w-full max-w-7xl mx-auto p-4 transition-all duration-300  ${menuMargin} ${headerPadding}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-full flex flex-col md:flex-row md:justify-normal ">
                            {/* Esquerda: texto, botões, notificações */}
                            <div className="w-full md:w-[50rem] flex flex-col mb-4">
                                <div className="gap-2 bg-white rounded-xl p-4">
                                    <h1 className="text-3xl font-bold text-deepNavy mb-2">Preventivas Giga+</h1>
                                    <p className="text-md text-navyBlue mb-2 ">
                                        Bem-vindo ao sistema de gestão preventiva da Giga+!<br />
                                        Aqui você pode registrar, visualizar e acompanhar as preventivas de sua equipe.
                                    </p>
                                </div>

                                <div className="mt-6 bg bg-white rounded-xl p-4">
                                    <h2 className="text-xl font-bold text-deepNavy mb-4">Botões de ação</h2>
                                    <AcoesDashboard userInfo={userInfo} />
                                </div>

                                <div className="mt-6 w-full">
                                    <NotificacoesRecentes notificacoes={notificacoes} />
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 md:mr-8 md:ml-8 flex-shrink-0 flex flex-col gap-6 bg-white p-4 rounded-xl">
                                <PainelEstatisticas />
                                <GraficoArea />
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </Auth>
    );
}
