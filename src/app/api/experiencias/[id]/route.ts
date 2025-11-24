import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  try {
    const id = params.id;
    const body = await req.json();

    const { titulo, descricao, descricao_detalhada, tempo, imagem } = body;

    await db.query(
      `UPDATE experiencias
       SET titulo=?, descricao=?, descricao_detalhada=?, tempo=?, imagem=?
       WHERE id=?`,
      [titulo, descricao, descricao_detalhada, tempo, imagem, id]
    );

    return NextResponse.json({ message: "Experiência atualizada." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
