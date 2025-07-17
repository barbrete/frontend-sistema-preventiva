import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ show, text = "Carregando..." }: { show: boolean; text?: string }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg px-8 py-6">
        <Loader2 className="animate-spin text-blue-700" size={40} />
        <span className="text-blue-700 font-semibold">{text}</span>
      </div>
    </div>
  );
}