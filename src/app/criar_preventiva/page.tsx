'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Gauge, AlertTriangle, CheckCircle, StickyNote, ImagePlus, X } from 'lucide-react'
import Input from '@/components/Input'
import Textarea from '@/components/TextArea'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Menu from '@/components/Menu'

export default function CreatePreventiva() {
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const headerPadding = 'pl-24'
    const [form, setForm] = useState({
        nome: '',
        kilometragem_percorrida: '',
        irregularidades_encontradas: '',
        irregularidades_corrigidas: '',
        descricao: '',
        fotos: [] as File[],
    })
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setForm({ ...form, fotos: Array.from(e.target.files) })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Arquivo selecionado:", file);
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };  

    return (
         <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
            <Menu open={open} setOpen={setOpen} />
            <Header open={open} />
            <main className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch mt-8 transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"} ${headerPadding}`}>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-10 space-y-6"
                    >
                        <h1 className="text-4xl font-bold text-blue-800 text-center mb-4">
                            Criar Preventiva
                        </h1>

                        <Input
                            icon={<FileText />}
                            label="Nome"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                        />

                        <Input
                            icon={<Gauge />}
                            label="Kilometragem Percorrida"
                            name="kilometragem_percorrida"
                            value={form.kilometragem_percorrida}
                            onChange={handleChange}
                            required
                            type="number"
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                icon={<AlertTriangle />}
                                label="Irregularidades Encontradas"
                                name="irregularidades_encontradas"
                                value={form.irregularidades_encontradas}
                                onChange={handleChange}
                                required
                                type="number"
                            />
                            <Input
                                icon={<CheckCircle />}
                                label="Irregularidades Corrigidas"
                                name="irregularidades_corrigidas"
                                value={form.irregularidades_corrigidas}
                                onChange={handleChange}
                                required
                                type="number"
                            />
                        </div>

                        <Textarea
                            icon={<StickyNote />}
                            label="Descrição Técnica"
                            name="descricao"
                            value={form.descricao}
                            onChange={handleChange}
                            required
                        />

                        <div className="flex justify-center">
                            <div className="w-full max-w-lg">
                                {!imagePreview ? (
                                    <label className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#0F2976] transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
                                            <ImagePlus size={52} className="text-gray-400 mb-4" />
                                            <p className="text-[#3B4449] text-xl font-medium">
                                                Clique para adicionar uma foto
                                            </p>
                                            <p className="text-gray-500 text-sm mt-2">
                                                PNG, JPG ou JPEG (máx. 5MB)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview da viagem"
                                            className="w-full h-72 object-cover rounded-2xl shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors duration-200 shadow-lg cursor-pointer"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Linha divisória final */}
                        <div className="flex items-center justify-center mb-12">
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-4 rounded-md"
                            onClick={handleSubmit()}
                        >
                            Salvar Preventiva
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
