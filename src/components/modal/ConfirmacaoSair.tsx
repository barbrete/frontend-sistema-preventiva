import React from "react";

interface ConfirmacaoSairProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmacaoSair({ open, onConfirm, onCancel }: ConfirmacaoSairProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Sair da conta</h2>
        <p className="mb-6 text-gray-700">Tem certeza que deseja sair?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}