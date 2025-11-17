import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { uploadFileToStrapi, createQuoteEntry } from "@/lib/strapi";
import { renderEmailHtml } from "@/components/EmailTemplate";


export async function POST(req) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    const file = formData.get("file");

    let uploadedFile = null;
    if (file && file.name) {
      uploadedFile = await uploadFileToStrapi(file);
    }
    await createQuoteEntry(data, uploadedFile);

    const html = renderEmailHtml({
      logoUrl: "https://3dmlab.it/logo.png", // Cambia con il tuo logo
      email: data.email,
      service: data.service,
      material: data.material,
      finish: data.finish,
      quantity: data.quantity,
      fileName: data.fileName || (uploadedFile && uploadedFile.name) || "",
      quote: data.quote,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info3dmlab@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    
    await transporter.sendMail({
      from: "info3dmlab@gmail.com",
      to: [data.email, "info3dmlab@gmail.com"],
      subject: `Nuovo preventivo da ${data.email}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore durante l’invio preventivo:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
