const STORAGE_KEY = 'zen-cabelo-data';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function emptyDay() {
  return { day: '', activity: '', details: '' };
}

export function renderCabelo() {
  return `
    <div class="cabelo-container">
      <header class="view-header">
        <h1 class="section-title">💈 Cronograma Capilar</h1>
        <p class="section-desc">Organize seus cuidados semanais.</p>
        <button class="accent-btn" id="new-hair-btn"><i class="fas fa-plus"></i> Novo Dia</button>
      </header>

      <div class="hair-schedule glass-panel">
        <div class="hair-grid" id="hair-grid"></div>
        <div id="hair-empty" class="empty-state" style="display:none;">
          <i class="fas fa-cut"></i>
          <p>Nenhum dia ainda. Clique em "Novo Dia" para começar.</p>
        </div>
      </div>
    </div>
  `;
}

export function mountCabelo() {
  const grid = document.getElementById('hair-grid');
  const emptyState = document.getElementById('hair-empty');
  const newBtn = document.getElementById('new-hair-btn');
  let data = load();

  function render() {
    if (data.length === 0) {
      grid.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';
    grid.innerHTML = data.map((h, i) => `
      <div class="hair-day-card">
        <div class="hair-card-top">
          <input class="hair-input hair-day-input" data-i="${i}" data-field="day" value="${(h.day || '').replace(/"/g, '&quot;')}" placeholder="Dia">
          <button class="hair-del" data-i="${i}"><i class="fas fa-trash"></i></button>
        </div>
        <input class="hair-input" data-i="${i}" data-field="activity" value="${(h.activity || '').replace(/"/g, '&quot;')}" placeholder="Atividade">
        <textarea class="hair-textarea" data-i="${i}" placeholder="Detalhes..." rows="2">${h.details || ''}</textarea>
      </div>
    `).join('');

    grid.querySelectorAll('[data-field]').forEach(el => {
      el.addEventListener('input', () => {
        data[+el.dataset.i][el.dataset.field] = el.value;
        save(data);
      });
    });

    grid.querySelectorAll('.hair-textarea').forEach(el => {
      el.addEventListener('input', () => {
        data[+el.dataset.i].details = el.value;
        save(data);
      });
    });

    grid.querySelectorAll('.hair-del').forEach(el => {
      el.addEventListener('click', () => {
        if (confirm('Excluir este dia?')) {
          data.splice(+el.dataset.i, 1);
          save(data);
          render();
        }
      });
    });
  }

  newBtn.addEventListener('click', () => {
    data.push(emptyDay());
    save(data);
    render();
  });

  render();
}
