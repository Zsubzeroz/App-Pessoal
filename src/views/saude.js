const workoutDays = [
  { day: 'Segunda', focus: 'Bíceps & Costas', routine: 'Aquecimento sem peso, musculação com carga progressiva, Pulley Frente, Rosca Direta.' },
  { day: 'Terça', focus: 'Abdômen & Cardio', routine: 'Pular corda, Pulley corda, circuitos abdominais.' },
  { day: 'Quarta', focus: 'Pernas / Recuperação', routine: '150 Repetições de Agachamento, Tríceps testa na polia alta com corda.' },
  { day: 'Quinta', focus: 'Tríceps & Peito', routine: 'Alongamento, Crucifixo Máquina, Supino Fechado / Flexão Fechada, Elevação Lateral.' },
  { day: 'Sexta', focus: 'Panturrilha & Tríceps', routine: '3 Séries de Stiff, Tríceps Francês, elevação de panturrilha.' },
  { day: 'Sábado', focus: 'Membros Inferiores', routine: '3 Séries Borboleta, Agachamento com peso (3x), Cadeira Extensora (3x), Stiff com barra (3x), Abdução de quadríceps (3x), Flexora em pé (2x).' },
  { day: 'Domingo', focus: 'Descanso', routine: 'Recuperação muscular passiva.' }
];

const measurements = [
  {
    name: 'Luan Estifer',
    color: '#34e0a1',
    data: [
      { part: 'Braço (Bíceps/Tríceps)', value: '32 D / 31 E' },
      { part: 'Antebraço', value: '26 D / 26 E' },
      { part: 'Peitoral', value: '93 cm' },
      { part: 'Panturrilha', value: '32 D / 32,5 E' },
      { part: 'Coxa', value: '51 D / 52 E' }
    ]
  },
  {
    name: 'Mamãe',
    color: '#a855f7',
    data: [
      { part: 'Braço', value: '38 D / 40 E' },
      { part: 'Antebraço', value: '30 D / 29 E' },
      { part: 'Peito', value: '122 / 121 cm' },
      { part: 'Barriga', value: '130 / 120 cm' },
      { part: 'Panturrilha', value: '36 E' }
    ]
  },
  {
    name: 'Renan',
    color: '#4fc3ff',
    data: [
      { part: 'Braço (Bíceps/Tríceps)', value: '33,5 D / 33,3 E' },
      { part: 'Antebraço', value: '28 D / 28,5 E' },
      { part: 'Peitoral', value: '97 cm' },
      { part: 'Panturrilha', value: '37,5 D / 37 E' },
      { part: 'Coxa', value: '60 D / 60 E' }
    ]
  }
];

export function renderSaude() {
  return `
    <div class="saude-container">
      <header class="view-header">
        <h1 class="section-title">🏋️ Treinos & Medidas Corporais</h1>
        <p class="section-desc">Ficha de treino semanal e acompanhamento de medidas.</p>
      </header>

      <div class="workout-section glass-panel">
        <h2 class="sub-title"><i class="fas fa-dumbbell"></i> Ficha de Treino Semanal</h2>
        <div class="workout-grid">
          ${workoutDays.map(w => `
            <div class="workout-card ${w.focus === 'Descanso' ? 'rest-day' : ''}">
              <div class="workout-day">${w.day}</div>
              <div class="workout-focus">${w.focus}</div>
              <div class="workout-routine">${w.routine}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="measurements-section" style="margin-top:32px;">
        <h2 class="sub-title"><i class="fas fa-ruler-vertical"></i> Medidas Corporais</h2>
        <div class="measurements-grid">
          ${measurements.map(m => `
            <div class="measurement-card glass-panel">
              <h3 style="color:${m.color}">${m.name}</h3>
              <table class="data-table">
                ${m.data.map(d => `
                  <tr>
                    <td>${d.part}</td>
                    <td><strong>${d.value}</strong></td>
                  </tr>
                `).join('')}
              </table>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function mountSaude() {
  // Static view — no interactive events needed
}
