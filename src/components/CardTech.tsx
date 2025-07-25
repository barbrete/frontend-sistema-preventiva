import { User } from "lucide-react";

interface CardTechProps {
  nome: string;
  onClick?: () => void;
}

export default function CardTech({ nome, onClick }: CardTechProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 gap-3 w-72 h-14 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all duration-200"
    >
      <User size={30} className="text-white" />
      <span className="text-lg text-blue-700 bg-white rounded-lg px-3 truncate">{nome}</span>
    </button>
  );
}