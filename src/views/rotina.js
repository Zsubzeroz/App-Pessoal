import { escapeHtml, escapeAttr } from '../utils.js';

const DEFAULT_ROUTINE = {
  Segunda: [],
  Terça: [],
  Quarta: [],
  Quinta: [],
  Sexta: [],
  Sábado: [],
  Domingo: []
};


export function renderRotina() {
  const currentRoutine = JSON.parse(localStorage.getItem('zen-routine-data')) || DEFAULT_ROUTINE;
  const completedTasks = JSON.parse(localStorage.getItem('zen-routine-completed')) || [];

  const dayColumns = Object.entries(currentRoutine).map(([day, tasks]) => {
    const taskCards = tasks.map((task, idx) => {
      const taskId = `${day}-${idx}`;
      const isDone = completedTasks.includes(taskId);
      const safeTitle = escapeHtml(task.title);
      const safeDesc = escapeHtml(task.desc);
      const safeLink = escapeAttr(task.link || '#');
      const safeColor = escapeAttr(task.color || 'c-tech');
      const timeBadge = task.tempo ? `<span class="t-time">${escapeHtml(task.tempo)}</span>` : '';
      return `
        <div class="task-card ${safeColor} ${isDone ? 'done' : ''}" data-id="${escapeAttr(taskId)}" data-link="${safeLink}">
          ${timeBadge}
          <span class="t-title">${safeTitle}</span>
          <span class="t-desc">${safeDesc}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="day-column">
        <div class="day-label">${day}</div>
        <div class="day-tasks">${taskCards}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="r-page-wrapper" id="capture-area">
      <header class="dashboard-header">
        <div class="greeting-box">
          <div class="status-indicator"><span class="pulse"></span> Online e Focado</div>
          <h1 id="greeting-text">Olá!</h1>
          <p id="current-date">Aguardando data...</p>
        </div>
        <div class="quote-box glass-panel">
          <i class="fas fa-quote-left"></i>
          <div>
            <p id="motivational-quote">"A disciplina é a ponte entre metas e realizações."</p>
            <span id="quote-author">Jim Rohn</span>
          </div>
        </div>
        <div class="clock-box glass-panel">
          <div id="digital-clock">00:00:00</div>
        </div>
      </header>

      <div class="widgets-row">
        <div class="widget-card glass-panel pomodoro-widget">
          <div class="widget-header">
            <i class="fas fa-stopwatch"></i>
            <span>Foco Pomodoro</span>
          </div>
          <div class="pomodoro-display" id="pomo-timer">25:00</div>
          <div class="pomodoro-controls">
            <button id="pomo-start" class="pomo-btn"><i class="fas fa-play"></i></button>
            <button id="pomo-pause" class="pomo-btn"><i class="fas fa-pause"></i></button>
            <button id="pomo-reset" class="pomo-btn"><i class="fas fa-undo"></i></button>
          </div>
        </div>

        <div class="widget-card progress-widget">
          <div class="widget-header">
            <i class="fas fa-chart-line"></i>
            <span>Progresso Diário</span>
          </div>
          <div class="progress-circle-container">
             <div class="progress-stats">
                <span id="completed-count">0</span>/<span id="total-count">0</span>
                <small>Tarefas</small>
             </div>
          </div>
        </div>


      </div>

      <section class="planner-section">
        <div class="section-header">
          <div class="header-left">
            <h2 class="section-title">Cronograma de Estudos</h2>
            <p class="section-desc">Clique para abrir o link | Botão direito ou clique duplo para concluir</p>
          </div>
          <button id="btn-edit-routine" class="pomo-btn" title="Editar Rotina"><i class="fas fa-edit"></i> Editar Rotina</button>
        </div>

        <div class="planner-grid">
          ${dayColumns}
        </div>
      </section>

      <div class="action-footer">
        <button class="btn-primary" id="btnSalvar">📸 Salvar Painel em JPG</button>
      </div>
    </div>
  `;
}


export function mountRotina() {
  // Clock logic
  function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('digital-clock');
    const dateEl = document.getElementById('current-date');
    const greetingEl = document.getElementById('greeting-text');

    if (clockEl) clockEl.innerText = now.toLocaleTimeString('pt-BR');
    
    if (dateEl) {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      dateEl.innerText = now.toLocaleDateString('pt-BR', options);
    }

    if (greetingEl) {
      const hour = now.getHours();
      let greeting = "Boa noite";
      if (hour >= 5 && hour < 12) greeting = "Bom dia";
      else if (hour >= 12 && hour < 18) greeting = "Boa tarde";
      greetingEl.innerText = greeting;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Quote rotation
  const quotes = [
    { text: "Amai-vos uns aos outros como eu vos amei.", author: "Jesus" },
    { text: "A verdade vos libertará.", author: "Jesus" },
    { text: "Conhece-te a ti mesmo.", author: "Sócrates" },
    { text: "Uma vida não examinada não vale a pena ser vivida.", author: "Sócrates" },
    { text: "O universo é harmonia e número.", author: "Pitágoras" },
    { text: "Eduquem as crianças e não será necessário castigar os homens.", author: "Pitágoras" },
    { text: "A simplicidade é o último grau de sofisticação.", author: "Leonardo da Vinci" },
    { text: "Aprender é a única coisa de que a mente nunca se cansa.", author: "Leonardo da Vinci" },
    { text: "Quando se desenha, não se deve contar, deve-se desenhar.", author: "Raphael" },
    { text: "A arte é a expressão da alma.", author: "Donatello" },
    { text: "Eu vi o anjo no mármore e esculpi até libertá-lo.", author: "Michelangelo" },
    { text: "Ainda estou aprendendo.", author: "Michelangelo" }
  ];
  const quoteEl = document.getElementById('motivational-quote');
  const authorEl = document.getElementById('quote-author');
  if (quoteEl && authorEl) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.innerText = `"${randomQuote.text}"`;
    authorEl.innerText = randomQuote.author;
  }

  // Pomodoro logic
  let pomoTime = 25 * 60;
  let pomoInterval = null;
  const pomoDisplay = document.getElementById('pomo-timer');
  
  function updatePomoDisplay() {
    if (!pomoDisplay) return;
    const mins = Math.floor(pomoTime / 60);
    const secs = pomoTime % 60;
    pomoDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  const startBtn = document.getElementById('pomo-start');
  const pauseBtn = document.getElementById('pomo-pause');
  const resetBtn = document.getElementById('pomo-reset');

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (pomoInterval) return;
      pomoInterval = setInterval(() => {
        if (pomoTime > 0) {
          pomoTime--;
          updatePomoDisplay();
        } else {
          clearInterval(pomoInterval);
          pomoInterval = null;
          alert('Pomodoro concluído!');
        }
      }, 1000);
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      clearInterval(pomoInterval);
      pomoInterval = null;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(pomoInterval);
      pomoInterval = null;
      pomoTime = 25 * 60;
      updatePomoDisplay();
    });
  }

  // Task interaction & Persistence
  const tasks = document.querySelectorAll('.task-card');
  const completedEl = document.getElementById('completed-count');
  const totalEl = document.getElementById('total-count');

  function openLink(link) {
    console.log('Tentando abrir link:', link);
    if (!link || link === '#') return;
    window.open(link, '_blank');
  }

  function getCompleted() {
    return JSON.parse(localStorage.getItem('zen-routine-completed')) || [];
  }

  function saveCompleted(completed) {
    localStorage.setItem('zen-routine-completed', JSON.stringify(completed));
  }

  function updateProgress() {
    const total = tasks.length;
    const completed = document.querySelectorAll('.task-card.done').length;
    if (completedEl) completedEl.innerText = completed;
    if (totalEl) totalEl.innerText = total;
  }

  tasks.forEach(task => {
    task.addEventListener('click', (e) => {
      const link = task.getAttribute('data-link');
      console.log('Task clicada:', link);
      openLink(link);
    });

    const markDone = (e) => {
      e.preventDefault();
      const taskId = task.getAttribute('data-id');
      task.classList.toggle('done');
      
      let completed = getCompleted();
      if (task.classList.contains('done')) {
        if (!completed.includes(taskId)) completed.push(taskId);
      } else {
        completed = completed.filter(id => id !== taskId);
      }
      saveCompleted(completed);
      updateProgress();
    };

    task.addEventListener('dblclick', markDone);
    task.addEventListener('contextmenu', markDone);
  });

  updateProgress();

  // Edit Routine Logic
  const editBtn = document.getElementById('btn-edit-routine');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const currentRoutine = JSON.parse(localStorage.getItem('zen-routine-data')) || DEFAULT_ROUTINE;
      
      // Create Modal Backdrop
      const modal = document.createElement('div');
      modal.className = 'routine-modal-backdrop';
      
      let daysHtml = Object.entries(currentRoutine).map(([day, tasks]) => {
        const tasksHtml = tasks.map((t, i) => `
          <div class="edit-task-row" data-day="${escapeAttr(day)}" data-index="${i}">
            <input type="text" value="${escapeAttr(t.title)}" class="edit-t-title" placeholder="Título">
            <input type="text" value="${escapeAttr(t.desc)}" class="edit-t-desc" placeholder="Descrição">
            <input type="text" value="${escapeAttr(t.link)}" class="edit-t-link" placeholder="Link (URL)">
            <select class="edit-t-color">
               <option value="c-tech" ${t.color==='c-tech'?'selected':''}>Tecnologia</option>
               <option value="c-lang" ${t.color==='c-lang'?'selected':''}>Línguas</option>
               <option value="c-music" ${t.color==='c-music'?'selected':''}>Música</option>
               <option value="c-math" ${t.color==='c-math'?'selected':''}>Matemática</option>
               <option value="c-talks" ${t.color==='c-talks'?'selected':''}>Conversação</option>
               <option value="c-relax" ${t.color==='c-relax'?'selected':''}>Relax / Lazer</option>
               <option value="c-spirit" ${t.color==='c-spirit'?'selected':''}>Espiritual</option>
               <option value="c-sports" ${t.color==='c-sports'?'selected':''}>Sports 🏃</option>
               <option value="c-career" ${t.color==='c-career'?'selected':''}>Carreira</option>
            </select>
            <button class="remove-task-btn"><i class="fas fa-trash"></i></button>
          </div>
        `).join('');
        
        return `
          <div class="edit-day-section">
            <h3>${escapeHtml(day)}</h3>
            <div class="day-tasks-edit" id="edit-tasks-${escapeAttr(day)}">
              ${tasksHtml}
            </div>
            <button class="add-task-btn" data-day="${escapeAttr(day)}"><i class="fas fa-plus"></i> Adicionar Tarefa</button>
          </div>
        `;
      }).join('');

      modal.innerHTML = `
        <div class="routine-modal glass-panel">
          <div class="modal-header">
            <h2>Gerenciar Cronograma</h2>
            <button id="close-modal"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            ${daysHtml}
          </div>
          <div class="modal-footer">
            <button id="reset-routine" class="btn-secondary">Restaurar Padrão</button>
            <button id="save-routine" class="btn-primary">Salvar Alterações</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Modal interactions
      modal.querySelector('#close-modal').onclick = () => modal.remove();
      
      modal.querySelectorAll('.remove-task-btn').forEach(btn => {
        btn.onclick = () => btn.parentElement.remove();
      });

      modal.querySelectorAll('.add-task-btn').forEach(btn => {
        btn.onclick = () => {
          const day = btn.getAttribute('data-day');
          const container = modal.querySelector(`#edit-tasks-${day}`);
          const row = document.createElement('div');
          row.className = 'edit-task-row';
          row.innerHTML = `
            <input type="text" value="" class="edit-t-title" placeholder="Título">
            <input type="text" value="" class="edit-t-desc" placeholder="Descrição">
            <input type="text" value="#" class="edit-t-link" placeholder="Link (URL)">
            <select class="edit-t-color">
               <option value="c-tech">Tecnologia</option>
               <option value="c-lang">Línguas</option>
               <option value="c-music">Música</option>
               <option value="c-math">Matemática</option>
               <option value="c-talks">Conversação</option>
               <option value="c-relax">Relax / Lazer</option>
               <option value="c-spirit">Espiritual</option>
               <option value="c-sports">Sports 🏃</option>
               <option value="c-career">Carreira</option>
            </select>
            <button class="remove-task-btn"><i class="fas fa-trash"></i></button>
          `;
          row.querySelector('.remove-task-btn').onclick = () => row.remove();
          container.appendChild(row);
        };
      });

      modal.querySelector('#reset-routine').onclick = () => {
        if (confirm('Tem certeza que deseja restaurar a rotina original?')) {
          localStorage.removeItem('zen-routine-data');
          localStorage.removeItem('zen-routine-completed');
          location.reload();
        }
      };

      modal.querySelector('#save-routine').onclick = () => {
        const newRoutine = {};
        const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
        
        days.forEach(day => {
          newRoutine[day] = [];
          const rows = modal.querySelectorAll(`#edit-tasks-${day} .edit-task-row`);
          rows.forEach(row => {
            newRoutine[day].push({
              title: row.querySelector('.edit-t-title').value,
              desc: row.querySelector('.edit-t-desc').value,
              link: row.querySelector('.edit-t-link').value,
              color: row.querySelector('.edit-t-color').value
            });
          });
        });

        localStorage.setItem('zen-routine-data', JSON.stringify(newRoutine));
        location.reload();
      };
    });
  }

  // Save as JPG
  const btnSalvar = document.getElementById('btnSalvar');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      btnSalvar.style.display = 'none';
      html2canvas(document.getElementById('capture-area'), {
        backgroundColor: '#09090b',
        scale: 2,
        logging: false,
        useCORS: true
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Minha_Rotina_Central.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
        btnSalvar.style.display = 'inline-block';
      });
    });
  }
}

