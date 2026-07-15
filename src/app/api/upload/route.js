import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "File non trovato" },
        { status: 400 }
      );
    }

    const blob = await put(file.name, file, {
      access: "private",
    });

    return NextResponse.json({
      url: blob.url,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Errore upload sconosciuto",
      },
      {
        status: 500,
      }
    );
  }
}