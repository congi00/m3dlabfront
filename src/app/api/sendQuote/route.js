import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createQuoteEntry } from "@/lib/strapi";
import { renderEmailHtml } from "@/components/EmailTemplate";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    // riceviamo JSON dal client (metadati + uploadedFile)
    const data = await req.json();

    // data.uploadedFile dovrebbe essere l'oggetto restituito da Strapi con almeno: { id, name, url, mime }
    const uploadedFile = data.uploadedFile || null;
    const uploadedFilesArray = uploadedFile ? [uploadedFile] : [];

    // crea entry nel CMS (adatta createQuoteEntry al tuo schema)
    await createQuoteEntry(data, uploadedFilesArray);

    // ---- CREA HTML EMAIL ----
    const html = renderEmailHtml({
      email: data.email,
      phone: data.phone,
      service: data.service,
      material: data.material,
      color: data.color,
      quantity: data.quantity,
      files: uploadedFilesArray.map((f) => f.name || "file"),
      // logo will be embedded with cid 'logo3dmlab'
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "info3dmlab@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Prepariamo gli attachments:
    const attachments = [];

    // 1) Logo inline (cid)
    // Usa il file logo caricato in /mnt/data/logo.svg (fornito)
    const logoPath = path.join(process.cwd(), "public/logo.png");
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "logo.png",
        path: logoPath,
        cid: "logo3dmlab",
      });
    } else {
      // se non esiste il file, non falliamo: nascerà l'email senza logo inline
      console.warn("Logo non trovato in", logoPath);
    }

    // 2) File dell'utente: scarichiamo il file da Strapi (URL contenuto in uploadedFile.url)
    if (uploadedFilesArray.length > 0) {
      for (const file of uploadedFilesArray) {
        if (file.url) {
          try {
            const resp = await fetch(file.url);
            if (resp.ok) {
              const arrayBuffer = await resp.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              attachments.push({
                filename: file.name || "attachment",
                content: buffer,
                contentType: file.mime || undefined,
              });
            } else {
              console.warn(
                "Impossibile scaricare file da Strapi:",
                resp.status
              );
            }
          } catch (err) {
            console.error("Errore scaricamento file da Strapi:", err);
          }
        }
      }
    }

    // Invio email a utente e a info3dmlab
    const toRecipients = [
      data.email,
      process.env.GMAIL_USER || "info3dmlab@gmail.com",
    ].filter(Boolean);

    await transporter.sendMail({
      from: process.env.GMAIL_USER || "info3dmlab@gmail.com",
      to: toRecipients,
      subject: `Nuova richiesta preventivo da ${data.email}`,
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore durante l'invio del preventivo:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
