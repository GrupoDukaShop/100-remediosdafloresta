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
  var values;

  if (event.type === "visit") {
    sheetName = "Acessos";
    headers = ["Data/hora", "País", "Página", "Origem", "UTM medium", "UTM campaign"];
    values = {
      "Data/hora": event.timestamp,
      "País": event.country,
      "Página": event.pagePath,
      "Origem": event.source,
      "UTM medium": event.utmMedium,
      "UTM campaign": event.utmCampaign,
    };
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
      "Origem",
    ];
    values = {
      "Data/hora": event.timestamp,
      "ID do botão": event.ctaId,
      "Texto do botão": event.ctaLabel,
      "Página": event.pagePath,
      "UTM source": event.utmSource,
      "UTM medium": event.utmMedium,
      "UTM campaign": event.utmCampaign,
      "UTM content": event.utmContent,
      "UTM term": event.utmTerm,
      "Origem": event.source,
    };
  } else {
    throw new Error("Tipo de evento inválido.");
  }

  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

  var existingHeaders = [];
  if (sheet.getLastRow() > 0 && sheet.getLastColumn() > 0) {
    existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  }

  if (existingHeaders.length === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    existingHeaders = headers;
  } else {
    var missingHeaders = headers.filter(function (header) {
      return existingHeaders.indexOf(header) === -1;
    });
    if (missingHeaders.length > 0) {
      sheet.getRange(1, existingHeaders.length + 1, 1, missingHeaders.length).setValues([missingHeaders]);
      existingHeaders = existingHeaders.concat(missingHeaders);
    }
  }

  var row = existingHeaders.map(function (header) {
    return safeCell(values[header]);
  });
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Em seguida, abra **Implantar > Gerenciar implantações**, edite a implantação
existente, selecione **Nova versão** e clique em **Implantar**. Mantenha as
permissões de execução/acesso que já estão funcionando e a mesma URL `/exec`.
O script adiciona os novos cabeçalhos `Origem`, `UTM medium` e `UTM campaign`
ao fim das abas existentes, sem apagar os dados anteriores. Se o Google pedir,
autorize o script novamente.

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
pelos cabeçalhos de geolocalização da hospedagem, página, origem e campanha. Em
`Cliques`, também fica registrada a origem junto aos botões e parâmetros UTM. A origem
prioriza `utm_source`, usa o domínio de referência externo como alternativa e preserva
a atribuição durante a sessão. Para apps sociais que ocultam o referenciador, use links
com UTM, por exemplo:

- Instagram: `https://SEU-DOMINIO/?utm_source=instagram&utm_medium=social&utm_campaign=perfil`
- Facebook: `https://SEU-DOMINIO/?utm_source=facebook&utm_medium=social&utm_campaign=perfil`

Troque `SEU-DOMINIO` pelo endereço público do site. Se não houver UTM nem referenciador,
a origem será `Acesso direto/sem identificação`. Em desenvolvimento local ou quando o
provedor não informa o país, será gravado `Não identificado`. O país é aproximado e
não são coletados endereços IP nem outros dados pessoais.
