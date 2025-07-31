import React from "react";

export default function ModalFoto({ url, onClose }: { url: string; onClose: () => void }) {
  if (!url) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <img
        src={url}
        alt="Foto ampliada"
        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-1 border-white"
        onClick={e => e.stopPropagation()}
      />
      <button
        className="absolute top-6 right-8 text-white text-3xl font-bold"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}