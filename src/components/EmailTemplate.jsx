function escapeHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderEmailHtml(options = {}) {
  const {
    email = "",
    phone = "",
    service = "",
    material = "",
    color = "",
    quantity = "",
    files = [], // array di nomi file
  } = options;

  const fileListHtml =
    files.length > 0
      ? files.map((f) => `<li>${escapeHtml(f)}</li>`).join("")
      : "Nessun file";

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Richiesta Preventivo 3DMLab</title>
    </head>

    <body style="font-family: Arial, Helvetica, sans-serif; margin:0; padding:0; background:#f5f7fa;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td align="center" style="padding:30px 10px;">
            <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden;">
              
              <!-- HEADER -->
              <tr>
                <td style="padding:24px; text-align:center; border-bottom:1px solid #eee;">
                  <!-- logo inline tramite CID -->
                  <img src="cid:logo3dmlab" alt="Logo" width="120" style="display:block; margin:0 auto 12px;"/>
                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:20px 28px; color:#333;">
                  
                  <h3 style="margin-top:0;">Riepilogo della tua richiesta</h3>
                  <p>Grazie per aver richiesto un preventivo. Qui sotto trovi tutte le informazioni che ci hai inviato:</p>

                  <table width="100%" style="border-collapse:collapse; margin-top:8px;">
                    <tr><td style="padding:6px 0; width:160px; color:#666;">Email</td><td>${escapeHtml(email)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Telefono</td><td>${escapeHtml(phone)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Servizio</td><td>${escapeHtml(service)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Materiale</td><td>${escapeHtml(material)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Colore</td><td>${escapeHtml(color || "—")}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Quantità</td><td>${escapeHtml(String(quantity))}</td></tr>
                    <tr>
                      <td style="padding:6px 0; color:#666; vertical-align:top;">File caricati</td>
                      <td><ul style="margin:0; padding-left:18px;">${fileListHtml}</ul></td>
                    </tr>
                  </table>

                  <p style="margin:18px 0 0; color:#666; font-size:13px;">
                    Verrai ricontattato entro 24h. Se desideri modificare il progetto o inviare nuove versioni dei file, rispondi pure a questa email.
                  </p>

                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="padding:14px 20px; text-align:center; background:#fafafa; border-top:1px solid #eee; color:#999; font-size:12px;">
                  © 3DMLab
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

module.exports = { renderEmailHtml };
