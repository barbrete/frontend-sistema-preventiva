"use client"

import React, { useState } from "react";
import Card from "../../components/Cards";
import Link from "next/link";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  async function handleRegister() {
    try {
      const result = await register(email, nome, senha);
      if(result){
        router.push('/login');
      }
    } catch (error) {
      alert("Erro ao fazer cadastro");
    }
  }
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
            <Card titulo="Cadastro" textoBotão="Fazer Cadastro" onSubmit={() => handleRegister()}>
                <input
                    type="name"
                    placeholder="Nome"
                    className="border p-6 rounded"
                    value={nome}          
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    className="border p-6 rounded"
                    value={email}          
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="border p-6 rounded mb-10"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />
                <p className="flex items-center justify-center gap-2">
                    Já tem uma conta?
                    <Link href="/cadastro" className="text-blue-700 underline hover:text-blue-900">
                        Faça o Login
                    </Link>
                </p>            
            </Card>

        </div>
    );
}