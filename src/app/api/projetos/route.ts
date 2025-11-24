import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// ======================
// GET → listar projetos
// ======================
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM projetos ORDER BY id DESC");

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao buscar projetos", detalhe: err.message },
      { status: 500 }
    );
  }
}


// ======================
// POST → criar projeto
// ======================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      titulo,
      descricao,
      descricao_detalhada,
      tecnologias,
      github,
      imagem,
    } = body;

    // validação mínima
    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios." },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO projetos 
      (titulo, descricao, descricao_detalhada, tecnologias, github, imagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      titulo,
      descricao,
      descricao_detalhada || "",
      tecnologias || "",
      github || "",
      imagem || "",
    ];

    await db.query(query, values);

    return NextResponse.json({ message: "Projeto criado com sucesso!" });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao criar projeto", detalhe: err.message },
      { status: 500 }
    );
  }
}
