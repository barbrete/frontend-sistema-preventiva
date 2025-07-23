'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";

export default function PaginaPrincipal() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const menuMargin = open ? "ml-80 md:ml-64 sm:ml-45" : "ml-20 md:ml-20 sm:ml-16";
    const headerPadding = "pt-24";

    return (
        <Auth>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-center mt-8 transition-all duration-300 ${menuMargin} ${headerPadding}`}>
                    <h1 className="text-3xl font-bold text-blue-700 mb-4">Sistema Preventiva</h1>
                    <p className="text-lg text-blue-900 mb-8 text-center">
                        Bem-vindo ao sistema de gestão preventiva da Giga+! Aqui você pode registrar, visualizar e acompanhar as preventivas de sua equipe.
                    </p>

                    <div className="flex gap-12">
                        <button
                            onClick={() => router.push("/criar_preventiva")}
                            className="mb-8 px-8 py-5 w-56 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white text-2xl font-bold shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
                        >
                            Criar Preventiva
                        </button>
                        <button
                            onClick={() => router.push("/equipe")}
                            className="mb-8 px-8 py-5 w-56 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white text-2xl font-bold shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
                        >
                            Equipe
                        </button>

                        <button
                            onClick={() => router.push("/mostrar_preventivas")}
                            className="mb-8 px-8 py-5 w-56 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white text-2xl font-bold shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
                        >
                            Preventiva
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        </Auth>
    );
}