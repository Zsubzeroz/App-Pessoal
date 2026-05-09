export function renderBiblia() {
  return `
    <div class="b-page-wrapper">
      <header class="view-header">
        <h1 class="section-title">📖 Plano de Leitura Bíblica</h1>
        <p class="section-desc">Gerencie sua jornada de leitura através das Escrituras.</p>
      </header>

      <div class="b-progress-card glass-panel">
        <div class="b-progress-info">
          <div>
            <span class="b-progress-label">Progresso Geral</span>
            <h2 id="b-progress-percent">0%</h2>
          </div>
          <div style="text-align: right;">
            <span id="b-progress-count">0 / 365 dias</span>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Média: 3-4 capítulos por dia</p>
          </div>
        </div>
        <div class="b-progress-bar-bg">
          <div id="b-progress-bar-fill" class="b-progress-bar-fill" style="width: 0%"></div>
        </div>
      </div>

      <div class="b-table-container glass-panel">
        <table class="b-table">
          <thead>
            <tr>
              <th style="width: 80px; text-align: center;">Status</th>
              <th style="width: 120px;">Dia</th>
              <th>Referência de Leitura</th>
            </tr>
          </thead>
          <tbody id="b-tbody">
            <!-- Render via JS -->
          </tbody>
        </table>
      </div>

    </div>
  `;
}

export function mountBiblia() {
  const tbody = document.getElementById('b-tbody');
  const percentEl = document.getElementById('b-progress-percent');
  const countEl = document.getElementById('b-progress-count');
  const barFill = document.getElementById('b-progress-bar-fill');

  if(!tbody) return;

  function updateProgress() {
    let completed = 0;
    for(let i = 1; i <= 365; i++) {
      if(localStorage.getItem(`biblia_dia_${i}`) === 'true') completed++;
    }
    const percent = Math.round((completed / 365) * 100);
    if(percentEl) percentEl.innerText = `${percent}%`;
    if(countEl) countEl.innerText = `${completed} / 365 dias`;
    if(barFill) barFill.style.width = `${percent}%`;
  }

  // Populate Table
  const fragment = document.createDocumentFragment();
  for(let i = 1; i <= 365; i++) {
    const isChecked = localStorage.getItem(`biblia_dia_${i}`) === 'true';
    const tr = document.createElement('tr');
    if (isChecked) tr.classList.add('completed');
    
    let leitura = "";
    if(i <= 50) leitura = `Gênesis ${i*2 - 1} - ${i*2 + 1}`;
    else if(i <= 90) leitura = `Êxodo ${i-50} - ${i-48}`;
    else leitura = `Estudo Bíblico: Leitura do Dia ${i}`;

    tr.innerHTML = `
      <td style="text-align: center;">
        <input type="checkbox" class="b-checkbox" data-dia="${i}" ${isChecked ? 'checked' : ''}>
      </td>
      <td style="font-weight: 600; color: var(--text-muted);">Dia ${i}</td>
      <td><strong>${leitura}</strong></td>
    `;
    fragment.appendChild(tr);
  }
  tbody.appendChild(fragment);

  tbody.addEventListener('change', (e) => {
    if(e.target.classList.contains('b-checkbox')) {
      const dia = e.target.getAttribute('data-dia');
      const tr = e.target.closest('tr');
      if(e.target.checked) {
        tr.classList.add('completed');
        localStorage.setItem(`biblia_dia_${dia}`, 'true');
      } else {
        tr.classList.remove('completed');
        localStorage.removeItem(`biblia_dia_${dia}`);
      }
      updateProgress();
    }
  });

  updateProgress();
}
