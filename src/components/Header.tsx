"use client"
import { getUsuario } from "@/services/auth";
import { salvarHorario, getHorario } from "@/utils/Horario";
import { Usuario } from "@/utils/Interfaces";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, UserPlus } from "lucide-react";

export function Header({ open }: { open: boolean }) {
  const [userInfo, setUserInfo] = useState<Usuario | null>(null);
  const ultimaVisita = getHorario("ultimaAcao");
  const menuMargin = open ? "ml-80 md:ml-64 sm:ml-45" : "ml-20 md:ml-20 sm:ml-16";

  useEffect(() => {
    getUsuario()
      .then((user: any) => {
        console.log("getUsuario retornou:", user);
        setUserInfo(user.usuario as Usuario);
      })
      .catch(() => setUserInfo(null));

  }, []);

  useEffect(() => {

    salvarHorario("ultimaAcao");
  }, []);

  if (!userInfo) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-30">
      <div className={`${menuMargin} transition-all duration-300`}>
        <div className="flex flex-col md:flex-row items-center justify-between bg-offWhite shadow-lg p-6 sm:p-1 md:p-4">
          <div>
            <p className="text-base md:text-md font-semibold break-words">
              Bem-vindo, <span className="text-deepNavy">{userInfo.nome}</span>!
              {userInfo.tipo === "ADMIN" && (
                <span className="ml-2 px-3 py-1 rounded-full border border-blue-400 bg-blue-100 text-blue-900 text-xs font-bold shadow-md">
                  ADMIN
                </span>
              )}
              {userInfo.tipo === "TECNICO" && (
                <span className="ml-2 px-3 md:px-2 py-1 rounded-full border border-blue-400 bg-blue-100 text-blue-900 text-xs font-bold shadow-md">
                  TÉCNICO
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600">{userInfo.email}</p>
          </div>

          <div className="mt-0">
            <span className="text-xs text-gray-500">Último acesso:</span>
            <p className="text-base md:text-sm text-gray-700">{ultimaVisita}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeaderCover() {
  return (
    <header className="top-0 w-full z-30 relative overflow-hidden">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src="/menu/logo.png"
              alt="Logo"
              width={50}
              height={40}
              className="relative z-10"
            />
            
          </div>
          <div>
            <h1 className="text-2xl font-bold text-offWhite tracking-tight drop-shadow-lg">
              Preventivas Giga+
            </h1>
            <div className="text-neonGreen text-sm font-medium">
              Sistema de Gestão de Preventivas
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}