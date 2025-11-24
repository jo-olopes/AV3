import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ====================================
// GET → Listar formações/cursos
// ====================================
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM formacoes ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao buscar formacoes", detalhe: err.message },
      { status: 500 }
    );
  }
}

// ====================================
// POST → Criar formação/curso
// ====================================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      titulo,
      descricao,
      descricao_detalhada,
      tempo,
      certificado,
      imagem,
    } = body;

    if (!titulo || !descricao) {
      return NextResponse.json(
        { error: "Título e descrição são obrigatórios." },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO formacoes 
      (titulo, descricao, descricao_detalhada, tempo, certificado, imagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      titulo,
      descricao,
      descricao_detalhada || "",
      tempo || "",
      certificado || "",
      imagem || "",
    ];

    await db.query(query, values);

    return NextResponse.json({ message: "Formação criada com sucesso!" });

  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao criar formação", detalhe: err.message },
      { status: 500 }
    );
  }
}
