"use client"
import React from "react";
import Link from "next/link";

interface PropsCards {
    titulo: string;
    children: React.ReactNode;
    textoBotão: string;
    legenda: string;
    rota: string;
    onSubmit: () => void;
}

export default function Card({ titulo, children, textoBotão, legenda, rota, onSubmit }: PropsCards) {
    return (
        <div className="max-w-2xl w-full mx-auto min-h-[500px] md:min-h-[650px] bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">{titulo}</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="flex flex-col gap-6 flex-1"
            >
                {children}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-4 text-lg md:text-xl rounded hover:bg-blue-700 transition font-semibold mt-20"
                >
                    {textoBotão}
                </button>
                {legenda && rota && (
                    <p className="flex items-center justify-center gap-2 mt-4">
                        {legenda}
                        <Link href={rota} className="text-blue-700 underline hover:text-blue-900">
                            {rota === "/login" ? "Faça o Login" : "Faça o Cadastro"}
                        </Link>
                    </p>
                )}

            </form>
        </div>
    );
}

export function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number; }) {
    return (
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center gap-4">
            <div className="text-blue-600">{icon}</div>
            <div>
                <p className="text-sm font-semibold text-blue-800">{label}</p>
                <p className="text-sm text-gray-700">{value}</p>
            </div>
        </div>
    );
}