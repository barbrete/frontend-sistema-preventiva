"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingOverlay from "@/components/Loading";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import api from "@/utils/axios";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import {TabelaPreventivasGeral} from "@/components/Tabela";
import { Preventiva } from "@/utils/Interfaces";
import { buscarTecnicoPorId, buscarPreventivasPorTecnico } from "@/services/usuario";

export default function MostrarPreventivas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const headerPadding = "pt-24";

  const [preventivas, setPreventivas] = useState<Preventiva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreventivas() {
      setLoading(true);
      try {
        const { data } = await api.get<Preventiva[]>("/preventivas");
        setPreventivas(data);
      } catch {
        setPreventivas([]);
      }
      setLoading(false);
    }
    fetchPreventivas();
  }, []);

  // if (loading)
  //   return <LoadingOverlay show={true} text="Carregando preventivas..." />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
      <Menu open={open} setOpen={setOpen} />
      <Header open={open} />
      <main className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch mt-8 transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"} ${headerPadding}`}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <h1 className="text-6xl font-extrabold text-blue-700 text-center mb-10 drop-shadow-lg">
            Todas as Preventivas Realizadas
          </h1>
          <div className="">
            <TabelaPreventivasGeral
              loading={loading}
              preventivas={preventivas}
              onRowClick={(id) => router.push(`/preventiva?id=${id}`)}  
          />
          </div>
        </div>
        <div className="mb-20"/>
      </main>
      <Footer />
    </div>
  );
}
