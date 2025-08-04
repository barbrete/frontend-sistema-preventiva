import { CheckCircle, ChevronRight, Mail, Shield, User, XCircle } from "lucide-react";

interface CardTechProps {
  nome: string;
  email?: string;
  tipo?: 'ADMIN' | 'TECNICO';
  ativo?: boolean;
  selecionado?: boolean;
  modoSelecao?: 'editar' | 'excluir' | null;
  onClick?: () => void;
  onCardClick?: () => void;
}

export default function CardTech({ nome, email, tipo, ativo = true, selecionado = false, modoSelecao, onClick, onCardClick }: CardTechProps) {  
  const getStatusColor = () => {
      if (!ativo) return 'bg-red-100 text-red-700 border-red-200';
      return 'bg-green-100 text-green-700 border-green-200';
    };

    const getSelectionStyle = () => {
      if (selecionado && modoSelecao === 'editar') {
        return 'ring-2 ring-blue-500 bg-blue-50 border-blue-300';
      }
      if (selecionado && modoSelecao === 'excluir') {
        return 'ring-2 ring-red-500 bg-red-50 border-red-300';
      }
      return 'border-gray-200 hover:border-blue-300 hover:shadow-md';
    };

  return (
    <div className={`
      relative bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer
      ${getSelectionStyle()}
    `}>
      {/* Checkbox para seleção */}
      {modoSelecao && (
        <div className="absolute top-3 right-3">
          <input
            type="checkbox"
            checked={selecionado}
            onChange={onClick}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
      )}

      {/* Conteúdo principal */}
      <div onClick={onCardClick} className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-r from-royalBlue to-deepNavy rounded-xl flex items-center justify-center flex-shrink-0">
          <User size={24} className="text-white" />
        </div>

        {/* Informações */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{nome}</h3>
            {tipo === 'ADMIN' && (
              <Shield size={16} className="text-yellow-600 flex-shrink-0" />
            )}
          </div>
          
          {email && (
            <div className="flex items-center gap-1 mb-2">
              <Mail size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">{email}</span>
            </div>
          )}

          {/* Status e tipo */}
          <div className="flex items-center gap-2">
            <span className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border
              ${getStatusColor()}
            `}>
              {ativo ? (
                <>
                  <CheckCircle size={12} />
                  Ativo
                </>
              ) : (
                <>
                  <XCircle size={12} />
                  Desligado
                </>
              )}
            </span>
            
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
              {tipo}
            </span>
          </div>
        </div>

        {/* Seta para indicar clique */}
        {!modoSelecao && (
          <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}