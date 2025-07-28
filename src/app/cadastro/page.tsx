"use client"

import React, { useState } from "react";
import Card from "../../components/Cards";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import Footer from "@/components/Footer";

export default function Cadastro() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState(""); // novo estado
  const [nome, setNome] = useState("");
  const [eyeIsOff, setEyeState] = useState(false);
  const [eyeConfirmIsOff, setEyeConfirmState] = useState(false); 

  async function handleRegister() {
    try {
      if (senha !== confirmarSenha) {
        alert("As senhas não conferem!");
        return;
      }
      const result = await register(email, nome, senha);
      if (result) {
        router.push('/login');
      }
    } catch (error) {
      alert("Erro ao fazer cadastro");
    }
  }


  return (
    <div className="min-h-screen flex flex-col flex-1 items-center justify-center bg-blue-100">
      <Card titulo="Cadastro"
        textoBotão="Fazer Login"
        legenda="Já tem uma conta?"
        rota="/login"
        onSubmit={() => handleRegister()}
      >
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
        <div className="relative">
          <input
            type={eyeIsOff ? "text" : "password"}
            placeholder="Senha"
            className="border p-6 rounded w-full"
            value={senha}
            onChange={e => setSenha(e.target.value)}
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
        <div className="relative">
          <input
            type={eyeConfirmIsOff ? "text" : "password"}
            placeholder="Confirmar Senha"
            className="border p-6 rounded w-full"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setEyeConfirmState(!eyeConfirmIsOff)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            tabIndex={-1}
          >
            {eyeConfirmIsOff ? <EyeClosed /> : <Eye />}
          </button>
        </div>
      </Card>
      <Footer/>
    </div>
  );
}