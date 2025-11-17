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
    logoUrl = "https://tuodominio.it/logo.png",
    email = "",
    service = "",
    material = "",
    finish = "",
    quantity = "",
    fileName = "",
    quote = "0.00",
  } = options;

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Preventivo 3DMLab</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; margin:0; padding:0; background:#f5f7fa;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td align="center" style="padding:30px 10px;">
            <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden;">
              <tr>
                <td style="padding:24px; text-align:center; border-bottom:1px solid #eee;">
                  <img src="${escapeHtml(logoUrl)}" alt="Logo" width="120" style="display:block; margin:0 auto 12px;"/>
                  <h2 style="margin:0; font-size:18px; letter-spacing:1px;">DI MANCINI ANDREA</h2>
                </td>
              </tr>

              <tr>
                <td style="padding:20px 28px; color:#333;">
                  <h3 style="margin-top:0;">Riepilogo del preventivo</h3>
                  <p>Grazie per aver richiesto un preventivo. Qui sotto trovi il riepilogo:</p>

                  <table width="100%" style="border-collapse:collapse; margin-top:8px;">
                    <tr><td style="padding:6px 0; width:160px; color:#666;">Email</td><td>${escapeHtml(email)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Servizio</td><td>${escapeHtml(service)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Materiale</td><td>${escapeHtml(material)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Finitura</td><td>${escapeHtml(finish)}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">Quantità</td><td>${escapeHtml(String(quantity))}</td></tr>
                    <tr><td style="padding:6px 0; color:#666;">File</td><td>${escapeHtml(fileName)}</td></tr>
                  </table>

                  <div style="margin-top:20px; padding:12px; background:#f0f4ff; border-radius:8px; text-align:center;">
                    <p style="margin:0; color:#2b3674; font-weight:600;">Totale stimato</p>
                    <p style="margin:6px 0 0; font-size:20px; font-weight:700;">€ ${escapeHtml(String(quote))}</p>
                  </div>

                  <p style="margin:18px 0 0; color:#666; font-size:13px;">
                    Verrai ricontattato entro 24h. Se vuoi procedere con l'ordine o modificare i parametri, rispondi pure a questa email o visita il nostro sito.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:14px 20px; text-align:center; background:#fafafa; border-top:1px solid #eee; color:#999; font-size:12px;">
                  © 3DMLab - DI MANCINI ANDREA
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
