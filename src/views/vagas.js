import { analyzeJob } from '../services/aiService.js';

function getVagas() {
  return JSON.parse(localStorage.getItem('minhas_vagas') || '[]');
}

function saveVagas(vagas) {
  localStorage.setItem('minhas_vagas', JSON.stringify(vagas));
}

function showAnalysisModal(content) {
  let modal = document.getElementById('vagas-analysis-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'vagas-analysis-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content glass-panel">
        <div class="modal-header">
          <h3>Análise da IA</h3>
          <button class="modal-close-btn" onclick="this.closest('.modal-overlay').style.display='none'">&times;</button>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  modal.querySelector('.modal-body').innerHTML = content;
  modal.style.display = 'flex';
}

function renderAnalysisResult(data) {
  if (data.fitScore === undefined) {
    return `<p style="color:#cbd5e1; white-space:pre-wrap">${typeof data === 'string' ? data : JSON.stringify(data)}</p>`;
  }

  const scoreColor = data.fitScore >= 70 ? '#10b981' : data.fitScore >= 40 ? '#f59e0b' : '#ef4444';

  return `
    <div class="analysis-result">
      <div class="analysis-score">
        <div class="score-circle" style="--score-color:${scoreColor}">
          <span class="score-num">${data.fitScore}</span>
          <span class="score-label">Fit Score</span>
        </div>
      </div>
      ${data.resumoFit ? `<div class="analysis-resumo">${data.resumoFit}</div>` : ''}
      ${data.pontosFortes?.length ? `
        <div class="analysis-section">
          <h4 style="color:#10b981">Pontos Fortes</h4>
          <ul>${data.pontosFortes.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
      ` : ''}
      ${data.pontosAtencao?.length ? `
        <div class="analysis-section">
          <h4 style="color:#f59e0b">Pontos de Atenção</h4>
          <ul>${data.pontosAtencao.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
      ` : ''}
      ${data.sugestaoAbordagem ? `
        <div class="analysis-section">
          <h4 style="color:#3b82f6">Sugestão de Abordagem</h4>
          <p>${data.sugestaoAbordagem}</p>
        </div>
      ` : ''}
    </div>
  `;
}

export function renderVagas() {
  return `
    <div class="v-page-wrapper">
      <header class="view-header">
        <h1 class="section-title">🎯 Gerenciador de Vagas</h1>
        <p class="section-desc">Acompanhe suas candidaturas e oportunidades de mercado.</p>
      </header>

      <div class="v-grid">
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
              <tbody id="v-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountVagas() {
  const form = document.getElementById('form-vagas');
  const tbody = document.getElementById('v-tbody');
  const searchInput = document.getElementById('v-search');

  function renderTable(filter = '') {
    const vagas = getVagas();
    tbody.innerHTML = '';

    const filtered = vagas.filter(v =>
      v.empresa.toLowerCase().includes(filter.toLowerCase()) ||
      v.cargo.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--text-muted);">Nenhuma vaga encontrada.</td></tr>`;
      return;
    }

    filtered.reverse().forEach((v, index) => {
      const realIndex = vagas.length - 1 - index;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="font-weight:700; color:#fff;">${v.empresa}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${v.modelo}</div>
        </td>
        <td>${v.cargo}</td>
        <td><span class="status-pill ${v.status}">${v.status}</span></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${v.data || '---'}</td>
        <td>
          ${v.link ? `<a href="${v.link}" target="_blank" class="v-link-btn" title="Ver Vaga"><i class="fas fa-external-link-alt"></i></a>` : ''}
          <button class="v-analyze-btn" data-real-index="${realIndex}" title="Analisar com IA"><i class="fas fa-magic"></i></button>
          <button class="v-del-btn" data-real-index="${realIndex}" title="Excluir"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.v-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Deseja excluir esta candidatura?')) {
          const idx = e.currentTarget.getAttribute('data-real-index');
          const list = getVagas();
          list.splice(idx, 1);
          saveVagas(list);
          renderTable(searchInput.value);
        }
      });
    });

    tbody.querySelectorAll('.v-analyze-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = e.currentTarget.getAttribute('data-real-index');
        const vaga = getVagas()[idx];
        if (!vaga) return;

        const modalBody = document.createElement('div');
        showAnalysisModal('<div class="notion-loading"><i class="fas fa-spinner fa-spin"></i> Analisando com IA...</div>');

        try {
          const dossie = `Nome: Luan Estifer Rodrigues Pereira
Experiência: 29 meses (Ecoflora Brasil + Embrasatec)
Stack: Python, Django, SQL, ERP Protheus, Docker, Git, C#
Formação: Engenharia de Software (UniCesumar), Defesa Cibernética (Estácio)
Diferenciais: Xadrez competitivo, Piano, Arduino, Inglês B2`;

          const result = await analyzeJob(vaga, dossie);
          document.querySelector('#vagas-analysis-modal .modal-body').innerHTML = renderAnalysisResult(result);
        } catch (err) {
          document.querySelector('#vagas-analysis-modal .modal-body').innerHTML = `<p style="color:#ef4444">Erro: ${err.message}</p>`;
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
