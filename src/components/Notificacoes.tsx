export default function NotificacoesRecentes({ notificacoes }: { notificacoes: string[] }) {
  return (
    <div className="mb-4 p-3 rounded-lg bg-white/80 shadow text-sm text-blue-900 max-w-1/2">
      <h2 className="font-bold mb-2 text-blue-700 text-base">Notificações Recentes</h2>
      {notificacoes.length === 0 ? (
        <p className="text-gray-500">Nenhuma notificação recente.</p>
      ) : (
        <ul className="list-disc pl-5">
          {notificacoes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

