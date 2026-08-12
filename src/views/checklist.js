const DAILY_HABITS = [];

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

export function renderChecklist() {
  return `
    <div class="checklist-container">
      <header class="view-header">
        <h1 class="section-title">✅ Minhas Tarefas</h1>
        <p class="section-desc">Organize suas pendências rápidas. Hábitos diários resetam automaticamente.</p>
      </header>

      <div class="checklist-workspace glass-panel">
        <div class="checklist-input-group">
          <input type="text" id="checklist-new-item" placeholder="Nova tarefa...">
          <button id="checklist-add-btn" class="pomo-btn" title="Adicionar"><i class="fas fa-plus"></i></button>
          <button id="checklist-clear-btn" class="pomo-btn" style="background:#ef444426; color:#ef4444;" title="Limpar concluídos"><i class="fas fa-broom"></i></button>
        </div>

        <div class="checklist-section-label">
          <i class="fas fa-sync-alt"></i> Hábitos Diários (Reset Automático)
        </div>
        <ul id="checklist-fixed-list" class="checklist-list checklist-list--fixed"></ul>

        <div class="checklist-section-label" style="margin-top: 24px;">
          <i class="fas fa-plus-circle"></i> Outras Tarefas
        </div>
        <ul id="checklist-list" class="checklist-list"></ul>
      </div>
    </div>
  `;
}

export function mountChecklist() {
  const fixedListEl = document.getElementById('checklist-fixed-list');
  const listEl = document.getElementById('checklist-list');
  const inputEl = document.getElementById('checklist-new-item');
  const addBtn = document.getElementById('checklist-add-btn');
  const clearBtn = document.getElementById('checklist-clear-btn');

  if (!listEl || !inputEl || !addBtn || !clearBtn) return;

  let items = JSON.parse(localStorage.getItem('zen-checklist-items') || '[]');

  function ensureDailyHabits() {
    const lastReset = localStorage.getItem('zen-checklist-last-reset');
    const today = getTodayStr();

    const hasAllHabits = DAILY_HABITS.every(h =>
      items.some(i => i.id === h.id)
    );

    if (lastReset !== today || !hasAllHabits) {
      const customItems = items.filter(i => !i.fixed);

      const freshHabits = DAILY_HABITS.map(h => ({ ...h, done: false }));
      items = [...freshHabits, ...customItems];

      localStorage.setItem('zen-checklist-last-reset', today);
      saveItems();
    }
  }

  ensureDailyHabits();

  function saveItems() {
    localStorage.setItem('zen-checklist-items', JSON.stringify(items));
  }

  clearBtn.addEventListener('click', () => {
    if (confirm('Deseja remover todas as tarefas concluídas? (Hábitos diários serão mantidos)')) {
      items = items.filter(item => item.done ? item.fixed : true);
      saveItems();
      renderItems();
    }
  });

  function renderItems() {
    fixedListEl.innerHTML = '';
    listEl.innerHTML = '';

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `checklist-item ${item.done ? 'done' : ''} ${item.fixed ? 'checklist-item--fixed' : ''}`;

      const badge = item.fixed
        ? `<span class="habit-badge">${item.categoria || 'Diário'}</span>`
        : '';

      const deleteBtn = item.fixed
        ? ''
        : `<button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>`;

      li.innerHTML = `
        <div class="item-left">
          <input type="checkbox" ${item.done ? 'checked' : ''} data-index="${index}">
          <span>${item.text}</span>
          ${badge}
        </div>
        ${deleteBtn}
      `;

      if (item.fixed) {
        fixedListEl.appendChild(li);
      } else {
        listEl.appendChild(li);
      }
    });

    fixedListEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        items[index].done = e.target.checked;
        saveItems();
        renderItems();
      });
    });

    listEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        items[index].done = e.target.checked;
        saveItems();
        renderItems();
      });
    });

    listEl.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-index');
        items.splice(index, 1);
        saveItems();
        renderItems();
      });
    });
  }

  function addItem() {
    const text = inputEl.value.trim();
    if (!text) return;
    items.push({ text, done: false, fixed: false });
    inputEl.value = '';
    saveItems();
    renderItems();
  }

  addBtn.addEventListener('click', addItem);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
  });

  renderItems();
}
