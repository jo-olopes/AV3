import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // faz uma consulta simples
    const [rows] = await db.query("SELECT 1 + 1 AS resultado");

    return NextResponse.json({
      message: "Conexão bem-sucedida!",
      resultado: rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Erro ao conectar no MySQL",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
