import React, { useState } from "react";
import { Search } from "lucide-react";

interface BuscaProps {
  onBuscar: (termo: string) => void;
  placeholder?: string;
}

export default function Busca({ onBuscar, placeholder = "Buscar..." }: BuscaProps) {
  const [termo, setTermo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onBuscar(termo);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4 w-full max-w-xs">
      <input
        type="text"
        value={termo}
        onChange={e => setTermo(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />
      <button
        type="submit"
        className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition"
        aria-label="Buscar"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}