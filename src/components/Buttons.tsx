import React from "react";

interface RoundIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export default function RoundIconButton({ icon, label, onClick, active = false }: RoundIconButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
          ${active ? "bg-green-400 ring-4 ring-green-300 text-blue-900" : "bg-blue-700 hover:bg-blue-800 text-white"}`}
      >
        {icon}
      </button>
      <span className={`mt-2 text-sm font-medium ${active ? "text-green-700" : "text-blue-900"}`}>{label}</span>
    </div>
  );
}