import React from "react";

interface ConfirmacaoExcluirProps {
  open: boolean;
  nome: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmacaoExcluir({ open, nome, onConfirm, onCancel }: ConfirmacaoExcluirProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-xl font-bold text-red-700 mb-4">Confirmar exclusão</h2>
        <p className="mb-6 text-center text-blue-900">
          Tem certeza que deseja excluir o técnico <span className="font-bold">{nome}</span>?
        </p>
        <p className="mb-6 text-center text-blue-900">
          <span className="font-bold text-red-700">ATENÇÃO!</span> só exclua o técnico caso tenha criado errado, do contrário desative.
        </p>
        <div className="flex gap-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded bg-gray-200 text-blue-900 font-semibold hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}