import { motion } from "framer-motion";

export default function CardEstatistica({ label, valor, icon, gradient, iconBg, iconColor }: { label: string; valor: number; icon: React.ReactNode; gradient: string; iconBg: string; iconColor: string; }) {
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