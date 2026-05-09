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

      <style>
        .b-progress-card { margin-bottom: 30px; }
        .b-progress-info { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
        .b-progress-label { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .b-progress-percent { font-size: 2.5rem; font-weight: 800; line-height: 1; }
        
        .b-progress-bar-bg { height: 12px; background: var(--bg-input); border-radius: 6px; overflow: hidden; border: 1px solid var(--border); }
        .b-progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #38bdf8); border-radius: 6px; transition: width 0.5s ease; }

        .b-table-container { padding: 0; overflow: hidden; }
        .b-table { width: 100%; border-collapse: collapse; }
        .b-table th { text-align: left; padding: 16px; background: rgba(255,255,255,0.02); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .b-table td { padding: 14px 16px; border-bottom: 1px solid var(--border); font-size: 0.95rem; transition: 0.2s; }
        .b-table tr:hover { background: rgba(255,255,255,0.01); }
        .b-table tr.completed td { background: rgba(16, 185, 129, 0.03); opacity: 0.6; }
        .b-table tr.completed td strong { text-decoration: line-through; color: var(--c-success); }

        .b-checkbox { width: 24px; height: 24px; cursor: pointer; accent-color: var(--c-success); }
      </style>
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
