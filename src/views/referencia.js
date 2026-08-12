const refData = [
  {
    title: "arquiteturas principais",
    tag: "eng",
    items: [
      { term: "monolito", desc: "Uma base de código só, um deploy único. Simples de começar; caro de escalar por time." },
      { term: "microsserviços", desc: "Serviços independentes, deploy separado, comunicação via API/fila. Ganha escala, perde em complexidade operacional." },
      { term: "clean architecture", desc: "Camadas concêntricas: entidades → casos de uso → adaptadores → frameworks. Dependência sempre aponta pra dentro." },
      { term: "hexagonal", desc: "Domínio isolado por portas e adaptadores. Troca infra sem tocar na regra de negócio." },
      { term: "event-driven", desc: "Comunicação assíncrona via eventos (Kafka, SQS). Desacopla produtor de consumidor." },
      { term: "mvc", desc: "Model-View-Controller. Base da maioria dos frameworks web." }
    ]
  },
  {
    title: "crud & rest",
    tag: "eng",
    items: [
      { term: "create", desc: "<code>POST</code> — não idempotente." },
      { term: "read", desc: "<code>GET</code> — idempotente, sem efeito colateral." },
      { term: "update", desc: "<code>PUT</code> substitui inteiro. <code>PATCH</code> altera parcial." },
      { term: "delete", desc: "<code>DELETE</code> — idempotente." },
      { term: "status codes", desc: "<code>200</code> ok · <code>201</code> criado · <code>204</code> sem conteúdo · <code>400</code> inválido · <code>401</code> não autenticado · <code>403</code> proibido · <code>404</code> não existe · <code>409</code> conflito · <code>500</code> erro servidor." }
    ]
  },
  {
    title: "checklist de segurança",
    tag: "sec",
    items: [
      { term: "nunca confie no cliente", desc: "Validação sempre no servidor." },
      { term: "injection", desc: "Prepared statements sempre, nunca concatenar input." },
      { term: "xss", desc: "Sanitizar output, usar CSP." },
      { term: "autenticação", desc: "Hash com <code>bcrypt</code>/<code>argon2</code>, rate limit, MFA." },
      { term: "autorização", desc: "Menor privilégio, checar permissão sempre no backend." },
      { term: "segredos", desc: "Nunca em código-fonte. Env vars ou secrets manager." },
      { term: "transporte", desc: "HTTPS + HSTS sempre." },
      { term: "logs", desc: "Nunca senha/token em texto puro." }
    ]
  }
];

export function renderReferencia() {
  return `
    <div class="referencia-container">
      <header class="view-header">
        <p class="panel-eyebrow">cat referencia-rapida.md</p>
        <h1 class="section-title">referência rápida</h1>
        <p class="section-desc">Coisas pra não esquecer. Engenharia e segurança, resumidas.</p>
      </header>

      ${refData.map((group, gi) => `
        <details class="ref-group" ${gi === 0 ? 'open' : ''}>
          <summary>${group.title} <span class="ref-tag">${group.tag}</span></summary>
          <div class="ref-items">
            ${group.items.map(item => `
              <div class="ref-item">
                <div class="ref-term">${item.term}</div>
                <div class="ref-desc">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        </details>
      `).join('')}
    </div>
  `;
}

export function mountReferencia() {
  // No dynamic logic needed for this view
}
