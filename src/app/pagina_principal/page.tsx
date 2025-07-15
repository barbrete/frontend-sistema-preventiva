"use client"
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import React from "react";  

export default function PaginaPrincipal(){

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center">
      <Menu/>
      <Header />
      <main className="w-full bg-white rounded-xl shadow-lg mt-8 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Sistema Preventiva</h1>
        <p className="text-lg text-blue-900 mb-8 text-center">
          Bem-vindo ao sistema de gestão preventiva! Aqui você pode acompanhar suas atividades, registrar visitas e visualizar informações importantes.
        </p>
        <div className="w-full flex flex-col gap-6">
          <section className="bg-blue-50 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Minhas Preventivas</h2>
            <p className="text-blue-800">Acompanhe suas preventivas e mantenha tudo sob controle.</p>
          </section>
          <section className="bg-blue-100 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Últimas Visitas</h2>
            <p className="text-blue-800">Veja o histórico das suas últimas visitas e registros.</p>
          </section>
        </div>
      </main>
      <footer className="mt-auto py-4 text-blue-900 text-sm">
        &copy; {new Date().getFullYear()} Preventiva. Todos os direitos reservados.
      </footer>
    </div>
    );
}