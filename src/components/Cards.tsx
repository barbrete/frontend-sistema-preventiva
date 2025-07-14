"use client"
import React from "react";

interface PropsCards {
    titulo: string;
    children: React.ReactNode;
    textoBotão: string;
    onSubmit: () => void;
}

export default function Card({ titulo, children, textoBotão, onSubmit }: PropsCards) {
    return (
        <div className="max-w-2xl w-full mx-auto min-h-[500px] md:min-h-[650px] bg-white rounded-lg shadow-md p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{titulo}</h2>
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
                    className="bg-blue-600 text-white py-4 text-lg md:text-xl rounded hover:bg-blue-700 transition font-semibold mb-30"
                >
                    {textoBotão}
                </button>
            </form>
        </div>
    );
}