import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

// Dados de exemplo
const dadosExemplo = [
    { mes: "Jan", valor: 20 },
    { mes: "Fev", valor: 35 },
    { mes: "Mar", valor: 30 },
    { mes: "Abr", valor: 45 },
    { mes: "Mai", valor: 50 },
    { mes: "Jun", valor: 65 },
    { mes: "Jul", valor: 73 },
    { mes: "Ago", valor: 60 }
];

export default function GraficoArea({ dados = dadosExemplo }: { dados?: { mes: string, valor: number }[] }) {
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-neonGreen to-darkNeonGreen rounded-lg flex items-center justify-center">
                    <TrendingUp size={18} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-deepNavy tracking-tight">
                    Preventivas por Mês
                </h3>
            </div>
            
            <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-deepNavy/5 to-royalBlue/5 rounded-xl" />
                <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={dados} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00105a" stopOpacity={0.8} />
                                <stop offset="50%" stopColor="#083acf" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#43ef68" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="mes" 
                            tick={{ fill: "#00105a", fontWeight: 600, fontSize: 12 }} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis 
                            domain={[0, 100]} 
                            tick={{ fill: "#00105a", fontWeight: 600, fontSize: 12 }} 
                            tickFormatter={v => `${v}`}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{ 
                                background: "rgba(255, 255, 255, 0.95)", 
                                color: "#00105a", 
                                borderRadius: 12, 
                                border: "none",
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(10px)"
                            }}
                            cursor={{ stroke: "#43ef68", strokeWidth: 2, strokeDasharray: "5 5" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="valor"
                            stroke="#00105a"
                            fill="url(#colorValor)"
                            strokeWidth={3}
                            dot={{ r: 6, stroke: "#00105a", strokeWidth: 3, fill: "#fff" }}
                            activeDot={{ 
                                r: 8, 
                                stroke: "#43ef68", 
                                strokeWidth: 3, 
                                fill: "#fff"
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
            
            
        </div>
    );
}