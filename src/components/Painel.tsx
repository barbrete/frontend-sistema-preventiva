import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/utils/axios";
import { Users, UserCheck, UserX, BarChart3, TrendingUp } from "lucide-react";
import { Usuario } from "@/utils/Interfaces";

type Stats = {
  totalPreventivas: number;
  totalUsuarios: number;
  usuariosAtivos: number;
  usuariosInativos: number;
};

export default function PainelEstatisticas({ userInfo }: { userInfo: Usuario }) {
  const [stats, setStats] = useState<Stats>({
    totalPreventivas: 0,
    totalUsuarios: 0,
    usuariosAtivos: 0,
    usuariosInativos: 0,
  });

  useEffect(() => {
    async function fetchEstatisticas() {
      try {
        if (userInfo?.tipo === "TECNICO") {
          const res = await api.get(`/preventivas/stats?user_id=${userInfo.id}`);
          setStats((prev) => ({
            ...prev,
            totalPreventivas: (res.data as { total: number }).total || 0,
          }));
          console.log(res)
          console.log(userInfo.id)
        } else {

          const [resPreventivas, resUsuarios] = await Promise.all([
            api.get("/preventivas/stats"),
            api.get("/usuarios/stats"),
          ]);

          setStats({
            totalPreventivas: (resPreventivas.data as { total: number }).total || 0,
            usuariosAtivos: (resUsuarios.data as { active: number }).active || 0,
            usuariosInativos: (resUsuarios.data as { inactive: number }).inactive || 0,
            totalUsuarios: (resUsuarios.data as { total: number }).total || 0,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    }

    fetchEstatisticas();
  }, [userInfo]);

  if (userInfo?.tipo === "TECNICO") {
    return (
      <section className="w-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-neonGreen to-darkNeonGreen rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-deepNavy tracking-tight">
              Suas Preventivas Realizadas
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardEstatistica
              label="Preventivas Feitas"
              valor={stats.totalPreventivas}
              icon={<BarChart3 size={22} />}
              gradient="from-neonGreen to-darkNeonGreen"
              iconBg="bg-green-100"
              iconColor="text-deepNavy"
            />
          </motion.div>
        </div>
      </section>
    );
  }

  return (

    userInfo?.tipo === 'ADMIN' && (
      <>
        <section className="w-full">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-royalBlue to-deepNavy rounded-lg flex items-center justify-center">
                <TrendingUp size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-deepNavy tracking-tight">
                Estatísticas do Sistema
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <CardEstatistica
                  label="Preventivas"
                  valor={stats.totalPreventivas}
                  icon={<BarChart3 size={22} />}
                  gradient="from-amber-400 to-orange-500"
                  iconBg="bg-amber-100"
                  iconColor="text-amber-600"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <CardEstatistica
                  label="Usuários"
                  valor={stats.totalUsuarios}
                  icon={<Users size={22} />}
                  gradient="from-royalBlue to-deepNavy"
                  iconBg="bg-blue-100"
                  iconColor="text-royalBlue"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <CardEstatistica
                  label="Ativos"
                  valor={stats.usuariosAtivos}
                  icon={<UserCheck size={22} />}
                  gradient="from-neonGreen to-darkNeonGreen"
                  iconBg="bg-green-100"
                  iconColor="text-neonGreen"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <CardEstatistica
                  label="Desligados"
                  valor={stats.usuariosInativos}
                  icon={<UserX size={22} />}
                  gradient="from-red-400 to-red-600"
                  iconBg="bg-red-100"
                  iconColor="text-red-500"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </>)
  )
}

function CardEstatistica({ label, valor, icon, gradient, iconBg, iconColor }: { label: string; valor: number; icon: React.ReactNode; gradient: string; iconBg: string; iconColor: string; }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl p-4 h-24 cursor-pointer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

      {/* Glowing effect on hover */}
      <div className="absolute inset-0 rounded-2xl group-hover:shadow-lg group-hover:shadow-black/20 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full">
        <div className="flex flex-col justify-center flex-1">
          <span className="text-white/90 text-xs font-medium uppercase tracking-wide">
            {label}
          </span>
          <span className="text-white text-2xl font-bold mt-1">
            {valor}
          </span>
        </div>

        <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>

      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 group-hover:h-2 transition-all duration-300" />
    </motion.div>
  );
}