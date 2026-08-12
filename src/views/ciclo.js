export function renderCiclo() {
  return `
    <div class="ciclo-container">
      <header class="view-header">
        <p class="panel-eyebrow">cat ciclo-de-vida.svg</p>
        <h1 class="section-title">o ciclo, em loop</h1>
        <p class="section-desc">As mesmas cinco etapas se repetem a cada feature — o teste com mock muda tudo.</p>
      </header>

      <div class="ciclo-svg-wrap">
        <svg viewBox="0 0 700 524" width="100%" role="img" aria-label="Ciclo: planejamento, design, teste com mock, codificação, acompanhamento, voltando ao início">
          <defs>
            <marker id="arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#8d97a8" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker>
            <marker id="arw-accent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#4fc3ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker>
          </defs>
          <g style="font-family:var(--sans)">
            <rect x="20" y="20" width="560" height="64" rx="8" fill="#131924" stroke="#212a38"/>
            <text x="300" y="42" text-anchor="middle" fill="#eef1f6" font-size="14" font-weight="600">1. planejamento</text>
            <text x="300" y="62" text-anchor="middle" fill="#8d97a8" font-size="12">arquitetura, domínio, CLAUDE.md</text>
          </g>
          <line x1="300" y1="84" x2="300" y2="120" stroke="#8d97a8" stroke-width="1" marker-end="url(#arw)"/>
          <g style="font-family:var(--sans)">
            <rect x="20" y="120" width="560" height="64" rx="8" fill="#131924" stroke="#212a38"/>
            <text x="300" y="142" text-anchor="middle" fill="#eef1f6" font-size="14" font-weight="600">2. design</text>
            <text x="300" y="162" text-anchor="middle" fill="#8d97a8" font-size="12">divisão em serviços, escopo dos testes</text>
          </g>
          <line x1="300" y1="184" x2="300" y2="220" stroke="#8d97a8" stroke-width="1" marker-end="url(#arw)"/>
          <g style="font-family:var(--sans)">
            <rect x="20" y="220" width="560" height="64" rx="8" fill="#132631" stroke="#4fc3ff" stroke-width="1.2"/>
            <text x="300" y="242" text-anchor="middle" fill="#4fc3ff" font-size="14" font-weight="700">3. teste + mock</text>
            <text x="300" y="262" text-anchor="middle" fill="#a9d4ec" font-size="12">mocka o que ainda não existe, testa antes</text>
          </g>
          <line x1="300" y1="284" x2="300" y2="320" stroke="#8d97a8" stroke-width="1" marker-end="url(#arw)"/>
          <g style="font-family:var(--sans)">
            <rect x="20" y="320" width="560" height="64" rx="8" fill="#131924" stroke="#212a38"/>
            <text x="300" y="342" text-anchor="middle" fill="#eef1f6" font-size="14" font-weight="600">4. codificação</text>
            <text x="300" y="362" text-anchor="middle" fill="#8d97a8" font-size="12">IA escreve até o teste passar, nunca antes</text>
          </g>
          <line x1="300" y1="384" x2="300" y2="420" stroke="#8d97a8" stroke-width="1" marker-end="url(#arw)"/>
          <g style="font-family:var(--sans)">
            <rect x="20" y="420" width="560" height="64" rx="8" fill="#131924" stroke="#212a38"/>
            <text x="300" y="442" text-anchor="middle" fill="#eef1f6" font-size="14" font-weight="600">5. acompanhamento</text>
            <text x="300" y="462" text-anchor="middle" fill="#8d97a8" font-size="12">erro vai pro CLAUDE.md, não corrigido na mão</text>
          </g>
          <path d="M580 452 C 650 452, 650 52, 580 52" fill="none" stroke="#4fc3ff" stroke-width="1" marker-end="url(#arw-accent)"/>
          <text x="592" y="256" fill="#4fc3ff" font-size="12" style="font-family:var(--sans)">novo ciclo</text>
        </svg>
      </div>
    </div>
  `;
}

export function mountCiclo() {
  // No dynamic logic needed for this view
}
