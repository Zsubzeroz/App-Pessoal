const qaQuestions = [
  {
    q: '1) Me conte sobre você e sua trajetória até chegar em Python e IA.',
    a: 'Meu primeiro contato com Python foi quando eu estudava robótica. Foi nesse momento que comecei a me interessar pela linguagem. Depois me aprofundeia mais durante o Newton Dynamic Academy de Python, onde desenvolvi projetos práticos, como um sistema CRUD e um site de cadastro de chefs e ingredientes.',
    feedback: 'Adicione números reais ou impactos de projetos (ex: "reduziu horas de trabalho manual").'
  },
  {
    q: '2) O que te chamou atenção na vaga e por que quer trabalhar aqui?',
    a: 'O que mais me chamou atenção foi a parte de antifraude usando IA. Achei isso muito interessante porque é algo novo para mim e quero aprender mais sobre. Acredito que essa vaga me permite usar o conhecimento que já tenho em Python.',
    feedback: 'Destaque como seu olhar preventivo (xadrez) ajuda a antecipar padrões maliciosos.'
  },
  {
    q: '3) Você já trabalhou com coleta de dados (web scraping ou crawling)?',
    a: 'Trabalhei com coleta e organização de dados na Ecoflora Brasil. Desenvolvi, usando JavaScript e Google Apps, um sistema de registro de crescimento e evolução de plantas. As equipes registravam dados no tablet, e eu automatizava o processo.',
    feedback: 'Mencione como você trata mudanças na estrutura do HTML ou instabilidades de rede durante o scraping.'
  },
  {
    q: '4) Qual sua experiência com Inteligência Artificial ou IA Generativa?',
    a: 'Tive contato com IA em um projeto de capacitação do Google, onde participei de um curso prático focado em IA e modelos generativos. Também participei do Bootcamp Nexa com AWS Bedrock.',
    feedback: 'Mostre que domina parâmetros de API como temperatura, token limit e formatação JSON.'
  },
  {
    q: '5) Conte sobre um problema técnico ou desafio que você resolveu.',
    a: 'Em um projeto, eu precisava migrar um sistema de controle de estoque que estava em planilhas para um aplicativo com banco de dados SQL. Para evitar bagunça e perda de dados, utilizei IA como apoio para ajudar na organização e migração dos dados.',
    feedback: 'Excelente resposta prática. Reforce o volume de dados tratados na migração.'
  },
  {
    q: '6) Como você lida com mudanças e aprender algo novo rapidamente?',
    a: 'Quando comecei a trabalhar com sistemas na empresa anterior, tive que aprender tudo do zero. Recebi feedbacks positivos porque aprendi rápido e ainda criei soluções novas, como automações com Google Apps e planilhas.',
    feedback: 'Demonstra adaptabilidade e proatividade real.'
  },
  {
    q: '7) Como você vê o papel da IA na prevenção de fraudes?',
    a: 'Acredito que a IA é muito eficiente para detectar padrões em grandes volumes de dados. Ela pode reduzir erros e identificar comportamentos suspeitos mais rapidamente. Mas também acho importante que haja supervisão humana para evitar problemas futuros.',
    feedback: 'Perfeito equilíbrio entre potencial da máquina e governança humana.'
  }
];

const pitchSchedule = [
  { time: '0:00 – 0:20', step: 'Introdução', msg: 'Luan Estifer, Engenharia de Software na UniCesumar e objetivo profissional.' },
  { time: '0:20 – 0:50', step: 'Lógica & Robótica', msg: 'Paixão por lógica, xadrez e robótica maker; código como solução viva.' },
  { time: '0:50 – 1:30', step: 'Stack atual', msg: 'Python, Django, SQL, ERP Protheus e soluções de dados industriais.' },
  { time: '1:30 – 1:50', step: 'Inglês & Soft Skills', msg: 'Inglês B2/técnico, comunicação, liderança e visão estratégica.' },
  { time: '1:50 – 2:00', step: 'Fechamento', msg: 'Compromisso em gerar valor e convite para entrevista técnica.' }
];

export function renderEntrevistas() {
  return `
    <div class="entrevistas-container">
      <header class="view-header">
        <h1 class="section-title">🎯 Entrevistas & Pitch</h1>
        <p class="section-desc">Preparação para entrevista na Dimensa Tecnologia — Vaga: Analista I Desenvolvimento de Software | Python/IA</p>
      </header>

      <div class="glass-panel info-banner">
        <strong>Desafio citado:</strong> crawling/raspagem de dados e soluções antifraude utilizando IA/LLMs.
        <strong>Palavras-chave:</strong> Python, Scrapy, Selenium, IA Generativa, Prompt Engineering, LLMs, Docker, SQL.
      </div>

      <div class="qa-list" id="qa-list">
        ${qaQuestions.map((item, i) => `
          <div class="qa-card glass-panel">
            <div class="qa-number">${String(i + 1).padStart(2, '0')}</div>
            <h3 class="qa-question">${item.q}</h3>
            <div class="qa-answer">${item.a}</div>
            <div class="qa-feedback">💡 <strong>Feedback:</strong> ${item.feedback}</div>
          </div>
        `).join('')}
      </div>

      <div class="section-title" style="margin-top:32px">Roteiro do Vídeo Pitch (2 minutos)</div>
      <div class="pitch-table glass-panel">
        <table>
          <thead>
            <tr><th>Tempo</th><th>Etapa</th><th>Mensagem-Chave</th></tr>
          </thead>
          <tbody>
            ${pitchSchedule.map(p => `
              <tr>
                <td><code>${p.time}</code></td>
                <td><strong>${p.step}</strong></td>
                <td>${p.msg}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function mountEntrevistas() {
  // Accordion for QA cards
  document.querySelectorAll('.qa-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
  });
}
