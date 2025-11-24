"use client";

import { useState } from "react";

interface ModalEditarGeralProps {
  aberto: boolean;
  onClose: () => void;

  id: number;
  tipo: "projeto" | "curso" | "experiencia";

  titulo: string;
  descricaoCurta: string;
  descricaoDetalhada: string;

  tecnologias?: string;
  tempo?: string;
  github?: string;
  certificado?: string | null;
  imagem?: string | null;

  onSalvar: (valores: any) => void;
}

export default function ModalEditarGeral({
  id,
  aberto,
  onClose,
  tipo,
  titulo,
  descricaoCurta,
  descricaoDetalhada,
  tecnologias,
  tempo,
  github,
  certificado,
  imagem,
  onSalvar
}: ModalEditarGeralProps) {

  const [aba, setAba] = useState<"info" | "tecnico" | "arquivos">("info");

  const [tituloEdit, setTituloEdit] = useState(titulo);
  const [descCurtaEdit, setDescCurtaEdit] = useState(descricaoCurta);
  const [descDetalhadaEdit, setDescDetalhadaEdit] = useState(descricaoDetalhada);

  const [tecEdit, setTecEdit] = useState(tecnologias || "");
  const [tempoEdit, setTempoEdit] = useState(tempo || "");
  const [githubEdit, setGithubEdit] = useState(github || "");

  const [certEdit, setCertEdit] = useState(certificado || null);
  const [imgEdit, setImgEdit] = useState(imagem || null);

  function handleImagem(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImgEdit(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleCertificado(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setCertEdit(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#56767D] rounded-3xl w-[340px] p-6 text-white">

        <h1 className="text-xl font-semibold text-center">Editar Informações</h1>

        {/* ABAS */}
        <div className="flex mt-4 mb-4 border-b border-white/20">

          <button
            onClick={() => setAba("info")}
            className={`flex-1 py-2 ${aba === "info" ? "border-b-2 border-white font-bold" : "opacity-60"}`}
          >
            Básico
          </button>

          <button
            onClick={() => setAba("tecnico")}
            className={`flex-1 py-2 ${aba === "tecnico" ? "border-b-2 border-white font-bold" : "opacity-60"}`}
          >
            Técnico
          </button>

          <button
            onClick={() => setAba("arquivos")}
            className={`flex-1 py-2 ${aba === "arquivos" ? "border-b-2 border-white font-bold" : "opacity-60"}`}
          >
            Arquivos
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">

          {aba === "info" && (
            <>
              <label className="text-sm">
                Título:
                <input
                  className="w-full bg-[#1C1E22] p-2 rounded-xl mt-1"
                  value={tituloEdit}
                  onChange={(e) => setTituloEdit(e.target.value)}
                />
              </label>

              <label className="text-sm">
                Descrição curta:
                <textarea
                  className="w-full bg-[#1C1E22] p-2 rounded-xl mt-1 h-20 resize-none"
                  value={descCurtaEdit}
                  onChange={(e) => setDescCurtaEdit(e.target.value)}
                />
              </label>

              <label className="text-sm">
                Descrição detalhada:
                <textarea
                  className="w-full bg-[#1C1E22] p-2 rounded-xl mt-1 h-32 resize-none"
                  value={descDetalhadaEdit}
                  onChange={(e) => setDescDetalhadaEdit(e.target.value)}
                />
              </label>
            </>
          )}

          {aba === "tecnico" && (
            <>
              {tipo === "projeto" && (
                <label className="text-sm">
                  Tecnologias:
                  <input
                    className="w-full bg-[#1C1E22] p-2 rounded-xl mt-1"
                    value={tecEdit}
                    onChange={(e) => setTecEdit(e.target.value)}
                  />
                </label>
              )}

              {(tipo === "curso" || tipo === "experiencia") && (
                <label className="text-sm">
                  Tempo:
                  <input
                    className="w-full bg-[#1C1E22] p-2 rounded-xl mt-1"
                    value={tempoEdit}
                    onChange={(e) => setTempoEdit(e.target.value)}
                  />
                </label>
              )}

              {tipo === "projeto" && (
                <label className="text-sm">
                  GitHub:
                  <input
                    className="w-full bg-[#1C1E22] p-2 rounded-xl mt-1"
                    value={githubEdit}
                    onChange={(e) => setGithubEdit(e.target.value)}
                  />
                </label>
              )}
            </>
          )}

          {aba === "arquivos" && (
            <>
              <label className="text-sm">
                Imagem:
                <input type="file" accept="image/*" className="mt-1" onChange={handleImagem} />
              </label>

              {imgEdit && (
                <img src={imgEdit} className="w-full h-32 object-cover rounded-xl" />
              )}

              {tipo === "curso" && (
                <label className="text-sm">
                  Certificado:
                  <input type="file" accept=".pdf,image/*" className="mt-1" onChange={handleCertificado} />
                </label>
              )}

              {certEdit && tipo === "curso" && (
                <p className="text-xs text-green-300">✔ Certificado carregado</p>
              )}
            </>
          )}

        </div>

        <button
          onClick={() => {
            onSalvar({
              id,
              titulo: tituloEdit,
              descricao: descCurtaEdit,             // <-- nome certo para MySQL
              descricao_detalhada: descDetalhadaEdit,
              tecnologias: tecEdit,
              tempo: tempoEdit,
              github: githubEdit,
              certificado: certEdit,
              imagem: imgEdit
            });
            onClose();
          }}
          className="w-full py-2 bg-[#B5B6B8] text-black rounded-xl mt-6"
        >
          Salvar
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-white underline w-full text-center"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
