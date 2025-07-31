import { Bell } from "lucide-react";

export default function NotificacoesRecentes({ notificacoes }: { notificacoes: string[] }) {
  return (
    <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 via-white to-white shadow-md w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <Bell className="text-deepNavy w-5 h-5" />
        <h2 className="font-bold text-deepNavy text-lg">Notificações Recentes</h2>
      </div>
      {notificacoes.length === 0 ? (
        <p className="text-gray-400 italic">Nenhuma notificação recente.</p>
      ) : (
        <ul className="space-y-1">
          {notificacoes.map((n, i) => (
            <li
              key={i}
              className="bg-blue-100/60 rounded px-3 py-2 text-blue-900 flex items-start shadow-sm hover:bg-blue-200 transition"
            >
              {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}