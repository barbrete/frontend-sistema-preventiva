import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, ClipboardPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoundIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export function RoundIconButton({ icon, label, onClick, active = false }: RoundIconButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
          ${active ? "bg-green-400 ring-4 ring-green-300 text-blue-900" : "bg-blue-700 hover:bg-blue-800 text-white"}`}
      >
        {icon}
      </button>
      <span className={`mt-2 text-sm font-medium ${active ? "text-green-700" : "text-blue-900"}`}>{label}</span>
    </div>
  );
}

function DashboardButton({ icon, title, description, gradient, textColor, onClick,}: {
  icon: React.ReactNode; title: string; description: string; gradient: string; textColor: string; onClick: () => void;}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className={`p-2 rounded-xl shadow-md ${gradient} transition cursor-pointer flex flex-col items-start min-h-[90px] max-w-[250px]`}
      onClick={onClick}
    >
      <span className="mb-1">{icon}</span>
      <h3 className={`text-xs font-bold ${textColor} mb-0.5`}>{title}</h3>
      <p className={`text-[10px] ${textColor}`}>{description}</p>
    </motion.div>
  );
}

export function AcoesDashboard({ userInfo }: { userInfo: any }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-start">
      <DashboardButton
        icon={<ClipboardList className="w-6 h-6 text-neonGreen" />}
        title="Criar Preventiva"
        description="Inicie uma nova preventiva para a sua equipe."
        gradient="bg-gradient-to-br from-deepNavy to-lightDeepNavy"
        textColor="text-neonGreen"
        onClick={() => router.push('/criar_preventiva')}
      />

      {userInfo?.tipo === 'ADMIN' && (
        <>
          <DashboardButton
            icon={<ClipboardPlus className="w-6 h-6 text-deepNavy" />}
            title="Mostrar Preventivas"
            description="Consulte as preventivas criadas e seus detalhes."
            gradient="bg-gradient-to-br from-neonGreen to-darkNeonGreen"
            textColor="text-deepNavy"
            onClick={() => router.push('/mostrar_preventivas')}
          />
          <DashboardButton
            icon={<Users className="w-6 h-6 text-white" />}
            title="Equipe"
            description="Veja os membros da sua equipe e suas ações."
            gradient="bg-gradient-to-br from-royalBlue to-deepNavy"
            textColor="text-white"
            onClick={() => router.push('/equipe')}
          />
        </>
      )}
    </div>
  );
}