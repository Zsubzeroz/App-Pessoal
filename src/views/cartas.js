const letters = [
  {
    company: 'Nokia — Cognitive Digital Mining',
    icon: '🏢',
    content: `
      <p><strong>Para:</strong> Recrutadores da Nokia • <strong>Divisão:</strong> Digital Mining</p>
      <p>Tenho grande interesse na vaga de Cognitive Digital Mining Intern. O que me atraiu foi a intersecção entre desenvolvimento de software e a transformação da indústria pesada através de IA, IoT e Digital Twins.</p>
      <p>Minha base em Engenharia de Software é movida por um forte senso de estratégia e disciplina. O xadrez moldou minha capacidade analítica e resiliência. Na programação, aplico essa mesma mentalidade para antecipar erros e estruturar arquiteturas limpas.</p>
      <p>Em meu projeto de Gestão de Cozinha, resolvi problemas complexos de lógica de estoque, enquanto minha experiência com o ERP Protheus me deu a maturidade necessária para entender as regras de negócio por trás do código.</p>
      <p>Estou à disposição para conversa e teste técnico.</p>
      <p><strong>Luan Estifer Rodrigues Pereira</strong></p>
    `
  },
  {
    company: 'Nokia Brasil — Gestão de Projetos',
    icon: '📡',
    content: `
      <p><strong>Para:</strong> Equipe de Atração de Talentos da Nokia Brasil</p>
      <p>O futuro da conectividade sem fronteiras exige planejamento estratégico impecável e execução sem falhas. Possuo base acadêmica de alto nível (nota 9,7 em programação na UniCesumar e formação em Defesa Cibernética na Estácio), além de 29 meses de experiência real.</p>
      <p><strong>Por que meu perfil Projetista é diferencial?</strong></p>
      <ul>
        <li><strong>Experiência em Digitalização:</strong> Na Ecoflora, liderei a migração de fluxos operacionais em papel para sistemas digitais.</li>
        <li><strong>Comunicação e Raciocínio de Riscos:</strong> Como ex-líder de equipe de xadrez, desenvolvi capacidade natural para prever riscos e coordenar reuniões.</li>
        <li><strong>Uso Ético da IA:</strong> Utilizo LLMs como copiloto para acelerar relatórios e documentação, sempre mantendo rigor e supervisão humana.</li>
      </ul>
      <p>Resido em Artur Nogueira com disponibilidade para modelo híbrido na Lapa/SP. Previsão de formatura em 10/2027.</p>
      <p>Pitch em vídeo: <a href="https://youtu.be/vIrBZTo8udA" target="_blank">youtu.be/vIrBZTo8udA</a></p>
    `
  },
  {
    company: 'YongLi Brasil — TI & Automação',
    icon: '🏭',
    content: `
      <p><strong>Para:</strong> Atração de Talentos e Gestão de TI da YongLi Brasil</p>
      <p>O mercado de correias transportadoras e soluções industriais é a espinha dorsal de qualquer operação de logística e manufatura de grande escala. Como profissional residente em Artur Nogueira, apresento meu perfil para oportunidades na área de TI.</p>
      <p><strong>Diferenciais estratégicos:</strong></p>
      <ul>
        <li><strong>Entendimento de Processos Industriais:</strong> Na Embrasatec, especializei-me em extrair e tratar dados de faturamento e logística do ERP Protheus via SQL e Python.</li>
        <li><strong>Capacidade de Automação:</strong> Na Ecoflora, liderei a transição de processos físicos para soluções digitais integradas.</li>
        <li><strong>Residência Local:</strong> Disponibilidade presencial imediata no Distrito Industrial de Artur Nogueira.</li>
      </ul>
    `
  },
  {
    company: 'Safe Consig — Desenvolvedor Python',
    icon: '💳',
    content: `
      <p><strong>Para:</strong> Recrutadores da Safe Consig</p>
      <p>Tenho grande interesse na vaga de Desenvolvedor Python Júnior. Admiro a forma como vocês utilizam tecnologia para simplificar processos financeiros. Acredito que meu foco em Backend e vivência com dados industriais podem somar rapidamente.</p>
      <p>Na programação, aplico o raciocínio lógico do xadrez para construir consultas SQL eficientes, utilizando JOINs e transformações para garantir a integridade da informação. Tenho experiência prática com Pandas para limpeza de CSV, TXT e planilhas.</p>
    `
  }
];

export function renderCartas() {
  return `
    <div class="cartas-container">
      <header class="view-header">
        <h1 class="section-title">✉️ Cartas de Apresentação</h1>
        <p class="section-desc">Texto integral preservado — clique para expandir cada carta.</p>
      </header>

      <div class="letters-list" id="letters-list">
        ${letters.map((l, i) => `
          <details class="accordion-item ${i === 0 ? 'open' : ''}" data-index="${i}">
            <summary class="accordion-summary">
              <span>${l.icon} ${l.company}</span>
              <span class="accordion-icon"></span>
            </summary>
            <div class="accordion-body">${l.content}</div>
          </details>
        `).join('')}
      </div>
    </div>
  `;
}

export function mountCartas() {
  document.querySelectorAll('.accordion-item summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const details = summary.parentElement;
      details.classList.toggle('open');
      details.open = details.classList.contains('open');
    });
  });
}
