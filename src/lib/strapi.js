

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;


async function uploadFileToStrapi(files) {
  if (!files) return [];

  const fileArray = Array.isArray(files) ? files : [files];
  const uploadedFiles = [];

  for (const file of fileArray) {
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
    if (Array.isArray(json.data) && json.data.length > 0) {
      uploadedFiles.push(json.data[0].attributes);
    }
  }

  return uploadedFiles;
}



async function createQuoteEntry(data, uploadedFiles = []) {
  const payload = {
    data: {
      email: data.email,
      phone: String(data.phone),
      service: data.service,
      material: data.material,
      color: data.color,
      quantity: data.quantity,
      quote: data.quote,
      fileNames: uploadedFiles.map(f => f.name || "").join(", "), 
    },
  };

  if (uploadedFiles.length > 0) {
    payload.data.attachments = uploadedFiles.map((f) => f.id);
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
