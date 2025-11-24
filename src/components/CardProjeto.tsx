"use client";

import { useState } from "react";
import Image from "next/image";
import ModalEditarGeral from "./ModalEditarGeral";

interface CardProjetoProps {
  id: number;
  tipo: "projeto" | "curso" | "experiencia";
  titulo: string;
  descricao: string;
  imagem?: string;
  extras?: {
    tecnologias?: string;
    tempo?: string;
    github?: string;
    certificado?: string | null;
    descricaoDetalhada?: string;
  };
}

export default function CardProjeto({
  id,
  tipo,
  titulo,
  descricao,
  imagem,
  extras = {}
}: CardProjetoProps) {
  
  const [aberto, setAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  // Estado local que aparece no card
  const [tituloEdit, setTituloEdit] = useState(titulo);
  const [descEdit, setDescEdit] = useState(descricao);
  const [imgEdit, setImgEdit] = useState(imagem || "");

  const [tecEdit, setTecEdit] = useState(extras.tecnologias || "");
  const [tempoEdit, setTempoEdit] = useState(extras.tempo || "");
  const [githubEdit, setGithubEdit] = useState(extras.github || "");
  const [certEdit, setCertEdit] = useState(extras.certificado || "");
  const [detalhadaEdit, setDetalhadaEdit] = useState(
    extras.descricaoDetalhada || ""
  );

  // ============================
  //   PUT NO BANCO
  // ============================
  async function salvarEdicaoMySQL(val: any) {
    let rota = "";

    if (tipo === "projeto") rota = `/api/projetos/${id}`;
    if (tipo === "curso") rota = `/api/formacoes/${id}`;
    if (tipo === "experiencia") rota = `/api/experiencias/${id}`;

    // Agora usando os nomes CORRETOS que vêm do modal
    const body = {
      titulo: val.titulo,
      descricao: val.descricao,                    // CERTO
      descricao_detalhada: val.descricao_detalhada, // CERTO
      tecnologias: val.tecnologias,
      github: val.github,
      imagem: val.imagem
    };

    await fetch(rota, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // Atualizar frontend
    setTituloEdit(val.titulo);
    setDescEdit(val.descricao);
    setDetalhadaEdit(val.descricao_detalhada);
    setTecEdit(val.tecnologias);
    setGithubEdit(val.github);
    setImgEdit(val.imagem);

    if (tipo !== "projeto") {
      setTempoEdit(val.tempo || "");
      setCertEdit(val.certificado || "");
    }

    setModalAberto(false);
  }

  return (
    <div className="w-full flex flex-col gap-3">

      {/* CARD PRINCIPAL */}
      <button
        onClick={() => setAberto(!aberto)}
        className="bg-[#B5B6B8] w-full p-5 rounded-3xl flex items-center gap-4 text-left hover:scale-[1.01] transition"
      >

        {/* IMAGEM */}
        <div className="w-16 h-16 rounded-2xl bg-[#0D171A] overflow-hidden">
          {imgEdit && (
            <Image
              src={imgEdit}
              alt="Imagem"
              width={64}
              height={64}
              className="object-cover"
            />
          )}
        </div>

        {/* TEXTO */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-black break-words">
            {tituloEdit}
          </h2>
          <p className="text-sm text-black/70 break-words">{descEdit}</p>
        </div>
      </button>

      {/* EXPANSÃO */}
      {aberto && (
        <div className="bg-[#B5B6B8] w-full p-5 rounded-3xl text-black flex flex-col gap-2">

          {tipo === "projeto" && tecEdit && (
            <p><span className="font-semibold">Tecnologias:</span> {tecEdit}</p>
          )}

          {(tipo === "curso" || tipo === "experiencia") && tempoEdit && (
            <p><span className="font-semibold">Tempo:</span> {tempoEdit}</p>
          )}

          {tipo === "projeto" && githubEdit && (
            <p>
              <span className="font-semibold">GitHub:</span>{" "}
              <a href={githubEdit} target="_blank" className="underline text-blue-700">
                Abrir link
              </a>
            </p>
          )}

          {tipo === "curso" && certEdit && (
            <p>
              <span className="font-semibold">Certificado:</span>{" "}
              <a href={certEdit} download className="underline text-blue-700">
                Baixar arquivo
              </a>
            </p>
          )}

          {detalhadaEdit && (
            <p className="whitespace-pre-line">
              <span className="font-semibold">Descrição detalhada:</span>{" "}
              {detalhadaEdit}
            </p>
          )}

          {/* BOTÃO EDITAR */}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setModalAberto(true)}
              className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200 transition"
            >
              Editar
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <ModalEditarGeral
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        tipo={tipo}
        titulo={tituloEdit}
        descricaoCurta={descEdit}
        descricaoDetalhada={detalhadaEdit}
        tecnologias={tecEdit}
        tempo={tempoEdit}
        github={githubEdit}
        certificado={certEdit}
        imagem={imgEdit}
        id={id}
        onSalvar={salvarEdicaoMySQL}
      />
    </div>
  );
}
