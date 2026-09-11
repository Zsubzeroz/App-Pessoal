const STORAGE_KEY = 'zen-financeiro-data';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { rules: [], cutTips: [], earnTips: [] };
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function renderFinanceiro() {
  return `
    <div class="financeiro-container">
      <header class="view-header">
        <h1 class="section-title">💰 Controle Financeiro</h1>
        <p class="section-desc">Suas regras e dicas financeiras.</p>
      </header>

      <div class="finance-rules glass-panel">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <h2 class="sub-title" style="margin:0;"><i class="fas fa-question-circle"></i> Perguntas Antes de Gastar</h2>
          <button class="accent-btn" id="add-rule-btn"><i class="fas fa-plus"></i></button>
        </div>
        <div id="rules-list"></div>
        <div id="rules-empty" class="empty-state" style="display:none; padding:20px;">
          <p>Nenhuma regra ainda.</p>
        </div>
      </div>

      <div class="finance-tips-grid" style="margin-top:24px;">
        <div class="tips-card glass-panel">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <h3 style="margin:0;"><i class="fas fa-arrow-down" style="color:#ef4444"></i> Cortar Gastos</h3>
            <button class="accent-btn" id="add-cut-btn" style="padding:6px 10px; font-size:0.75rem;"><i class="fas fa-plus"></i></button>
          </div>
          <div id="cut-list"></div>
          <div id="cut-empty" class="empty-state" style="display:none; padding:16px;">
            <p>Nenhuma dica ainda.</p>
          </div>
        </div>
        <div class="tips-card glass-panel">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <h3 style="margin:0;"><i class="fas fa-arrow-up" style="color:#34e0a1"></i> Aumentar Receita</h3>
            <button class="accent-btn" id="add-earn-btn" style="padding:6px 10px; font-size:0.75rem;"><i class="fas fa-plus"></i></button>
          </div>
          <div id="earn-list"></div>
          <div id="earn-empty" class="empty-state" style="display:none; padding:16px;">
            <p>Nenhuma dica ainda.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountFinanceiro() {
  const rulesList = document.getElementById('rules-list');
  const rulesEmpty = document.getElementById('rules-empty');
  const cutList = document.getElementById('cut-list');
  const cutEmpty = document.getElementById('cut-empty');
  const earnList = document.getElementById('earn-list');
  const earnEmpty = document.getElementById('earn-empty');
  const addRuleBtn = document.getElementById('add-rule-btn');
  const addCutBtn = document.getElementById('add-cut-btn');
  const addEarnBtn = document.getElementById('add-earn-btn');

  let data = load();

  function renderRules() {
    if (data.rules.length === 0) {
      rulesList.innerHTML = '';
      rulesEmpty.style.display = 'block';
      return;
    }
    rulesEmpty.style.display = 'none';
    rulesList.innerHTML = data.rules.map((r, i) => `
      <div class="fin-edit-row">
        <input class="fin-input" data-arr="rules" data-i="${i}" data-field="q" value="${(r.q || '').replace(/"/g, '&quot;')}" placeholder="Pergunta">
        <input class="fin-input" data-arr="rules" data-i="${i}" data-field="a" value="${(r.a || '').replace(/"/g, '&quot;')}" placeholder="Resposta">
        <button class="fin-del" data-arr="rules" data-i="${i}"><i class="fas fa-times"></i></button>
      </div>
    `).join('');
    bindEvents(rulesList);
  }

  function renderTips(arr, listEl, emptyEl) {
    if (arr.length === 0) {
      listEl.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';
    listEl.innerHTML = arr.map((t, i) => `
      <div class="fin-edit-row">
        <input class="fin-input fin-tip-input" data-arr="${arr === data.cutTips ? 'cutTips' : 'earnTips'}" data-i="${i}" value="${(t || '').replace(/"/g, '&quot;')}" placeholder="Dica">
        <button class="fin-del" data-arr="${arr === data.cutTips ? 'cutTips' : 'earnTips'}" data-i="${i}"><i class="fas fa-times"></i></button>
      </div>
    `).join('');
    bindEvents(listEl);
  }

  function bindEvents(container) {
    container.querySelectorAll('.fin-input').forEach(el => {
      el.addEventListener('input', () => {
        const arr = el.dataset.arr;
        const i = +el.dataset.i;
        const field = el.dataset.field;
        if (field) {
          data[arr][i][field] = el.value;
        } else {
          data[arr][i] = el.value;
        }
        save(data);
      });
    });

    container.querySelectorAll('.fin-del').forEach(el => {
      el.addEventListener('click', () => {
        const arr = el.dataset.arr;
        const i = +el.dataset.i;
        data[arr].splice(i, 1);
        save(data);
        renderAll();
      });
    });
  }

  function renderAll() {
    renderRules();
    renderTips(data.cutTips, cutList, cutEmpty);
    renderTips(data.earnTips, earnList, earnEmpty);
  }

  addRuleBtn.addEventListener('click', () => {
    data.rules.push({ q: '', a: '' });
    save(data);
    renderAll();
  });

  addCutBtn.addEventListener('click', () => {
    data.cutTips.push('');
    save(data);
    renderAll();
  });

  addEarnBtn.addEventListener('click', () => {
    data.earnTips.push('');
    save(data);
    renderAll();
  });

  renderAll();
}
