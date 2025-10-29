// lib/strapi.js
// Helper per gestire upload file e creazione quote su Strapi

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL; // es: https://tuo-strapi.it
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN; // Token API Strapi

// 🔹 Upload file su Strapi
async function uploadFileToStrapi(file) {
  if (!file) return null;

  const fd = new FormData();
  fd.append("files", file, file.name);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: fd,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upload file fallito: ${res.status} ${txt}`);
  }

  const json = await res.json();
  return Array.isArray(json) && json.length ? json[0] : json;
}

// 🔹 Crea nuova entry “quote” in Strapi
async function createQuoteEntry(data, uploadedFile) {
  const payload = {
    data: {
      email: data.email,
      service: data.service,
      material: data.material,
      finish: data.finish,
      quantity: data.quantity,
      quote: data.quote,
      fileName: data.fileName || (uploadedFile && uploadedFile.name) || null,
    },
  };

  // Se hai un campo media in Strapi chiamato "attachment"
  if (uploadedFile && uploadedFile.id) {
    payload.data.attachment = uploadedFile.id;
  }

  const res = await fetch(`${STRAPI_URL}/api/quotes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Creazione quote fallita: ${res.status} ${txt}`);
  }

  return await res.json();
}

module.exports = {
  uploadFileToStrapi,
  createQuoteEntry,
};
