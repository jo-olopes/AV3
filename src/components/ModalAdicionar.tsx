"use client";

interface ModalAdicionarProps {
  aberto: boolean;
  onClose: () => void;
  onAddProjeto: () => void;
  onAddFormacao: () => void;
  onAddExperiencia: () => void;
}

export default function ModalAdicionar({
  aberto,
  onClose,
  onAddProjeto,
  onAddFormacao,
  onAddExperiencia
}: ModalAdicionarProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] p-6 rounded-3xl w-[300px] flex flex-col gap-4">
        
        <h2 className="text-center text-lg font-semibold text-white mb-2">
          Adicionar
        </h2>

        <button
          onClick={onAddProjeto}
          className="w-full py-3 bg-[#B5B6B8] text-black rounded-xl hover:bg-gray-300 transition"
        >
          Projeto
        </button>

        <button
          onClick={onAddFormacao}
          className="w-full py-3 bg-[#B5B6B8] text-black rounded-xl hover:bg-gray-300 transition"
        >
          Formação / Curso
        </button>

        <button
          onClick={onAddExperiencia}
          className="w-full py-3 bg-[#B5B6B8] text-black rounded-xl hover:bg-gray-300 transition"
        >
          Experiência Profissional
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-white text-sm hover:underline mx-auto"
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}
