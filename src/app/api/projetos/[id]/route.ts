import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  try {
    const id = params.id;
    const body = await req.json();

    console.log("BODY RECEBIDO:", body);

    const {
      titulo,
      descricao,               // vem do CardProjeto como "descricao"
      descricao_detalhada,     // vem do CardProjeto como "descricao_detalhada"
      tecnologias,
      github,
      imagem
    } = body;

    await db.query(
      `UPDATE projetos
       SET titulo = ?, descricao = ?, descricao_detalhada = ?, tecnologias = ?, github = ?, imagem = ?
       WHERE id = ?`,
      [titulo, descricao, descricao_detalhada, tecnologias, github, imagem, id]
    );

    return NextResponse.json({ message: "Projeto atualizado com sucesso." });

  } catch (err: any) {
    console.error("ERRO NO UPDATE:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
