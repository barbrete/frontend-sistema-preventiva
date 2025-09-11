import { X } from "lucide-react";

interface ModalConfirmacaoProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    titulo: string;
    mensagem: string;
}

export default function ModalConfirmacao({ isOpen, onClose, onConfirm, titulo, mensagem, }: ModalConfirmacaoProps) {
    if (!isOpen) return null;
    
    const textoBotaoConfirmar = "Confirmar";
    const corBotaoConfirmar = "bg-blue-600 hover:bg-blue-700";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-600 mb-8 text-lg">{mensagem}</p>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors font-medium ${corBotaoConfirmar}`}
                    >
                        {textoBotaoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}