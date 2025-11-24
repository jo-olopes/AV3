"use client";

import { useState } from "react";
import Image from "next/image";
import CardProjeto from "@/components/CardProjeto";
import ModalAdicionar from "@/components/ModalAdicionar";
import ModalEditarPerfil from "@/components/ModalEditarPerfil";
import ModalAddProjeto from "@/components/ModalAddProjeto";
import ModalAddFormacao from "@/components/ModalAddFormacao";
import ModalAddExperiencia from "@/components/ModalAddExperiencia";

export default function DashboardPage() {
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  // ESTADOS DO PERFIL
  const [nome, setNome] = useState("Nome Completo");
  const [cargo, setCargo] = useState("Cargo Profissional");
  const [descricao, setDescricao] = useState("Pequena descrição pessoal");

  // Projetos
  const [modalAddProjetoAberto, setModalAddProjetoAberto] = useState(false);
  const [projetos, setProjetos] = useState<any[]>([]);

  // Formações
  const [modalAddFormacaoAberto, setModalAddFormacaoAberto] = useState(false);
  const [formacoes, setFormacoes] = useState<any[]>([]);

  // Experiências
  const [modalAddExperienciaAberto, setModalAddExperienciaAberto] = useState(false);
  const [experiencias, setExperiencias] = useState<any[]>([]);

  function handleSalvarPerfil(novoNome: string, novoCargo: string, novaDescricao: string) {
    setNome(novoNome);
    setCargo(novoCargo);
    setDescricao(novaDescricao);
  }

  return (
    <main className="min-h-screen bg-[#52555A] p-6 flex flex-col items-center">
      
      {/* ---------- HEADER ---------- */}
      <div className="w-full max-w-2xl flex items-start gap-4 mb-10 relative">

        {/* Foto */}
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
          <Image
            src="/foto-perfil.png"
            alt="Foto de perfil"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        {/* Nome + Cargo + Descrição */}
        <div className="flex flex-col text-white">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{nome}</h1>
            <span className="text-sm bg-[#B5B6B8] text-black px-3 py-1 rounded-lg">
              {cargo}
            </span>
          </div>

          <p className="text-sm mt-1">{descricao}</p>
        </div>

        {/* BOTÃO EDITAR */}
        <button
          onClick={() => setModalEditarAberto(true)}
          className="absolute top-0 right-0 text-sm bg-[#B5B6B8] text-black px-3 py-1 rounded-xl hover:bg-gray-300 transition"
        >
          Editar
        </button>
      </div>

      {/* ---------- PROJETOS ---------- */}
      <h2 className="text-white text-lg font-semibold w-full max-w-2xl mb-4">Projetos</h2>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {projetos.map((p, i) => (
          <CardProjeto
            key={i}
            tipo="projeto"
            titulo={p.titulo}
            descricao={p.descricao}
            imagem={p.imagem}
            extras={{
              tecnologias: p.tecnologias,
              github: p.github,
              descricaoDetalhada: p.descricaoDetalhada
            }}
          />
        ))}
      </div>

      {/* ---------- FORMAÇÕES ---------- */}
      <h2 className="text-white text-lg font-semibold w-full max-w-2xl mt-10 mb-4">
        Formação / Cursos
      </h2>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {formacoes.map((f, i) => (
          <CardProjeto
            key={i}
            tipo="curso"
            titulo={f.titulo}
            descricao={f.descricao}
            imagem={f.imagem}
            extras={{
              tempo: f.tempo,
              certificado: f.certificado,
              descricaoDetalhada: f.descricaoDetalhada
            }}
          />
        ))}
      </div>

      {/* ---------- EXPERIÊNCIAS ---------- */}
      <h2 className="text-white text-lg font-semibold w-full max-w-2xl mt-10 mb-4">
        Experiências Profissionais
      </h2>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {experiencias.map((e, i) => (
          <CardProjeto
            key={i}
            tipo="experiencia"
            titulo={e.titulo}
            descricao={e.descricao}
            imagem={e.imagem}
            extras={{
              tempo: e.tempo,
              descricaoDetalhada: e.descricaoDetalhada
            }}
          />
        ))}
      </div>

      {/* BOTÃO ADICIONAR */}
      <button
        onClick={() => setModalAdicionarAberto(true)}
        className="mt-10 w-14 h-14 bg-[#B5B6B8] rounded-2xl flex items-center justify-center text-3xl text-black hover:bg-gray-400 transition"
      >
        +
      </button>

      {/* MODAIS */}
      <ModalAdicionar
        aberto={modalAdicionarAberto}
        onClose={() => setModalAdicionarAberto(false)}
        onAddProjeto={() => {
          setModalAdicionarAberto(false);
          setModalAddProjetoAberto(true);
        }}
        onAddFormacao={() => {
          setModalAdicionarAberto(false);
          setModalAddFormacaoAberto(true);
        }}
        onAddExperiencia={() => {
          setModalAdicionarAberto(false);
          setModalAddExperienciaAberto(true);
        }}
      />

      <ModalAddProjeto
        aberto={modalAddProjetoAberto}
        onClose={() => setModalAddProjetoAberto(false)}
        onSalvar={(novoProjeto) => {
          setProjetos([...projetos, novoProjeto]);
        }}
      />

      <ModalAddFormacao
        aberto={modalAddFormacaoAberto}
        onClose={() => setModalAddFormacaoAberto(false)}
        onSalvar={(novaFormacao) => {
          setFormacoes([...formacoes, novaFormacao]);
        }}
      />

      <ModalAddExperiencia
        aberto={modalAddExperienciaAberto}
        onClose={() => setModalAddExperienciaAberto(false)}
        onSalvar={(novaExp) => {
          setExperiencias([...experiencias, novaExp]);
        }}
      />

      <ModalEditarPerfil
        aberto={modalEditarAberto}
        nomeAtual={nome}
        cargoAtual={cargo}
        descricaoAtual={descricao}
        onClose={() => setModalEditarAberto(false)}
        onSalvar={handleSalvarPerfil}
      />

    </main>
  );
}
