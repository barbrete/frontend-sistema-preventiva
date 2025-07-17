import { useState } from "react";
import CardTech from "./CardTech";
import LoadingOverlay from "./Loading";

interface SelecaoTecnicoProps {
  tecnicos: any[];
  modoSelecao: "editar" | "excluir" | null;
  selecionado: number | null;
  onSelecionar: (id: number) => void;
  onCardClick: (id: number) => void;
loading: boolean;
}

export default function SelecaoTecnico({ tecnicos, modoSelecao, selecionado, onSelecionar, onCardClick,loading}: SelecaoTecnicoProps) {
  if (loading) {
    return <LoadingOverlay show={true} text="Carregando técnicos..." />;
  }
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {tecnicos.map((tecnico) => (
        <div key={tecnico.id} className="relative">
          <div
            onClick={() =>
              modoSelecao
                ? onSelecionar(tecnico.id)
                : onCardClick(tecnico.id)
            }
            className="cursor-pointer"
          >
            <CardTech nome={tecnico.name} />
          </div>
          {modoSelecao && (
            <button
              className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-blue-700 bg-white flex items-center justify-center ${
                selecionado === tecnico.id ? "bg-blue-700" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelecionar(tecnico.id);
              }}
            >
              {selecionado === tecnico.id && (
                <span className="w-3 h-3 rounded-full bg-blue-700 block"></span>
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}