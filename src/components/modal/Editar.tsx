import { ActivitySquare, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";

interface EditarProps {
    open: boolean;
    nomeInicial: string;
    emailInicial: string;
    tipoInicial?: string;
    ativoInicial?: boolean;
    onConfirm: (novoNome: string, novoEmail: string, novoTipo: string, ativo: boolean) => void;
    onCancel: () => void;
}

export default function Editar({
    open,
    nomeInicial,
    emailInicial,
    tipoInicial = "TECNICO",
    ativoInicial = true,
    onConfirm,
    onCancel,
}: EditarProps) {
    const [nome, setNome] = useState(nomeInicial);
    const [email, setEmail] = useState(emailInicial);
    const [tipo, setTipo] = useState(tipoInicial);
    const [ativo, setAtivo] = useState(ativoInicial);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Editar Técnico</h2>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={e => {
                        e.preventDefault();
                        onConfirm(nome, email, tipo, ativo);
                    }}
                >
                    <input
                        type="text"
                        className="border p-3 rounded w-full"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="Nome"
                        required
                    />
                    <input
                        type="email"
                        className="border p-3 rounded w-full"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="E-mail"
                        required
                    />
                    <select
                        className="border p-3 rounded w-full"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        required
                    >
                        <option value="TECNICO">Técnico</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-blue-900 font-medium mr-5">
                                Status do usuário
                            </span>

                            <button
                                type="button"
                                onClick={() => setAtivo(!ativo)}
                                className={`flex items-center justify-center gap-2 px-4 w-3/7 py-2 rounded-full font-semibold transition-colors duration-200
                                ${ativo
                                        ? "bg-green-100 text-green-700 border border-green-400"
                                        : "bg-red-100 text-red-700 border border-red-400"
                                    }`}
                            >
                                {ativo ? <CheckCircle size={18} className="text-green-600" /> : <XCircle size={18} className="text-red-600" />}

                                {ativo ? "Ativo" : "Desativado"}
                            </button>
                        </div>
                        <span className="text-xs text-gray-500">
                            Clique no botão para ativar ou desativar este usuário.
                        </span>
                    </div>
                    <div className="flex gap-6 mt-4 justify-center">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 rounded bg-gray-200 text-blue-900 font-semibold hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}