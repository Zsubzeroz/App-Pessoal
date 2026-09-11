const questions = [
  { q: 'Evite lugares que te levam a gastar', a: 'Identifique seus gatilhos de consumo e corte a exposição a eles.' },
  { q: 'Você está preparado?', a: 'Se a resposta for "Não", deixe quieto e preserve seu dinheiro.' },
  { q: 'Contas pagas?', a: 'Pague suas contas e custos essenciais rigorosamente em dia.' },
  { q: 'Cartão de crédito quitado?', a: 'Quite o valor integral da fatura antes de pensar em novos parcelamentos.' },
  { q: 'Reserva financeira para imprevistos?', a: 'Construa e preserve uma reserva de emergência intocável.' }
];

const cutTips = [
  'Assinaturas que não usa regularmente',
  'Delivery excessivo (refeições em casa saem 3-5x mais baratas)',
  'Impulsos de "promoção" — se não estava no orçamento, não existe desconto',
  'Comparação social — seu ritmo é o seu ritmo',
  'Gastos com transporte quando dá para caminhar'
];

const earnTips = [
  'Freelances de programação ( Django, automação Python )',
  'Projetos paralelos que geram renda passiva',
  'Capacitação contínua = salários maiores',
  'Networking estratégico — oportunidades vêm de contatos',
  'Resolução de problemas reais = maior valor percebido'
];

export function renderFinanceiro() {
  return `
    <div class="financeiro-container">
      <header class="view-header">
        <h1 class="section-title">💰 Controle Financeiro</h1>
        <p class="section-desc">Filosofia de gastos e regras práticas para quem trabalha duro pelo que tem.</p>
      </header>

      <div class="glass-panel quote-banner">
        "O corre é dobrado para quem não nasceu herdeiro!"
      </div>

      <div class="finance-rules glass-panel">
        <h2 class="sub-title"><i class="fas fa-question-circle"></i> Antes de Gastar, Pergunte-se:</h2>
        <div class="rules-list">
          ${questions.map(q => `
            <div class="rule-item">
              <div class="rule-q">${q.q}</div>
              <div class="rule-a">${q.a}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="finance-tips-grid">
        <div class="tips-card glass-panel">
          <h3><i class="fas fa-arrow-down" style="color:#ef4444"></i> Cortar Gastos</h3>
          <ul>
            ${cutTips.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
        <div class="tips-card glass-panel">
          <h3><i class="fas fa-arrow-up" style="color:#34e0a1"></i> Aumentar Receita</h3>
          <ul>
            ${earnTips.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

export function mountFinanceiro() {
  // Static view
}
