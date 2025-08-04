"use client"

import React, { useState } from "react";
import Card from "../../components/Cards/Cards";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import Footer from "@/components/Footer";

export default function Login() {
    const router = useRouter();
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
        <div className="min-h-screen flex flex-col bg-blue-100">
            <div className="flex flex-1 items-center justify-center px-2">
                <Card
                    titulo="Login"
                    textoBotão="Fazer Login"
                    legenda="Não tem uma conta?"
                    rota="/cadastro"
                    onSubmit={() => handleLogin()}
                >
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="border p-3 sm:p-4 rounded text-sm sm:text-base w-full"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <div className="relative">
                        <input
                            type={eyeIsOff ? "text" : "password"}
                            placeholder="Senha"
                            className="border p-3 sm:p-4 rounded w-full text-sm sm:text-base"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setEyeState(!eyeIsOff)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            tabIndex={-1}
                        >
                            {eyeIsOff ? <EyeClosed className="w-5 h-5 sm:w-6 sm:h-6" /> : <Eye className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
}