import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Dados de exemplo
const dadosExemplo = [
  { mes: "Jan", valor: 20 },
  { mes: "Feb", valor: 35 },
  { mes: "Mar", valor: 30 },
  { mes: "Apr", valor: 45 },
  { mes: "May", valor: 50 },
  { mes: "June", valor: 65 },
  { mes: "July", valor: 73 },
  { mes: "Aug", valor: 60 }
];

export default function GraficoArea({ dados = dadosExemplo }: { dados?: { mes: string, valor: number }[] }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow w-full max-w-2xl">
      <h3 className="font-bold text-lg mb-2 text-deepNavy">Quantidade de Preventivas por mês</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={dados}>
          <defs>
            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fb923c" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="valor"
            stroke="#fb923c"
            fill="url(#colorValor)"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#fb923c", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}