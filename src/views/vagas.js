export function renderVagas() {
  return `
    <div class="v-page-wrapper">
      <header class="view-header">
        <h1 class="section-title">🎯 Gerenciador de Vagas</h1>
        <p class="section-desc">Acompanhe suas candidaturas e oportunidades de mercado.</p>
      </header>

      <div class="v-grid">
        <!-- Form Section -->
        <div class="v-form-panel glass-panel">
          <h3>Nova Candidatura</h3>
          <form id="form-vagas">
            <div class="v-input-group">
              <label>Empresa</label>
              <input type="text" id="v-empresa" required placeholder="Ex: Google, Samsung...">
            </div>
            <div class="v-input-group">
              <label>Cargo / Posição</label>
              <input type="text" id="v-cargo" required placeholder="Ex: Software Engineer">
            </div>
            <div class="v-row">
              <div class="v-input-group">
                <label>Modelo</label>
                <select id="v-modelo">
                  <option>Remoto</option>
                  <option>Híbrido</option>
                  <option>Presencial</option>
                </select>
              </div>
              <div class="v-input-group">
                <label>Status</label>
                <select id="v-status">
                  <option value="candidatado">Candidatado</option>
                  <option value="entrevista">Entrevista / Teste</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="rejeitado">Rejeitado</option>
                </select>
              </div>
            </div>
            <div class="v-input-group">
              <label>Link da Vaga</label>
              <input type="url" id="v-link" placeholder="https://linkedin.com/jobs/...">
            </div>
            <button type="submit" class="btn-primary w-full">Anotar Candidatura</button>
          </form>
        </div>

        <!-- List Section -->
        <div class="v-list-panel">
          <div class="v-list-header">
            <div class="v-search-box">
              <i class="fas fa-search"></i>
              <input type="text" id="v-search" placeholder="Buscar por empresa ou cargo...">
            </div>
          </div>

          <div class="v-table-container glass-panel">
            <table class="v-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Cargo</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody id="v-tbody">
                <!-- Content via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>
        .v-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
        .v-form-panel h3 { margin-bottom: 20px; font-size: 1.1rem; }
        .v-input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .v-input-group label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }
        .v-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .w-full { width: 100%; }

        .v-list-header { margin-bottom: 20px; }
        .v-search-box { position: relative; max-width: 400px; }
        .v-search-box i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .v-search-box input { width: 100%; padding-left: 40px; }

        .v-table-container { padding: 0; overflow: hidden; }
        .v-table { width: 100%; border-collapse: collapse; }
        .v-table th { text-align: left; padding: 16px; background: rgba(255,255,255,0.02); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); }
        .v-table td { padding: 16px; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .v-table tr:last-child td { border-bottom: none; }
        .v-table tr:hover { background: rgba(255,255,255,0.01); }

        .v-link-btn { color: var(--accent); text-decoration: none; font-size: 1.1rem; margin-right: 12px; }
        .v-link-btn:hover { color: var(--accent-hover); }
        .v-del-btn { color: var(--c-error); background: transparent; border: none; cursor: pointer; font-size: 1rem; opacity: 0.6; transition: 0.2s; }
        .v-del-btn:hover { opacity: 1; transform: scale(1.1); }

        .status-pill { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.candidatado { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; }
        .status-pill.entrevista { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.aprovado { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.rejeitado { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        @media (max-width: 1100px) {
          .v-grid { grid-template-columns: 1fr; }
        }
      </style>
    </div>
  `;
}

export function mountVagas() {
  const form = document.getElementById('form-vagas');
  const tbody = document.getElementById('v-tbody');
  const searchInput = document.getElementById('v-search');

  function getVagas() {
    return JSON.parse(localStorage.getItem('minhas_vagas') || '[]');
  }

  function saveVagas(vagas) {
    localStorage.setItem('minhas_vagas', JSON.stringify(vagas));
  }

  function renderTable(filter = '') {
    const vagas = getVagas();
    tbody.innerHTML = '';
    
    const filtered = vagas.filter(v => 
      v.empresa.toLowerCase().includes(filter.toLowerCase()) || 
      v.cargo.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--text-muted);">Nenhuma vaga encontrada.</td></tr>`;
      return;
    }

    filtered.reverse().forEach((v, index) => {
      const realIndex = vagas.length - 1 - index;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: #fff;">${v.empresa}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${v.modelo}</div>
        </td>
        <td>${v.cargo}</td>
        <td><span class="status-pill ${v.status}">${v.status}</span></td>
        <td style="font-size: 0.8rem; color: var(--text-muted);">${v.data || '---'}</td>
        <td>
          ${v.link ? `<a href="${v.link}" target="_blank" class="v-link-btn" title="Ver Vaga"><i class="fas fa-external-link-alt"></i></a>` : ''}
          <button class="v-del-btn" data-index="${realIndex}" title="Excluir"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.v-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Deseja excluir esta candidatura?')) {
          const idx = e.currentTarget.getAttribute('data-index');
          const list = getVagas();
          list.splice(idx, 1);
          saveVagas(list);
          renderTable(searchInput.value);
        }
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = {
      empresa: document.getElementById('v-empresa').value,
      cargo: document.getElementById('v-cargo').value,
      modelo: document.getElementById('v-modelo').value,
      status: document.getElementById('v-status').value,
      link: document.getElementById('v-link').value,
      data: new Date().toLocaleDateString('pt-BR')
    };
    
    const vagas = getVagas();
    vagas.push(v);
    saveVagas(vagas);
    
    form.reset();
    renderTable();
  });

  searchInput.addEventListener('input', (e) => {
    renderTable(e.target.value);
  });

  renderTable();
}
