import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
        <div className="bg-white rounded-xl p-4 shadow w-full max-w-2xl">
            <h3 className="font-bold text-lg mb-2 text-deepNavy">Quantidade de Preventivas por mês</h3>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dados}>
                    <defs>
                        <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00105a" stopOpacity={0.7} />
                            <stop offset="95%" stopColor="#00105a" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="mes" tick={{ fill: "#00105a", fontWeight: 600 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#00105a", fontWeight: 600 }} tickFormatter={v => `${v}%`} />
                    <Tooltip
                        contentStyle={{ background: "#eef3f7", color: "#00105a", borderRadius: 8, border: "none" }}
                        cursor={{ stroke: "#00105a", strokeWidth: 2 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="valor"
                        stroke="#00105a"
                        fill="url(#colorValor)"
                        strokeWidth={3}
                        dot={{ r: 5, stroke: "#00105a", strokeWidth: 2, fill: "#fff" }}
                        activeDot={{ r: 7 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}