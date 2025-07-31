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
            icon={<BarChart3 size={25} />}
            bg="bg-blue-50"
            corIcone="text-yellow-500"
          />
          <CardEstatistica
            label="Usuários"
            valor={stats.totalUsuarios}
            icon={<Users size={25} />}
            bg="bg-blue-50"
            corIcone="text-royalBlue"
          />
          <CardEstatistica
            label="Ativos"
            valor={stats.usuariosAtivos}
            icon={<UserCheck size={25} />}
            bg="bg-blue-50"
            corIcone="text-neonGreen"
          />
          <CardEstatistica
            label="Desligados"
            valor={stats.usuariosInativos}
            icon={<UserX size={25} />}
            bg="bg-blue-50"
            corIcone="text-red-500"
          />
        </div>
      </div>
    </section>
  );
}

function CardEstatistica({ label, valor, icon, bg, corIcone, }: { label: string; valor: number; icon: React.ReactNode; bg: string; corIcone: string; }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl shadow flex flex-col items-start justify-between min-h-[90px] max-w-[220px] p-4 border border-blue-100
        ${bg} transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group
      `}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className={`w-9 h-9 flex items-center justify-center rounded-3xl shadow ${corIcone} bg-white/90 group-hover:bg-white transition`}>
          {icon}
        </div>
        <span className="text-md text-deepNavy font-semibold">{label}</span>
      </div>
      <span className="text-2xl font-bold text-deepNavy mt-1 mx-auto">{valor}</span>
    </div>
  );
}