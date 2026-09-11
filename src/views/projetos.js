const STORAGE_KEY = 'zen-projetos-list';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function emptyCard() {
  return { mark: '📁', title: '', desc: '', tags: [], link: '', featured: false };
}

export function renderProjetos() {
  return `
    <div class="projetos-container">
      <header class="view-header">
        <h1 class="section-title">💻 Portfólio de Projetos</h1>
        <p class="section-desc">Seus projetos e conquistas.</p>
        <button class="accent-btn" id="new-proj-btn"><i class="fas fa-plus"></i> Novo Projeto</button>
      </header>
      <div class="projects-grid" id="projects-grid"></div>
      <div id="proj-empty" class="empty-state" style="display:none;">
        <i class="fas fa-folder-open"></i>
        <p>Nenhum projeto ainda. Clique em "Novo Projeto" para começar.</p>
      </div>
    </div>
  `;
}

export function mountProjetos() {
  const grid = document.getElementById('projects-grid');
  const emptyState = document.getElementById('proj-empty');
  const newBtn = document.getElementById('new-proj-btn');
  let data = load();

  function render() {
    if (data.length === 0) {
      grid.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';
    grid.innerHTML = data.map((p, i) => `
      <div class="project-card glass-panel ${p.featured ? 'featured' : ''}" data-i="${i}">
        <div class="project-card-top">
          <input class="proj-input proj-mark" data-field="mark" data-i="${i}" value="${(p.mark || '').replace(/"/g, '&quot;')}" placeholder="ícone">
          <div class="proj-card-btns">
            <button class="proj-toggle" data-i="${i}" title="Destaque">${p.featured ? '⭐' : '☆'}</button>
            <button class="proj-del" data-i="${i}" title="Excluir"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <input class="proj-input proj-title" data-field="title" data-i="${i}" value="${(p.title || '').replace(/"/g, '&quot;')}" placeholder="Nome do projeto">
        <textarea class="proj-textarea" data-i="${i}" placeholder="Descrição..." rows="2">${p.desc || ''}</textarea>
        <input class="proj-input proj-tags" data-field="tags" data-i="${i}" value="${(p.tags || []).join(', ')}" placeholder="Tags (separadas por vírgula)">
        <input class="proj-input proj-link" data-field="link" data-i="${i}" value="${(p.link || '').replace(/"/g, '&quot;')}" placeholder="Link (GitHub, site...)">
      </div>
    `).join('');

    grid.querySelectorAll('[data-field]').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.i;
        const f = el.dataset.field;
        if (f === 'tags') {
          data[i].tags = el.value.split(',').map(t => t.trim()).filter(Boolean);
        } else {
          data[i][f] = el.value;
        }
        save(data);
      });
    });

    grid.querySelectorAll('.proj-textarea').forEach(el => {
      el.addEventListener('input', () => {
        data[+el.dataset.i].desc = el.value;
        save(data);
      });
    });

    grid.querySelectorAll('.proj-toggle').forEach(el => {
      el.addEventListener('click', () => {
        data[+el.dataset.i].featured = !data[+el.dataset.i].featured;
        save(data);
        render();
      });
    });

    grid.querySelectorAll('.proj-del').forEach(el => {
      el.addEventListener('click', () => {
        if (confirm('Excluir este projeto?')) {
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
