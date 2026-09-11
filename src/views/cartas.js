const STORAGE_KEY = 'zen-cartas-list';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function emptyCard() {
  return { company: '', icon: '📄', content: '' };
}

export function renderCartas() {
  return `
    <div class="cartas-container">
      <header class="view-header">
        <h1 class="section-title">✉️ Cartas de Apresentação</h1>
        <p class="section-desc">Crie e organize suas cartas para cada vaga.</p>
        <button class="accent-btn" id="new-cartas-btn"><i class="fas fa-plus"></i> Nova Carta</button>
      </header>
      <div class="letters-list" id="letters-list"></div>
      <div id="cartas-empty" class="empty-state" style="display:none;">
        <i class="fas fa-envelope-open"></i>
        <p>Nenhuma carta ainda. Clique em "Nova Carta" para começar.</p>
      </div>
    </div>
  `;
}

export function mountCartas() {
  const list = document.getElementById('letters-list');
  const emptyState = document.getElementById('cartas-empty');
  const newBtn = document.getElementById('new-cartas-btn');
  let data = load();

  function render() {
    if (data.length === 0) {
      list.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';
    list.innerHTML = data.map((l, i) => `
      <details class="accordion-item" data-index="${i}">
        <summary class="accordion-summary">
          <span>${l.icon || '📄'} ${l.company || 'Sem título'}</span>
          <span class="accordion-icon"></span>
        </summary>
        <div class="accordion-body">
          <div class="cartas-edit">
            <input class="cartas-input" data-field="company" data-i="${i}" value="${(l.company || '').replace(/"/g, '&quot;')}" placeholder="Empresa / Vaga">
            <textarea class="cartas-textarea" data-i="${i}" placeholder="Conteúdo da carta..." rows="6">${l.content || ''}</textarea>
            <div class="cartas-actions">
              <button class="cartas-del-btn" data-i="${i}"><i class="fas fa-trash"></i> Excluir</button>
            </div>
          </div>
        </div>
      </details>
    `).join('');

    list.querySelectorAll('.accordion-item summary').forEach(s => {
      s.addEventListener('click', e => {
        e.preventDefault();
        const d = s.parentElement;
        d.classList.toggle('open');
        d.open = d.classList.contains('open');
      });
    });

    list.querySelectorAll('[data-field]').forEach(el => {
      el.addEventListener('input', () => {
        data[+el.dataset.i].company = el.value;
        save(data);
        render();
      });
    });

    list.querySelectorAll('.cartas-textarea').forEach(el => {
      el.addEventListener('input', () => {
        data[+el.dataset.i].content = el.value;
        save(data);
      });
    });

    list.querySelectorAll('.cartas-del-btn').forEach(el => {
      el.addEventListener('click', () => {
        if (confirm('Excluir esta carta?')) {
          data.splice(+el.dataset.i, 1);
          save(data);
          render();
        }
      });
    });
  }

  newBtn.addEventListener('click', () => {
    data.push(emptyCard());
    save(data);
    render();
  });

  render();
}
