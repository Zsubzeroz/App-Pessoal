export function renderVagas() {
  return `
    <style>
      .v-container { max-width: 1000px; margin: 0 auto; }
      .v-header { margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
      .v-header h1 { font-size: 26px; }
      .v-form-card { background: var(--bg-card); padding: 25px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #333; }
      
      .v-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .v-col { flex: 1; display: flex; flex-direction: column; gap: 5px; }
      .v-col label { font-size: 13px; color: var(--text-muted); font-weight: 500; }
      .v-col input, .v-col select, .v-col textarea { background: #121212; border: 1px solid #333; color: white; padding: 10px 15px; border-radius: 8px; outline: none; font-size: 14px; }
      .v-col input:focus, .v-col select:focus { border-color: var(--accent); }
      
      .v-btn-submit { background: var(--accent); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; width: 100%; margin-top: 10px; }
      .v-btn-submit:hover { background: var(--accent-hover); }
      
      .v-table-wrapper { background: var(--bg-card); border-radius: 12px; overflow: hidden; border: 1px solid #333; }
      .v-table { width: 100%; border-collapse: collapse; font-size: 14px; }
      .v-table th, .v-table td { padding: 15px; text-align: left; border-bottom: 1px solid #333; }
      .v-table th { background: #1a1a1d; color: var(--text-muted); font-size: 12px; text-transform: uppercase; }
      .v-table tr:hover { background: rgba(255,255,255,0.02); }
      .status-badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
      .status-badge.candidatado { background: rgba(0, 180, 216, 0.2); color: #00b4d8; }
      .status-badge.entrevista { background: rgba(247, 127, 0, 0.2); color: #f77f00; }
      .status-badge.rejeitado { background: rgba(239, 35, 60, 0.2); color: #ef233c; }
      .status-badge.aprovado { background: rgba(88, 204, 2, 0.2); color: #58cc02; }
      .btn-del { background: transparent; border: none; color: #ef233c; cursor: pointer; padding: 5px; }
      .btn-del:hover { color: #d90429; }
    </style>

    <div class="v-container">
      <div class="v-header">
        <h1>🎯 Gerenciador de Vagas</h1>
      </div>

      <div class="v-form-card">
        <form id="form-vagas">
          <div class="v-row">
            <div class="v-col">
              <label>Empresa</label>
              <input type="text" id="v-empresa" required placeholder="Nome da empresa">
            </div>
            <div class="v-col">
              <label>Cargo</label>
              <input type="text" id="v-cargo" required placeholder="Ex: Desenvolvedor Front-end">
            </div>
          </div>
          <div class="v-row">
            <div class="v-col">
              <label>Modelo</label>
              <select id="v-modelo">
                <option>Remoto</option>
                <option>Híbrido</option>
                <option>Presencial</option>
              </select>
            </div>
            <div class="v-col">
              <label>Status</label>
              <select id="v-status">
                <option value="candidatado">Candidatado</option>
                <option value="entrevista">Entrevista / Teste</option>
                <option value="aprovado">Aprovado</option>
                <option value="rejeitado">Rejeitado</option>
              </select>
            </div>
          </div>
          <button type="submit" class="v-btn-submit">Anotar Candidatura</button>
        </form>
      </div>

      <div class="v-table-wrapper">
        <table class="v-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Cargo</th>
              <th>Modelo</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody id="v-tbody">
            <!-- Renderizado via JS -->
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function mountVagas() {
  const form = document.getElementById('form-vagas');
  const tbody = document.getElementById('v-tbody');

  function getVagas() {
    return JSON.parse(localStorage.getItem('minhas_vagas') || '[]');
  }

  function saveVagas(vagas) {
    localStorage.setItem('minhas_vagas', JSON.stringify(vagas));
  }

  function renderTable() {
    const vagas = getVagas();
    tbody.innerHTML = '';
    if(vagas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 30px; color:#666;">Nenhuma vaga cadastrada ainda.</td></tr>';
      return;
    }

    vagas.forEach((v, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${v.empresa}</strong></td>
        <td>${v.cargo}</td>
        <td>${v.modelo}</td>
        <td><span class="status-badge ${v.status}">${v.status.toUpperCase()}</span></td>
        <td><button class="btn-del" data-index="${index}"><i class="fas fa-trash"></i></button></td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-index');
        const list = getVagas();
        list.splice(idx, 1);
        saveVagas(list);
        renderTable();
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = {
      empresa: document.getElementById('v-empresa').value,
      cargo: document.getElementById('v-cargo').value,
      modelo: document.getElementById('v-modelo').value,
      status: document.getElementById('v-status').value
    };
    
    const vagas = getVagas();
    vagas.push(v);
    saveVagas(vagas);
    
    form.reset();
    renderTable();
  });

  renderTable();
}
