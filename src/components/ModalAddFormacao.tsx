"use client";

import { useState } from "react";

interface ModalAddFormacaoProps {
  aberto: boolean;
  onClose: () => void;
}

export default function ModalAddFormacao({
  aberto,
  onClose,
}: ModalAddFormacaoProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tempo, setTempo] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [certificado, setCertificado] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function handleImagem(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagem(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleCertificado(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setCertificado(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function salvarFormacao() {
    setLoading(true);

    const body = {
      titulo,
      descricao,
      descricao_detalhada: "",
      tempo,
      certificado: certificado || "",
      imagem: imagem || "",
    };

    const res = await fetch("/api/formacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      onClose();
      window.location.reload(); // recarrega o dashboard
    } else {
      alert("Erro ao salvar formação.");
    }
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] p-6 rounded-3xl w-[320px] flex flex-col gap-4 text-white">
        <h2 className="text-center text-lg font-semibold">Nova Formação / Curso</h2>

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
          Tempo / Duração:
          <input
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none"
            placeholder="Ex: 20h, 6 meses, 2 anos..."
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          />
        </label>

        {/* CERTIFICADO */}
        <label className="text-sm">
          Certificado (imagem ou PDF):
          <input
            type="file"
            accept="image/*,.pdf"
            className="mt-1"
            onChange={handleCertificado}
          />
        </label>

        {certificado && (
          <p className="text-xs text-green-200 mt-1">Certificado anexado ✔</p>
        )}

        {/* BOTÃO SALVAR */}
        <button
          onClick={salvarFormacao}
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
