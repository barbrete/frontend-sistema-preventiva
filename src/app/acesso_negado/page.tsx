'use client'
import React, { useState } from 'react';
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import { Lock, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer';

export default function AcessoNegado() {
  const router = useRouter()
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
      <Menu open={open} setOpen={setOpen} />
      <Header open={open} />
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full border border-gray-200">
        <div className="flex justify-center mb-6">
          <Lock className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página. Caso acredite que isso é um erro,
          entre em contato com o administrador do sistema.
        </p>
        <button
          onClick={() => router.push('/pagina_principal')}
          className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para página principal
        </button>
      </div>

      <p className="mt-10 text-sm text-gray-400">Erro 403 – Forbidden</p>
    </div>
          <Footer/>

    </div>
  )
}