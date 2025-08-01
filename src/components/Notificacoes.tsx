import { Bell, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificacoesRecentes({ notificacoes }: { notificacoes: string[] }) {
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
              key={i}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:border-blue-200 transition-all duration-200 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-royalBlue to-deepNavy rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="text-white w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-deepNavy font-medium leading-relaxed">{n}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                    <Clock className="w-3 h-3" />
                    <span>Há alguns minutos</span>
                  </div>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>
          ))}
        </div>
      )}
      
      {notificacoes.length > 0 && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="text-royalBlue hover:text-deepNavy font-medium text-sm transition-colors duration-200 hover:underline">
            Ver todas as notificações
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}