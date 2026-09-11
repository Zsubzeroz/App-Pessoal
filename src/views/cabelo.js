const hairSchedule = [
  { day: 'Segunda', activity: 'Lavagem + Condicionamento + Finalização', details: 'Utilize shampoo sem sulfato e condicionador específico para cachos. Finalize com leave-in e ativador.' },
  { day: 'Terça', activity: 'Revitalização (se necessário)', details: 'Borrifar água com leave-in ou ativador para reativar a curvatura e controlar o frizz.' },
  { day: 'Quarta', activity: 'Pausa Total (Day Off)', details: 'Simplesmente não fazer nada. Aplicar spray ou tônico suave apenas se necessário.' },
  { day: 'Quinta', activity: 'Hidratação Profunda (Opcional)', details: 'Máscara de hidratação após a lavagem (ou substituir por co-wash + máscara nutritiva).' },
  { day: 'Sexta', activity: 'Pausa Total (Day Off)', details: 'Manter livre. Tônico no couro cabeludo se sentir ressecamento.' },
  { day: 'Sábado', activity: 'Lavagem + Condicionamento + Umectação', details: 'Se optar pela umectação, aplique o óleo vegetal antes da lavagem ou como pré-shampoo.' },
  { day: 'Domingo', activity: 'Revitalização leve', details: 'Ajuste pontual dos cachos amassados ao acordar.' }
];

export function renderCabelo() {
  return `
    <div class="cabelo-container">
      <header class="view-header">
        <h1 class="section-title">💈 Cronograma Capilar</h1>
        <p class="section-desc">7 dias de cuidados para cabelo cacheado — faithfully preserved from original document.</p>
      </header>

      <div class="hair-schedule glass-panel">
        <div class="hair-grid">
          ${hairSchedule.map((h, i) => `
            <div class="hair-day-card ${h.activity.includes('Pausa') ? 'rest-day' : ''}">
              <div class="hair-day-num">${i + 1}</div>
              <div class="hair-day-name">${h.day}</div>
              <div class="hair-activity">${h.activity}</div>
              <div class="hair-details">${h.details}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function mountCabelo() {
  // Static view
}
