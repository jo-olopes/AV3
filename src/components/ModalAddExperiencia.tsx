"use client";

import { useState } from "react";

interface ModalAddExperienciaProps {
  aberto: boolean;
  onClose: () => void;
}

export default function ModalAddExperiencia({
  aberto,
  onClose,
}: ModalAddExperienciaProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tempo, setTempo] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // IMAGEM
  function handleImagem(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagem(reader.result as string);
    reader.readAsDataURL(file);
  }

  // SALVAR
  async function salvarExperiencia() {
    setLoading(true);

    const body = {
      titulo,
      descricao,
      tempo,
      descricao_detalhada: "",
      imagem: imagem || "",
    };

    const res = await fetch("/api/experiencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      onClose();
      window.location.reload(); // recarrega o dashboard com os novos dados
    } else {
      alert("Erro ao salvar experiência.");
    }
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] p-6 rounded-3xl w-[320px] flex flex-col gap-4 text-white">
        <h2 className="text-center text-lg font-semibold">Nova Experiência</h2>

        {/* TÍTULO */}
        <label className="text-sm">
          Título:
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
          Descrição:
          <textarea
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none resize-none h-20"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        {/* TEMPO */}
        <label className="text-sm">
          Tempo trabalhado:
          <input
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none"
            placeholder="Ex: 1 ano e 3 meses"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          />
        </label>

        {/* BOTÃO SALVAR */}
        <button
          onClick={salvarExperiencia}
          disabled={loading}
          className="w-full py-2 bg-[#B5B6B8] text-black rounded-xl hover:bg-gray-300 transition disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>

        {/* CANCELAR */}
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
