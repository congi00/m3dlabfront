import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderEmailHtml } from "@/components/EmailTemplate";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// In precedenza le richieste di preventivo venivano salvate come entry
// del content-type "quote" su Strapi. Ora vengono appese a un file JSON
// locale (append-only) sul filesystem del server. È una soluzione minimale
// pensata per un volume di richieste basso; se in futuro serve una vera
// persistenza (dashboard, ricerca, stato "inviato/in attesa", ecc.) questo
// file va sostituito con un database (es. SQLite locale o un servizio esterno).
const QUOTES_LOG_PATH = path.join(process.cwd(), "data", "quotes.json");

function appendQuoteToLog(entry) {
  try {
    const dir = path.dirname(QUOTES_LOG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let existing = [];
    if (fs.existsSync(QUOTES_LOG_PATH)) {
      const raw = fs.readFileSync(QUOTES_LOG_PATH, "utf-8");
      existing = raw ? JSON.parse(raw) : [];
    }

    existing.push(entry);
    fs.writeFileSync(QUOTES_LOG_PATH, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    // Il log locale è un "nice to have": se fallisce non deve bloccare
    // l'invio dell'email, che resta la notifica principale.
    console.error("Impossibile salvare la richiesta di preventivo su file:", err);
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const email = formData.get("email");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const material = formData.get("material");
    const color = formData.get("color") || "";
    const quantity = formData.get("quantity");
    const quote = formData.get("quote");
    const attachmentFile = formData.get("attachment");

    if (!email || !phone || !service || !material || !quantity) {
      return NextResponse.json(
        { success: false, error: "Dati mancanti nella richiesta." },
        { status: 400 }
      );
    }

    // L'allegato arriva direttamente come multipart, non serve più
    // caricarlo prima su Strapi: viene allegato subito alla mail.
    const attachments = [];
    let attachmentName = null;

    if (attachmentFile && typeof attachmentFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await attachmentFile.arrayBuffer());
      attachmentName = attachmentFile.name || "allegato";
      attachments.push({
        filename: attachmentName,
        content: buffer,
        contentType: attachmentFile.type || undefined,
      });
    }

    appendQuoteToLog({
      email,
      phone,
      service,
      material,
      color,
      quantity,
      quote,
      fileName: attachmentName,
      createdAt: new Date().toISOString(),
    });

    const html = renderEmailHtml({
      email,
      phone,
      service,
      material,
      color,
      quantity,
      files: attachmentName ? [attachmentName] : [],
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "info3dmlab@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const logoPath = path.join(process.cwd(), "public/logo.png");
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "logo.png",
        path: logoPath,
        cid: "logo3dmlab",
      });
    } else {
      console.warn("Logo non trovato in", logoPath);
    }

    const toRecipients = [
      email,
      process.env.GMAIL_USER || "info3dmlab@gmail.com",
    ].filter(Boolean);

    await transporter.sendMail({
      from: process.env.GMAIL_USER || "info3dmlab@gmail.com",
      to: toRecipients,
      subject: `Nuova richiesta preventivo da ${email}`,
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

