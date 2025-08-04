"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { TabelaPreventivasGeral } from "@/components/Tabela";
import { Preventiva } from "@/utils/Interfaces";
import Auth from "@/components/Auth";
import { FileText, Plus } from "lucide-react";

export default function MostrarPreventivas() {
  const router = useRouter();
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

  return (
    <Auth apenasAdmin>
      <div className="min-h-screen bg-gradient-to-br from-offWhite via-blue-50 to-royalBlue/20 flex flex-col">        <Menu open={open} setOpen={setOpen} />
        <Header open={open} />
        <main className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch mt-8 transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"} ${headerPadding}`}>
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-royalBlue to-deepNavy rounded-xl flex items-center justify-center shadow-lg">
                  <FileText size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-deepNavy">Preventivas Realizadas</h1>
                  <p className="text-gray-600 text-lg">Histórico completo de todas as manutenções preventivas</p>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-royalBlue/20 via-neonGreen/30 to-transparent" />
            </div>

            <div className="">
              <TabelaPreventivasGeral
                loading={loading}
                preventivas={preventivas}
                onRowClick={(id) => router.push(`/preventiva/${id}`)}
              />
            </div>
          </div>
          <div className="mb-20" />
        </main>
        
        <Footer />
      </div>
    </Auth>
  );
}
