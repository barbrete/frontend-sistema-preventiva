'use client'
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import api from "@/utils/axios";
import { Preventiva } from "@/utils/Interfaces";
import LoadingOverlay from "@/components/Loading";
import { Car, User, FileText, Calendar, Camera, ArrowRightLeft, Shield, AlertTriangle, CircleCheck, BadgePercent } from "lucide-react";
import { salvarHorario, getHorario } from "@/utils/Horario";
import { exportToPDF } from "@/utils/pdf";
import { InfoCard } from "@/components/Cards";
import Auth from "@/components/Auth";
import ModalFoto from "@/components/modal/ExpandirFoto";

export default function PreventivaEspecifica() {
  const params = useParams();
  const id = params.id as string;
  const [open, setOpen] = useState(false);
  const headerPadding = "pt-30";
  const [preventiva, setPreventiva] = useState<Preventiva | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [fotoModal, setFotoModal] = useState<string | null>(null);
  salvarHorario("ultimaAcao");

  const ultimaVisita = getHorario("ultimaAcao");

  useEffect(() => {
    async function fetchPreventiva() {
      setLoading(true);
      try {
        const { data } = await api.get<Preventiva>(`/preventivas/${id}`);
        setPreventiva(data);
      } catch {
        setPreventiva(null);
      }
      setLoading(false);
    }
    if (id) fetchPreventiva();
  }, [id]);

  if (loading)
    return <LoadingOverlay show={true} text="Carregando preventiva..." />;

  if (!preventiva)
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow mt-20">
        <h2 className="text-2xl font-bold text-red-700">
          Preventiva não encontrada
        </h2>
      </div>
    );

  const volumetriaPorKm =
    preventiva.irregularidades_encontradas && preventiva.kilometragem_percorrida
      ? (preventiva.irregularidades_encontradas / preventiva.kilometragem_percorrida).toFixed(2)
      : "0";

  return (
    <Auth>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
        <Menu open={open} setOpen={setOpen} />
        <Header open={open} />

        <main
          className={`flex-1 w-full bg-gradient-to-br from-blue-50 to-white px-6 md:px-20 py-10 text-gray-800 ${headerPadding}`}
        >
          <div className="max-w-5xl mx-auto border border-gray-200 bg-white p-10 rounded-xl shadow-md mt-24">
            <header className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-blue-800 uppercase tracking-wide mb-1">
                Relatório de Preventiva
              </h1>
              <p className="text-sm text-gray-600 flex justify-center items-center gap-2">
                <User className="w-4 h-4" />
                Criado por{" "}
                <button
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => router.push(`/perfil/${preventiva.usuario.id}`)}
                >
                  {preventiva.usuario?.name || preventiva.usuario?.email || "-"}
                </button>{" "}
                em {new Date(preventiva.created_at).toLocaleDateString("pt-BR")}
              </p>
            </header>

            <section className="grid md:grid-cols-2 gap-6 mb-8">
              <InfoCard icon={<Shield />} label="Nome" value={preventiva.nome || "-"} />
              <InfoCard
                icon={<Calendar />}
                label="Última Atualização"
                value={new Date(preventiva.updated_at).toLocaleString("pt-BR")}
              />
              <InfoCard
                icon={<Car />}
                label="KM Percorrida"
                value={`${preventiva.kilometragem_percorrida} km`}
              />
              <InfoCard
                icon={<FileText />}
                label="ID"
                value={`#${preventiva.id}`}
              />
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-1 border-blue-200 mb-4">
                Irregularidades
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard
                  icon={<AlertTriangle />}
                  label="Encontradas"
                  value={preventiva.irregularidades_encontradas}
                />
                <InfoCard
                  icon={<CircleCheck />}
                  label="Corrigidas"
                  value={preventiva.irregularidades_corrigidas}
                />
                <InfoCard
                  icon={<BadgePercent />}
                  label="Volumetria de irregularidade por KM"
                  value={volumetriaPorKm}
                />
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-1 border-blue-200 mb-4">
                Descrição Técnica
              </h2>
              <p className="text-sm leading-6 text-gray-700 whitespace-pre-line pl-2 border-l-4 border-blue-300">
                {preventiva.descricao}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-1 border-blue-200 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Fotos da Preventiva
              </h2>

              {preventiva.fotos && preventiva.fotos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  {["antes", "depois"].map((tipo) => {
                    const fotosFiltradas = preventiva.fotos.filter((f) =>
                      f.tipo.toLowerCase().includes(tipo)
                    );
                    return (
                      <div key={tipo} className="flex flex-col items-center">
                        <h3 className="text-md font-medium text-gray-700 uppercase mb-2 flex items-center gap-1">
                          <ArrowRightLeft className="w-4 h-4" />
                          {tipo === "antes" ? "Antes" : "Depois"}
                        </h3>
                        {fotosFiltradas.length > 0 ? (
                          fotosFiltradas.map((foto) => (
                            <img
                              key={foto.id}
                              src={foto.url}
                              alt={foto.tipo}
                              className="w-full h-56 object-cover rounded-md shadow-sm border cursor-pointer"
                              onClick={() => setFotoModal(foto.url)}
                            />
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Nenhuma foto de {tipo}.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  Nenhuma foto cadastrada nesta preventiva.
                </p>
              )}
            </section>

            <button
              onClick={() => exportToPDF(".max-w-5xl", "preventiva.pdf")}
              className="mt-4 px-6 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition"
            >
              Exportar PDF
            </button>

            <footer className="mt-10 border-t pt-4 text-xs text-center text-gray-500">
              Relatório gerado automaticamente em {ultimaVisita}
            </footer>
          </div>
          {fotoModal && (
            <ModalFoto url={fotoModal} onClose={() => setFotoModal(null)} />
          )}      
          </main>
        <Footer />
      </div>
    </Auth>
  );
}