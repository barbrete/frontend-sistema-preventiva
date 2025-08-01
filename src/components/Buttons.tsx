import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ClipboardList, ClipboardPlus, Users } from "lucide-react";
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-4 md:p-5 rounded-xl md:rounded-2xl shadow-md ${gradient} transition-all duration-200 group cursor-pointer flex flex-col items-start justify-between min-h-[100px] md:min-h-[120px] w-full`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <span className="mb-2 block">{icon}</span>
          <h3 className={`text-sm md:text-base font-bold ${textColor} mb-1 leading-tight`}>{title}</h3>
          <p className={`text-xs md:text-sm ${textColor} opacity-90 leading-relaxed`}>{description}</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
          <ChevronRight size={20} color="white"/>
        </span>
      </div>
    </motion.div>
  );
}

export function AcoesDashboard({ userInfo }: { userInfo: any }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <DashboardButton
        icon={<ClipboardList className="w-5 h-5 md:w-6 md:h-6 text-neonGreen" />}
        title="Criar Preventiva"
        description="Inicie uma nova preventiva para a sua equipe."
        gradient="bg-gradient-to-br from-deepNavy to-lightDeepNavy"
        textColor="text-neonGreen"
        onClick={() => router.push('/criar_preventiva')}
      />

      {userInfo?.tipo === 'ADMIN' && (
        <>
          <DashboardButton
            icon={<ClipboardPlus className="w-5 h-5 md:w-6 md:h-6 text-deepNavy" />}
            title="Mostrar Preventivas"
            description="Consulte as preventivas criadas e seus detalhes."
            gradient="bg-gradient-to-br from-neonGreen to-darkNeonGreen"
            textColor="text-deepNavy"
            onClick={() => router.push('/mostrar_preventivas')}
          />
          <DashboardButton
            icon={<Users className="w-5 h-5 md:w-6 md:h-6 text-white" />}
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