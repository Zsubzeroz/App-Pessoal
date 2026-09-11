const STORAGE_KEY = 'zen-saude-data';

const DEFAULT_WORKOUT = [
  { day: 'Segunda', focus: 'Bíceps & Costas', routine: '' },
  { day: 'Terça', focus: 'Abdômen & Cardio', routine: '' },
  { day: 'Quarta', focus: 'Pernas / Recuperação', routine: '' },
  { day: 'Quinta', focus: 'Tríceps & Peito', routine: '' },
  { day: 'Sexta', focus: 'Panturrilha & Tríceps', routine: '' },
  { day: 'Sábado', focus: 'Membros Inferiores', routine: '' },
  { day: 'Domingo', focus: 'Descanso', routine: '' }
];

const DEFAULT_PEOPLE = [
  { name: 'Luan Estifer', color: '#34e0a1', data: [] },
  { name: 'Mamãe', color: '#a855f7', data: [] },
  { name: 'Renan', color: '#4fc3ff', data: [] }
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { workout: DEFAULT_WORKOUT, people: DEFAULT_PEOPLE };
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function emptyPerson() {
  return { name: '', color: '#34e0a1', data: [] };
}

function emptyMeasurement() {
  return { part: '', value: '' };
}

export function renderSaude() {
  return `
    <div class="saude-container">
      <header class="view-header">
        <h1 class="section-title">🏋️ Treinos & Medidas Corporais</h1>
        <p class="section-desc">Ficha de treino semanal e acompanhamento de medidas.</p>
      </header>

      <div class="workout-section glass-panel">
        <h2 class="sub-title"><i class="fas fa-dumbbell"></i> Ficha de Treino Semanal</h2>
        <div class="workout-grid" id="workout-grid"></div>
      </div>

      <div class="measurements-section" style="margin-top:32px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <h2 class="sub-title" style="margin:0;"><i class="fas fa-ruler-vertical"></i> Medidas Corporais</h2>
          <button class="accent-btn" id="new-person-btn"><i class="fas fa-user-plus"></i> Nova Pessoa</button>
        </div>
        <div class="measurements-grid" id="measurements-grid"></div>
        <div id="measurements-empty" class="empty-state" style="display:none;">
          <i class="fas fa-ruler"></i>
          <p>Nenhuma medida ainda. Clique em "Nova Pessoa" para começar.</p>
        </div>
      </div>
    </div>
  `;
}

export function mountSaude() {
  const data = load();
  const workoutGrid = document.getElementById('workout-grid');
  const measGrid = document.getElementById('measurements-grid');
  const measEmpty = document.getElementById('measurements-empty');
  const newPersonBtn = document.getElementById('new-person-btn');

  function renderWorkout() {
    workoutGrid.innerHTML = data.workout.map((w, i) => `
      <div class="workout-card ${w.focus === 'Descanso' ? 'rest-day' : ''}">
        <div class="workout-day">${w.day}</div>
        <div class="workout-focus">${w.focus}</div>
        <textarea class="workout-textarea" data-i="${i}" placeholder="Descrição do treino..." rows="3">${w.routine || ''}</textarea>
      </div>
    `).join('');

    workoutGrid.querySelectorAll('.workout-textarea').forEach(el => {
      el.addEventListener('input', () => {
        data.workout[+el.dataset.i].routine = el.value;
        save(data);
      });
    });
  }

  function renderMeasurements() {
    if (data.people.length === 0) {
      measGrid.innerHTML = '';
      measEmpty.style.display = 'block';
      return;
    }
    measEmpty.style.display = 'none';

    measGrid.innerHTML = data.people.map((p, pi) => `
      <div class="measurement-card glass-panel">
        <div class="meas-card-top">
          <input class="meas-name-input" data-pi="${pi}" value="${(p.name || '').replace(/"/g, '&quot;')}" placeholder="Nome">
          <div class="meas-card-btns">
            <input type="color" class="meas-color" data-pi="${pi}" value="${p.color || '#34e0a1'}">
            <button class="meas-del-person" data-pi="${pi}" title="Excluir pessoa"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="meas-rows" id="meas-rows-${pi}">
          ${p.data.map((d, di) => `
            <div class="meas-row">
              <input class="meas-input" data-pi="${pi}" data-di="${di}" data-field="part" value="${(d.part || '').replace(/"/g, '&quot;')}" placeholder="Parte do corpo">
              <input class="meas-input" data-pi="${pi}" data-di="${di}" data-field="value" value="${(d.value || '').replace(/"/g, '&quot;')}" placeholder="Medida">
              <button class="meas-del-row" data-pi="${pi}" data-di="${di}"><i class="fas fa-times"></i></button>
            </div>
          `).join('')}
        </div>
        <button class="meas-add-row" data-pi="${pi}"><i class="fas fa-plus"></i> Medida</button>
      </div>
    `).join('');

    bindMeasurementEvents();
  }

  function bindMeasurementEvents() {
    measGrid.querySelectorAll('.meas-name-input').forEach(el => {
      el.addEventListener('input', () => {
        data.people[+el.dataset.pi].name = el.value;
        save(data);
      });
    });

    measGrid.querySelectorAll('.meas-color').forEach(el => {
      el.addEventListener('input', () => {
        data.people[+el.dataset.pi].color = el.value;
        save(data);
      });
    });

    measGrid.querySelectorAll('.meas-input').forEach(el => {
      el.addEventListener('input', () => {
        const pi = +el.dataset.pi;
        const di = +el.dataset.di;
        const field = el.dataset.field;
        data.people[pi].data[di][field] = el.value;
        save(data);
      });
    });

    measGrid.querySelectorAll('.meas-del-row').forEach(el => {
      el.addEventListener('click', () => {
        const pi = +el.dataset.pi;
        const di = +el.dataset.di;
        data.people[pi].data.splice(di, 1);
        save(data);
        renderMeasurements();
      });
    });

    measGrid.querySelectorAll('.meas-add-row').forEach(el => {
      el.addEventListener('click', () => {
        const pi = +el.dataset.pi;
        data.people[pi].data.push(emptyMeasurement());
        save(data);
        renderMeasurements();
      });
    });

    measGrid.querySelectorAll('.meas-del-person').forEach(el => {
      el.addEventListener('click', () => {
        if (confirm('Excluir esta pessoa e todas as medidas?')) {
          data.people.splice(+el.dataset.pi, 1);
          save(data);
          renderMeasurements();
        }
      });
    });
  }

  newPersonBtn.addEventListener('click', () => {
    data.people.push(emptyPerson());
    save(data);
    renderMeasurements();
  });

  renderWorkout();
  renderMeasurements();
}
