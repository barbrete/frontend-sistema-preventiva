import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Exemplo de datas de preventivas (substitua pelo seu backend)
const datasPreventivas = [
  "2024-07-28",
  "2024-07-30",
  "2024-08-02"
];

export default function Calendario() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | [Date, Date]>(new Date());

  // Função para marcar datas de preventiva
  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      const dataStr = date.toISOString().split("T")[0];
      if (datasPreventivas.includes(dataStr)) {
        return "bg-green-400 text-white rounded-full font-bold";
      }
    }
    return null;
  }

  return (
    <div className="my-4 bg-white/80 rounded-lg p-4 shadow max-w-xs">
      <h2 className="font-bold text-blue-700 mb-2 text-base">Calendário de Preventivas</h2>
      <Calendar
        onChange={setDataSelecionada}
        value={dataSelecionada}
        tileClassName={tileClassName}
        locale="pt-BR"
      />
    </div>
  );
}