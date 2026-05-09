export function renderChecklist() {
  return `
    <div class="checklist-container">
      <header class="view-header">
        <h1 class="section-title">✅ Minhas Tarefas</h1>
        <p class="section-desc">Organize suas pendências rápidas.</p>
      </header>

      <div class="checklist-workspace glass-panel">
        <div class="checklist-input-group">
          <input type="text" id="checklist-new-item" placeholder="Nova tarefa...">
          <button id="checklist-add-btn" class="pomo-btn" title="Adicionar"><i class="fas fa-plus"></i></button>
          <button id="checklist-clear-btn" class="pomo-btn" style="background:#ef444426; color:#ef4444;" title="Limpar concluídos"><i class="fas fa-broom"></i></button>
        </div>
        
        <ul id="checklist-list" class="checklist-list">
          <!-- Items will be injected here -->
        </ul>
      </div>
    </div>
  `;
}

export function mountChecklist() {
  const listEl = document.getElementById('checklist-list');
  const inputEl = document.getElementById('checklist-new-item');
  const addBtn = document.getElementById('checklist-add-btn');
  const clearBtn = document.getElementById('checklist-clear-btn');

  if (!listEl || !inputEl || !addBtn || !clearBtn) return;

  let items = JSON.parse(localStorage.getItem('zen-checklist-items') || '[]');

  function saveItems() {
    localStorage.setItem('zen-checklist-items', JSON.stringify(items));
  }

  clearBtn.addEventListener('click', () => {
    if (confirm('Deseja remover todas as tarefas concluídas?')) {
      items = items.filter(item => !item.done);
      saveItems();
      renderItems();
    }
  });

  function renderItems() {
    listEl.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `checklist-item ${item.done ? 'done' : ''}`;
      li.innerHTML = `
        <div class="item-left">
          <input type="checkbox" ${item.done ? 'checked' : ''} data-index="${index}">
          <span>${item.text}</span>
        </div>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
      `;
      listEl.appendChild(li);
    });

    // Event listeners for checkboxes
    listEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        items[index].done = e.target.checked;
        saveItems();
        renderItems();
      });
    });

    // Event listeners for delete buttons
    listEl.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Usando o elemento atual do loop ou btn diretamente
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
    items.push({ text, done: false });
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
