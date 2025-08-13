import React from "react";
import { HeaderCover } from "@/components/Header";
import Link from "next/link";
import { ArrowRight, Shield, Users, BarChart3, Wifi, Plus } from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-deepNavy via-lightDeepNavy to-neonGreen relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Wifi className="absolute top-[18%] right-[12%] text-white/30 w-28 h-28 animate-pulse" />
        <Plus className="absolute top-[10%] left-[1%] text-offWhite/30 w-28 h-28 font-extrabold select-none" />
        <Wifi className="absolute top-[60%] right-[40%] text-white/20 w-20 h-20 " />
      </div>

      <HeaderCover />

    <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6 mt-10 mb-10 relative z-10">
        {/* Texto à esquerda */}
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
            Todas as informações de preventivas em um só lugar
          </h1>
          <h2 className="text-2xl font-bold text-neonGreen drop-shadow mb-4">
            Gestão inteligente de preventivas
          </h2>
          <p className="text-lg text-white/90 max-w-md mb-10">
            Plataforma moderna para gerenciar equipes de técnicos, preventivas de Pop&apos;s e CTO&apos;s e garantir a qualidade da rede <b>Giga+</b>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="bg-neonGreen text-deepNavy font-bold px-8 py-3 rounded-full shadow-xl hover:bg-green-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/cadastro"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-deepNavy transition-all duration-300 transform hover:scale-105"
            >
              Criar Conta
            </Link>
          </div>
        </div>
        {/* Imagem à direita */}
        <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
          <Image
            src="/cto3.jpg"
            alt="Fibra óptica"
            width={320}
            height={400}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </div>
      </section>

      {/* Features */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-6 relative z-10">
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-neonGreen/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-neonGreen" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Segurança Total</h4>
            <p className="text-white/80">Proteção de dados e autenticação.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-neonGreen/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-neonGreen" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Gestão de Equipes</h4>
            <p className="text-white/80">Organize técnicos, crie preventivas e acompanhe o desempenho em tempo real.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-neonGreen/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="text-neonGreen" size={32} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Relatórios Detalhados</h4>
            <p className="text-white/80">Dashboards interativos para acompanhar métricas e resultados.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}