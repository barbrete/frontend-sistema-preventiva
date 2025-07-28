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
    <section className="w-full max-w-5xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-neonGreen mb-8 text-center tracking-tight drop-shadow-lg">
        Painel de Estatísticas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 bg-blue-200 p-10 rounded-xl">
        <CardEstatistica
          label="Preventivas"
          valor={stats.totalPreventivas}
          icon={<BarChart3 className="w-10 h-10 text-neonGreen" />}
          bg="bg-deepNavy"
        />
        <CardEstatistica
          label="Usuários Totais"
          valor={stats.totalUsuarios}
          icon={<Users className="w-10 h-10 text-royalBlue" />}
          bg="bg-midnight"
        />
        <CardEstatistica
          label="Ativos"
          valor={stats.usuariosAtivos}
          icon={<UserCheck className="w-10 h-10 text-neonGreen" />}
          bg="bg-deepNavy"
        />
        <CardEstatistica
          label="Desligados"
          valor={stats.usuariosInativos}
          icon={<UserX className="w-10 h-10 text-danger text-red-800" />}
          bg="bg-midnight"
        />
      </div>
    </section>
  );
}

function CardEstatistica({
  label,
  valor,
  icon,
  bg,
}: {
  label: string;
  valor: number;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div
      className={`${bg} rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center transition-transform hover:scale-105 border-2 border-neonGreen`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-4xl font-extrabold text-neonGreen drop-shadow">{valor}</span>
      <span className="text-base text-white mt-2 font-medium">{label}</span>
    </div>
  );
}