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
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white rounded-md shadow p-3 sm:p-6 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center">{titulo}</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="flex flex-col gap-1 sm:gap-2 flex-1"
            >
                {children}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-1 sm:py-2 text-sm sm:text-base rounded hover:bg-blue-700 transition font-semibold mt-2"
                >
                    {textoBotão}
                </button>
                {legenda && rota && (
                    <p className="flex items-center justify-center gap-1 mt-1 text-xs sm:text-sm">
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
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="text-blue-600">{icon}</div>
            <div>
                <p className="text-sm sm:text-base font-semibold text-blue-800">{label}</p>
                <p className="text-sm sm:text-base text-gray-700">{value}</p>
            </div>
        </div>
    );
}