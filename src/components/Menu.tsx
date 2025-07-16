"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, ClipboardList, Calendar, User, PanelRightOpen, List, LogOut, Users, Users2, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/auth"; 
import ConfirmacaoSair from "./modal/ConfirmacaoSair";

export default function Menu({ open, setOpen }) {
    const router = useRouter();
    const [modalSair, setModalSair] = useState(false);
    const sizeIcon = 35

    async function handleLogout() {
        await logOut();
        router.push("/login");
    }

    return (
        <nav
            className={`fixed top-0 left-0 h-full bg-blue-800 text-white shadow-lg z-40 transition-all duration-300 
                ${open ? "w-80 md:w-64 sm:w-45 " : "w-20 md:w-20 sm:w-16"} 
                flex flex-col`}
        >

            <div className="mx-auto flex justify-center items-center mt-8 mb-20 gap-5 md:gap-4 sm:gap-3 ">
                <Link href="/pagina_principal">
                    <img
                        src="/menu/logo.png"
                        alt="Logo Preventiva"
                        className="h-10 md:h-9 sm:h-8 w-auto"
                    />
                </Link>
            </div>

            <button
                className={`absolute ${open ? "right-[-18px]" : "right-[-18px]"} top-20
              bg-blue-700 text-white rounded-full p-2 shadow-lg focus:outline-none transition-all duration-300 z-50`}
                onClick={() => setOpen(!open)}
                style={{ transition: "right 0.3s" }}
            >
                {open ? <PanelRightOpen size={sizeIcon} /> : <List size={sizeIcon} />}
            </button>


            <ul className="flex flex-col gap-8 pl-2">
                <div>
                    {open ? (<p className="pl-4 mb-2">Principal</p>) : (<div className="h-7" />)}

                    <li className="hover:bg-white transition-colors py-4 hover:text-blue-800">
                        <Link
                            href="/pagina_principal"
                            className="flex items-center gap-10 font-semibold text-2xl pl-2"
                        >
                            <Home size={sizeIcon} className="" />
                            {open && <span>Início</span>}
                        </Link>
                    </li>
                </div>
                <li className="hover:bg-white transition-colors py-4 hover:text-blue-800">
                    <Link
                        href="/preventivas"
                        className="flex items-center gap-10 font-semibold text-2xl pl-2"
                    >
                        <ClipboardList size={sizeIcon} />
                        {open && <span>Preventivas</span>}
                    </Link>
                </li>
                <li className="hover:bg-white transition-colors py-4 hover:text-blue-800">
                    <Link
                        href="/visitas"
                        className="flex items-center gap-10 font-semibold text-2xl pl-2"
                    >
                        <Users2 size={sizeIcon} />
                        {open && <span>Equipe</span>}
                    </Link>
                </li>
                <li className="hover:bg-white transition-colors py-4 hover:text-blue-800">
                    <Link
                        href="/perfil"
                        className="flex items-center gap-10  font-semibold text-2xl pl-2"
                    >
                        <User size={sizeIcon} />
                        {open && <span>Perfil</span>}
                    </Link>
                </li>

                <div className="mt-20">
                    {open ? (<p className="pl-3 mb-2">Conta</p>) : (<div className=" h-5" />)}

                    <li className="hover:bg-white transition-colors py-4 hover:text-blue-800">
                        <button
                            onClick={() => setModalSair(true)}
                            className="flex items-center gap-10  font-semibold text-2xl pl-2"
                        >
                            <LogOut size={sizeIcon} />
                            {open && <span>Sair</span>}
                        </button>
                    </li>
                </div>
            </ul>
            <ConfirmacaoSair
                open={modalSair}
                onConfirm={() => {
                    setModalSair(false);
                    handleLogout();
                }}
                onCancel={() => setModalSair(false)}
            />
        </nav>
    );
}
