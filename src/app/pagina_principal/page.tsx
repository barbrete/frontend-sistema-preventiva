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
import { ArrowBigUpDash, Pointer } from "lucide-react";

export default function PaginaPrincipal() {
    const [open, setOpen] = useState(false);
    const menuMargin = open ? "ml-80 md:ml-60 sm:ml-45" : "ml-16 md:ml-24";
    const headerPadding = "pt-20 md:pt-24";
    const [userInfo, setUserInfo] = useState<Usuario | null>(null);

    useEffect(() => {
        getUsuario()
            .then((user: any) => {
                setUserInfo(user.usuario as Usuario);
            })
            .catch(() => setUserInfo(null));
    }, []);

    const [notificacoes, setNotificacoes] = useState<string[]>([]);

    return (
        <Auth>
            <div className="min-h-screen bg-gradient-to-b from-offWhite to-royalBlue flex flex-col">
                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main className={`flex-1 w-[95%] md:w-[92%]  px-16 sm:px-6 lg:px-8 py-4 md:py-6 transition-all duration-300 ${menuMargin} ${headerPadding}`}>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Hero Section */}
                        <motion.div 
                            className="relative overflow-hidden bg-gradient-to-br from-deepNavy via-lightDeepNavy to-royalBlue rounded-2xl md:rounded-3xl p-6 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            
                            <div className="relative z-10">
                                <motion.h1 
                                    className=" font-bold text-white mb-3 md:mb-4 text-5xl md:text-3xl sm:text-2xl"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Preventivas <span className="text-neonGreen">Giga+</span>
                                </motion.h1>
                                <motion.p 
                                    className=" text-white/90 max-w-xl"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Bem-vindo ao sistema de gestão preventiva da Giga+! <br className="" />
                                    Aqui você pode registrar, visualizar e acompanhar as preventivas
                                    de sua equipe de forma eficiente e organizada.
                                </motion.p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                            <div className="lg:col-span-2 space-y-4 md:space-y-6">
                                <motion.div 
                                    className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                    <ArrowBigUpDash size={30} className="text-deepNavy"/>
                                        <h2 className="text-xl font-bold text-deepNavy">Ações Rápidas</h2>
                                    </div>
                                    <AcoesDashboard userInfo={userInfo} />
                                </motion.div>

                                {/* Notifications Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 }}
                                >
                                    <NotificacoesRecentes notificacoes={notificacoes} />
                                </motion.div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {/* Stats Panel */}
                                <motion.div 
                                    className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <PainelEstatisticas userInfo={userInfo}/>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </Auth>
    );
}
