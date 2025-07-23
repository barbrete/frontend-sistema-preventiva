'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, SearchX } from 'lucide-react'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function NotFoundPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
        <Menu open={open} setOpen={setOpen} />
        <Header open={open} />
       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6 py-16 text-center mt-16">
      <div className="max-w-lg w-full bg-white shadow-xl border border-gray-200 rounded-2xl p-8 space-y-6">
        <div className="flex justify-center">
          <Image
            src="/404.png" 
            alt="Página não encontrada"
            width={220}
            height={220}
            className="object-contain"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-gray-600 text-sm">
          A página que você está procurando não existe ou foi movida. <br />
          Verifique o endereço ou volte para a página inicial.
        </p>

        <button
          onClick={() => router.push('/pagina_principal')}
          className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium rounded-md shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para página principal
        </button>
      </div>

      <div className="mt-10 text-sm text-gray-400 flex items-center gap-2">
        <SearchX className="w-4 h-4" />
        Erro 404 — Not Found
      </div>
    </div>
    <Footer/>
    </div>
  )
}
