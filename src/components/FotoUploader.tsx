import { ImagePlus, X } from "lucide-react";

interface FotoUploaderProps {
  fotos: File[];
  onChange: (files: File[]) => void;
  label?: string;
  qtdMaxFotos?: number;
  qtdMinFotos?: number;
}

export default function FotoUploader({ fotos, onChange, label, qtdMaxFotos = 5 }: FotoUploaderProps) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (fotos.length + files.length > qtdMaxFotos) {
      alert(`Você pode enviar no máximo ${qtdMaxFotos} fotos.`);
      return;
    }
    onChange([...fotos, ...files]);
  };

  return (
    <div className="mb-8">
      {label && (
        <label className="block text-lg font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-4 flex-wrap">
        {fotos.map((file, idx) => (
          <div key={idx} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Foto ${idx + 1}`}
              className="w-32 h-32 object-cover rounded-2xl shadow-lg"
            />
            <button
              type="button"
              onClick={() => {
                const novasFotos = fotos.filter((_, i) => i !== idx);
                onChange(novasFotos);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {fotos.length < qtdMaxFotos && (
          <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-200">
            <ImagePlus 
                size={32}
                className="text-gray-400"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-gray-500 text-sm mt-2">
        {fotos.length}/{qtdMaxFotos} fotos selecionadas
      </p>
    </div>
  );
}