"use client";

import { useState } from "react";

interface ModalDescricaoDetalhadaProps {
  aberto: boolean;
  descricaoAtual: string;
  onClose: () => void;
  onSalvar: (novaDescricao: string) => void;
}

export default function ModalDescricaoDetalhada({
  aberto,
  descricaoAtual,
  onClose,
  onSalvar
}: ModalDescricaoDetalhadaProps) {
  const [texto, setTexto] = useState(descricaoAtual);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] w-[330px] p-6 rounded-3xl flex flex-col gap-4 text-white">

        <h2 className="text-center text-lg font-semibold">Descrição detalhada</h2>

        <textarea
          className="w-full h-40 p-3 bg-[#1C1E22] rounded-xl text-white resize-none outline-none"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button
          onClick={() => {
            onSalvar(texto);
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
