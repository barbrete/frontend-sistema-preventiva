"use client"
import { getUsuario } from "@/services/auth";
import { getUltimaVisita, salvarAcesso } from "@/utils/Horario";
import { Usuario } from "@/utils/Interfaces";
import { Shield } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Header({ open }: { open: boolean }) {
  const [userInfo, setUserInfo] = useState<Usuario | null>(null);

  useEffect(() => {
    getUsuario()
      .then((user: any) => {
        setUserInfo(user.usuario as Usuario);
      })
      .catch(() => setUserInfo(null));
  }, []);

  if (!userInfo) return null;

  salvarAcesso();
  const ultimaVisita = getUltimaVisita();

  const menuMargin = open ? "ml-80 md:ml-64 sm:ml-45" : "ml-20 md:ml-20 sm:ml-16";

  return (
    <header className="fixed top-0 left-0 w-full z-30">
      <div className={`${menuMargin} transition-all duration-300`}>
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/90  shadow-lg p-6">
          <div>
            <p className="text-lg font-semibold text-blue-800">
              Bem-vindo, {userInfo.nome}!
              {userInfo.tipo === "ADMIN" && (
                <span className="ml-2 px-3 py-1 rounded-full border border-blue-400 bg-blue-100 text-blue-900 text-xs font-bold shadow-md">
                  ADMIN
                </span>
              )}
            </p>            
            <p className="text-sm text-gray-600">{userInfo.email}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Último acesso:</span>
            <p className="text-base text-gray-700">{ultimaVisita}</p>
          </div>
        </div>
      </div>
    </header>
  );
}