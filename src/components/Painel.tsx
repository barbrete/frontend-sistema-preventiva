import React, { useEffect, useState } from "react";
import api from "@/utils/axios";
import { Users, UserCheck, UserX, BarChart3 } from "lucide-react";

type Stats = {
  totalPreventivas: number;
  totalUsuarios: number;
  usuariosAtivos: number;
  usuariosInativos: number;
};

export default function PainelEstatisticas() {
  const [stats, setStats] = useState<Stats>({
    totalPreventivas: 0,
    totalUsuarios: 0,
    usuariosAtivos: 0,
    usuariosInativos: 0,
  });

  useEffect(() => {
    async function fetchEstatisticas() {
      try {
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
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    }

    fetchEstatisticas();
  }, []);

  return (
    <section className="w-full max-w-5xl">
      <div className="">
        <h2 className="text-xl font-bold text-deepNavy text-center tracking-tight drop-shadow-lg">
          Estatísticas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 p-5 rounded-xl">
          <CardEstatistica
            label="Preventivas"
            valor={stats.totalPreventivas}
            icon={<BarChart3 className="w-6 h-6 text-neonGreen" />}
            bg="bg-white"
            corIcone=""
          />
          <CardEstatistica
            label="Usuários Totais"
            valor={stats.totalUsuarios}
            icon={<Users className="w-6 h-6 text-royalBlue" />}
            bg="bg-white"
            corIcone=""
          />
          <CardEstatistica
            label="Ativos"
            valor={stats.usuariosAtivos}
            icon={<UserCheck className="w-6 h-6 text-neonGreen" />}
            bg="bg-white"
            corIcone=""
          />
          <CardEstatistica
            label="Desligados"
            valor={stats.usuariosInativos}
            icon={<UserX className="w-6 h-6 text-danger text-red-800" />}
            bg="bg-white"
            corIcone=""
          />
        </div>
      </div>
    </section>
  );
}

function CardEstatistica({ label, valor, icon, bg, corIcone }: { label: string; valor: number; icon: React.ReactNode; bg: string; corIcone: string }) {
  return (
    <div className={`${bg} rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 border`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className={`${corIcone} bg-gray-100 rounded-full shadow p-2 flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-base text-deepNavy font-medium">{label}</span>
      </div>
      <span className="text-2xl font-extrabold text-neonGreen drop-shadow">{valor}</span>
    </div>
  );
}