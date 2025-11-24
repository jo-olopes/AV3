"use client";

import { useState } from "react";

interface ModalAddExperienciaProps {
  aberto: boolean;
  onClose: () => void;
  onSalvar: (exp: {
    titulo: string;
    descricao: string;
    tempo: string;
    imagem: string | null;
    descricaoDetalhada: string;
  }) => void;
}

export default function ModalAddExperiencia({
  aberto,
  onClose,
  onSalvar
}: ModalAddExperienciaProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tempo, setTempo] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  function handleImagem(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagem(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] p-6 rounded-3xl w-[320px] flex flex-col gap-4 text-white">
        
        <h2 className="text-center text-lg font-semibold">
          Nova Experiência Profissional
        </h2>

        {/* TÍTULO */}
        <label className="text-sm">
          Empresa:
          <input
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        {/* IMAGEM */}
        <label className="text-sm">
          Imagem principal:
          <input
            type="file"
            accept="image/*"
            className="mt-1"
            onChange={handleImagem}
          />
        </label>

        {imagem && (
          <img
            src={imagem}
            alt="Preview"
            className="w-full h-32 object-cover rounded-xl border border-white/20"
          />
        )}

        {/* DESCRIÇÃO */}
        <label className="text-sm">
          Cargo:
          <textarea
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none resize-none h-20"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        {/* TEMPO */}
        <label className="text-sm">
          Tempo trabalhando:
          <input
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none"
            placeholder="Ex: 2019–2021, 8 meses..."
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          />
        </label>

        {/* BOTÕES */}
        <button
          onClick={() => {
            onSalvar({ titulo, descricao, tempo, imagem, descricaoDetalhada: "" });
            onClose();
          }}
          className="w-full py-2 bg-[#B5B6B8] text-black rounded-xl hover:bg-gray-300 transition"
        >
          Salvar
        </button>

        <button
          onClick={onClose}
          className="text-sm text-white hover:underline mx-auto"
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}
