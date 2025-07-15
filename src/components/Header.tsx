"use client"
import { getUsuario } from "@/services/auth";
import { getUltimaVisita, salvarAcesso } from "@/utils/Horario";
import { Usuario } from "@/utils/Interfaces";
import React, { useEffect, useState } from "react";
 
export default function Header() {
const [userInfo, setUserInfo] = useState<Usuario | null>(null);  useEffect(() => {
  getUsuario()
    .then((user: any) => {
      console.log("Usuário retornado:", user);
      setUserInfo(user.usuario as Usuario);
    })
    .catch((err) => {
      console.error("Erro ao buscar usuário:", err);
      setUserInfo(null);
    });
}, []);

  if (!userInfo) return;
  salvarAcesso();
  const ultimaVisita = getUltimaVisita();

  return (
    <div className="max-h-xl w-full mx-auto bg-gray-300 shadow-md p-6">
      <div>
      <p>Bem Vindo {userInfo.nome}!</p>
      <p>{userInfo.email}</p>
      </div>
      
      <div>
        <p>{ultimaVisita}</p>
      </div>
    </div>
  );
}