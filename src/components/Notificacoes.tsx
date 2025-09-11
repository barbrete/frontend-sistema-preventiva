import { Bell, Clock, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { formatarTempoRelativo } from "@/utils/time";

interface Notificacao {
  id: string;
  mensagem: string;
  timestamp: Date;
  tipo: 'info' | 'success' | 'warning' | 'error';
}

export default function NotificacoesRecentes({ notificacoes }: { notificacoes: Notificacao[] }) {
  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case 'success': return <CheckCircle className="text-white w-4 h-4" />;
      case 'warning': return <AlertTriangle className="text-white w-4 h-4" />;
      case 'error': return <AlertTriangle className="text-white w-4 h-4" />;
      default: return <Info className="text-white w-4 h-4" />;
    }
  };

  const getColorByType = (tipo: string) => {
    switch (tipo) {
      case 'success': return 'from-green-500 to-green-600';
      case 'warning': return 'from-yellow-500 to-yellow-600';
      case 'error': return 'from-red-500 to-red-600';
      default: return 'from-royalBlue to-deepNavy';
    }
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell size={27} className="text-[#00105a]" />
        <h2 className="text-xl font-bold text-deepNavy">Notificações Recentes</h2>
        {notificacoes.length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {notificacoes.length}
          </span>
        )}
      </div>
      
      {notificacoes.length === 0 ? (
        <motion.div 
          className="flex items-center justify-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell className="text-gray-400 w-6 h-6" />
            </div>
            <p className="text-gray-500 font-medium">Nenhuma notificação recente</p>
            <p className="text-gray-400 text-sm mt-1">Suas notificações aparecerão aqui</p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {notificacoes.map((n, i) => (
            <motion.div
              key={n.id}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:border-blue-200 transition-all duration-200 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
              title={n.timestamp.toLocaleString('pt-BR')} // Tooltip com data completa
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${getColorByType(n.tipo)} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {getIconByType(n.tipo)}
                </div>
                <div className="flex-1">
                  <p className="text-deepNavy font-medium leading-relaxed">{n.mensagem}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                    <Clock className="w-3 h-3" />
                    <span>{formatarTempoRelativo(n.timestamp)}</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}