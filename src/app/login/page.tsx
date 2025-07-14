"use client"

import React, { useState } from "react";
import Card from "../../components/Cards";
import Link from "next/link";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Login() {
   const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const result = await login(email, password);
        if (result)
            router.push('/pagina_principal');
    } catch (error) {
      alert("Erro ao fazer login");
    }
  }
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
            <Card titulo="Login" textoBotão="Fazer Login" onSubmit={() => handleLogin()}>
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <p className="flex items-center justify-center gap-2">
                    Não tem uma conta?
                    <Link href="/cadastro" className="text-blue-700 underline hover:text-blue-900">
                        Faça o Cadastro
                    </Link>
                </p>            
            </Card>

        </div>
    );
}