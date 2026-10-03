# Rastreamento de acessos e cliques

O site envia eventos de acesso às páginas e cliques nos botões do checkout para
`/api/track-event`. O endpoint encaminha cada evento ao Google Apps Script no
servidor; a URL do script não fica exposta no navegador. Se o registro de um
clique falhar, a navegação para o checkout continua normalmente.

## Atualizar o Apps Script

Como já existe uma implantação que registra cliques, substitua o código atual
do Apps Script por esta versão para que ele crie/atualize as abas `Cliques` e
`Acessos`:

```javascript
function safeCell(value) {
  var text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  var event = JSON.parse(e.postData.contents);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName;
  var headers;
  var row;

  if (event.type === "visit") {
    sheetName = "Acessos";
    headers = ["Data/hora", "País", "Página"];
    row = [
      safeCell(event.timestamp),
      safeCell(event.country),
      safeCell(event.pagePath),
    ];
  } else if (event.type === "click") {
    sheetName = "Cliques";
    headers = [
      "Data/hora",
      "ID do botão",
      "Texto do botão",
      "Página",
      "UTM source",
      "UTM medium",
      "UTM campaign",
      "UTM content",
      "UTM term",
    ];
    row = [
      safeCell(event.timestamp),
      safeCell(event.ctaId),
      safeCell(event.ctaLabel),
      safeCell(event.pagePath),
      safeCell(event.utmSource),
      safeCell(event.utmMedium),
      safeCell(event.utmCampaign),
      safeCell(event.utmContent),
      safeCell(event.utmTerm),
    ];
  } else {
    throw new Error("Tipo de evento inválido.");
  }

  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Em seguida, abra **Implantar > Gerenciar implantações**, edite a implantação
existente, selecione **Nova versão** e clique em **Implantar**. Mantenha as
permissões de execução/acesso que já estão funcionando e a mesma URL `/exec`.
Se o Google pedir, autorize o script novamente.

## Configurar o projeto

Defina `GOOGLE_SHEETS_WEB_APP_URL` com a URL copiada:

- Local: adicione a variável em `.env.local` e reinicie `npm run dev`.
- Vercel: adicione-a em **Settings > Environment Variables** e faça um novo deploy.

Depois de atualizar e implantar o Apps Script com o código acima, habilite também
`GOOGLE_SHEETS_VISITS_ENABLED=true` no `.env.local` e nas variáveis de ambiente da
hospedagem. Reinicie o servidor local e, na hospedagem, faça novo deploy. Até essa
opção ser habilitada, acessos são ignorados para não misturá-los na aba de cliques
da versão antiga do script.

Veja [.env.example](../.env.example) para o nome exato da variável. Não coloque a URL
em código client-side nem compartilhe a planilha publicamente.

Cada linha em `Acessos` registra data/hora UTC gerada pelo servidor, país inferido
pelos cabeçalhos de geolocalização da hospedagem e página. Em desenvolvimento local
ou quando o provedor não informa o país, será gravado `Não identificado`. `Cliques`
continua registrando os botões do checkout e os parâmetros UTM, quando presentes.
O país é aproximado e não são coletados endereços IP nem outros dados pessoais.
