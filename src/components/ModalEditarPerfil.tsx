"use client";

import { useState } from "react";

interface ModalEditarPerfilProps {
  aberto: boolean;
  nomeAtual: string;
  cargoAtual: string;
  descricaoAtual: string;
  onClose: () => void;
  onSalvar: (nome: string, cargo: string, descricao: string) => void;
}

export default function ModalEditarPerfil({
  aberto,
  nomeAtual,
  cargoAtual,
  descricaoAtual,
  onClose,
  onSalvar
}: ModalEditarPerfilProps) {
  const [nome, setNome] = useState(nomeAtual);
  const [cargo, setCargo] = useState(cargoAtual);
  const [descricao, setDescricao] = useState(descricaoAtual);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] p-6 rounded-3xl w-[320px] flex flex-col gap-4">
        <h2 className="text-center text-lg font-semibold text-white">Editar Perfil</h2>

        <label className="text-white text-sm">
          Nome:
          <input
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label className="text-white text-sm">
          Cargo:
          <input
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </label>

        <label className="text-white text-sm">
          Descrição:
          <textarea
            className="w-full p-2 mt-1 bg-[#1C1E22] text-white rounded-xl outline-none resize-none h-20"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        <button
          onClick={() => {
            onSalvar(nome, cargo, descricao);
            onClose();
          }}
          className="w-full py-2 bg-[#B5B6B8] text-black rounded-xl hover:bg-gray-300 transition"
        >
          Salvar
        </button>

        <button
          onClick={onClose}
          className="text-white text-sm hover:underline mx-auto mt-1"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
