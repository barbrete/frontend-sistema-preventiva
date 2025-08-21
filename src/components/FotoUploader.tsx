import { ImagePlus, X } from "lucide-react";

interface FotoUploaderProps {
  fotos: { file: File, descricao: string }[];
  onChange: (fotos: { file: File, descricao: string }[]) => void;
  label?: string;
  qtdMaxFotos?: number;
}


export default function FotoUploader({ fotos, onChange, label, qtdMaxFotos }: FotoUploaderProps) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (fotos.length + files.length > qtdMaxFotos) {
      alert(`Você pode enviar no máximo ${qtdMaxFotos} fotos.`);
      return;
    }
    const novas = files.map(file => ({ file, descricao: "" }));
    onChange([...fotos, ...novas]);
  };
  const handleDescricaoChange = (idx: number, descricao: string) => {
    const novas = fotos.map((foto, i) =>
      i === idx ? { ...foto, descricao } : foto
    );
    onChange(novas);
  };
  return (
    <div className="mb-8">
      {label && (
        <label className="block text-lg font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-4 flex-wrap">
        {fotos.map((foto, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            <img
              src={URL.createObjectURL(foto.file)}
              alt={`Foto ${idx + 1}`}
              className="w-32 h-32 object-cover rounded-2xl shadow-lg"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={foto.descricao}
              onChange={e => handleDescricaoChange(idx, e.target.value)}
              className="mt-2 w-32 p-1 border rounded"
              maxLength={100}
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

        {(!qtdMaxFotos || fotos.length < qtdMaxFotos) && (
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