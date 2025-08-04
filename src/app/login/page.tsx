"use client"

import React, { useState } from "react";
import Card from "../../components/Cards/Cards";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eyeIsOff, setEyeState] = useState(false);

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
            <Card titulo="Login"
                textoBotão="Fazer Login"
                legenda="Não tem uma conta?"
                rota="/cadastro"
                onSubmit={() => handleLogin()}
            >
                <input
                    type="email"
                    placeholder="E-mail"
                    className="border p-6 rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <div className="relative">
                    <input
                        type={eyeIsOff ? "text" : "password"}
                        placeholder="Senha"
                        className="border p-6 rounded w-full"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setEyeState(!eyeIsOff)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        tabIndex={-1}
                    >
                        {eyeIsOff ? <EyeClosed /> : <Eye />}
                    </button>
                </div>
            </Card>

        </div>
    );
}