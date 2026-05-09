export function renderRotina() {
  const links = {
    coddy: "https://coddy.tech/",
    littleLanguage: "https://littlelanguagelessons.com/",
    cisco: "https://www.netacad.com/",
    seda: "https://sedacollegeonline.com/",
    biblia: "https://www.bibliaonline.com.br/",
    libras: "https://www.handtalk.me/br/libras/",
    duolingo: "https://www.duolingo.com/",
    mate: "https://mate.academy/pt-br/home",
    unicesumar: "https://studeo.unicesumar.edu.br/",
    educa: "https://www.cursosonlineeduca.com.br/",
    euCapacito: "https://eucapacito.com.br/",
    fluency: "https://academy.fluency.io/",
    fluencyTalks: "https://talks.fluency.io/",
    xadrez: "https://www.chess.com/pt-BR",
    abaco: "https://www.geogebra.org/m/S97v79S5"
  };

  return `
    <div class="r-page-wrapper" id="capture-area">
      <!-- Header with Clock and Greeting -->
      <header class="dashboard-header">
        <div class="greeting-box">
          <h1 id="greeting-text">Olá, Luan</h1>
          <p id="current-date">Aguardando data...</p>
        </div>
        <div class="clock-box">
          <div id="digital-clock">00:00:00</div>
        </div>
      </header>

      <!-- Top Widgets Row -->
      <div class="widgets-row">
        <!-- Pomodoro Timer -->
        <div class="widget-card pomodoro-widget">
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

        <!-- Today's Progress -->
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

        <!-- Quick Habits -->
        <div class="widget-card habits-widget">
          <div class="widget-header">
            <i class="fas fa-star"></i>
            <span>Hábitos Rápidos</span>
          </div>
          <div class="habits-list">
            <a href="${links.biblia}" target="_blank" class="habit-mini">📖</a>
            <a href="${links.duolingo}" target="_blank" class="habit-mini">🦉</a>
            <a href="${links.libras}" target="_blank" class="habit-mini">✋</a>
            <a href="${links.xadrez}" target="_blank" class="habit-mini">♟️</a>
            <a href="${links.abaco}" target="_blank" class="habit-mini">🧮</a>
          </div>
        </div>
      </div>

      <!-- Weekly Planner Grid -->
      <section class="planner-section">
        <div class="section-header">
          <h2 class="section-title">Cronograma de Estudos</h2>
          <p class="section-desc">Clique para abrir o link | Botão direito ou clique duplo para concluir</p>
        </div>

        <div class="planner-grid">
          <!-- SEGUNDA -->
          <div class="day-column">
            <div class="day-label">Segunda</div>
            <div class="day-tasks">
              <div class="task-card c-music" data-link="#"><span class="t-title">🎹 Piano</span><span class="t-desc">Aula e Prática</span></div>
              <div class="task-card c-tech" data-link="${links.unicesumar}"><span class="t-title">Unicesumar</span><span class="t-desc">Studeo / Atividades</span></div>
              <div class="task-card c-tech" data-link="${links.mate}"><span class="t-title">Mate Academy</span><span class="t-desc">Frontend</span></div>
              <div class="task-card c-lang" data-link="${links.fluency}"><span class="t-title">Fluency</span><span class="t-desc">Listening</span></div>
            </div>
          </div>
          
          <!-- TERÇA -->
          <div class="day-column">
            <div class="day-label">Terça</div>
            <div class="day-tasks">
              <div class="task-card c-talks" data-link="${links.fluencyTalks}"><span class="t-title">🗣️ Conversação</span><span class="t-desc">Fluency Talks</span></div>
              <div class="task-card c-tech" data-link="${links.cisco}"><span class="t-title">Cisco NetAcad</span><span class="t-desc">Networking</span></div>
              <div class="task-card c-lang" data-link="${links.seda}"><span class="t-title">SEDA College</span><span class="t-desc">Inglês</span></div>
              <div class="task-card c-math" data-link="${links.abaco}"><span class="t-title">🧮 Ábaco Mental</span><span class="t-desc">Matemática</span></div>
            </div>
          </div>

          <!-- QUARTA -->
          <div class="day-column">
            <div class="day-label">Quarta</div>
            <div class="day-tasks">
              <div class="task-card c-tech" data-link="${links.coddy}"><span class="t-title">Coddy.tech</span><span class="t-desc">Python</span></div>
              <div class="task-card c-tech" data-link="${links.mate}"><span class="t-title">Mate Academy</span><span class="t-desc">Projetos</span></div>
              <div class="task-card c-lang" data-link="${links.littleLanguage}"><span class="t-title">Little Lang</span><span class="t-desc">Daily Lessons</span></div>
              <div class="task-card c-tech" data-link="${links.unicesumar}"><span class="t-title">Unicesumar</span><span class="t-desc">Fórum</span></div>
            </div>
          </div>

          <!-- QUINTA -->
          <div class="day-column">
            <div class="day-label">Quinta</div>
            <div class="day-tasks">
              <div class="task-card c-talks" data-link="${links.fluencyTalks}"><span class="t-title">🗣️ Conversação</span><span class="t-desc">Fluency Talks</span></div>
              <div class="task-card c-tech" data-link="${links.cisco}"><span class="t-title">Cisco NetAcad</span><span class="t-desc">Labs</span></div>
              <div class="task-card c-lang" data-link="${links.fluency}"><span class="t-title">Fluency</span><span class="t-desc">Anki</span></div>
              <div class="task-card c-music" data-link="#"><span class="t-title">🎼 Teoria</span><span class="t-desc">Partitura</span></div>
            </div>
          </div>

          <!-- SEXTA -->
          <div class="day-column">
            <div class="day-label">Sexta</div>
            <div class="day-tasks">
              <div class="task-card c-tech" data-link="${links.euCapacito}"><span class="t-title">Eu Capacito</span><span class="t-desc">Cursos</span></div>
              <div class="task-card c-tech" data-link="${links.coddy}"><span class="t-title">Coddy.tech</span><span class="t-desc">Problemas</span></div>
              <div class="task-card c-lang" data-link="${links.libras}"><span class="t-title">Libras</span><span class="t-desc">Prática</span></div>
              <div class="task-card c-relax" data-link="${links.xadrez}"><span class="t-title">♟️ Xadrez</span><span class="t-desc">Análise</span></div>
            </div>
          </div>

          <!-- SÁBADO -->
          <div class="day-column">
            <div class="day-label">Sábado</div>
            <div class="day-tasks">
              <div class="task-card c-tech" data-link="${links.educa}"><span class="t-title">Cursos Educa</span><span class="t-desc">Pessoal</span></div>
              <div class="task-card c-music" data-link="#"><span class="t-title">🎹 Piano</span><span class="t-desc">Prática Livre</span></div>
              <div class="task-card c-lang" data-link="#"><span class="t-title">Imersão</span><span class="t-desc">Filmes/Séries</span></div>
            </div>
          </div>

          <!-- DOMINGO -->
          <div class="day-column">
            <div class="day-label">Domingo</div>
            <div class="day-tasks">
              <div class="task-card c-spirit" data-link="${links.biblia}"><span class="t-title">Bíblia</span><span class="t-desc">Estudo</span></div>
              <div class="task-card c-relax" data-link="#"><span class="t-title">Planejamento</span><span class="t-desc">Agenda</span></div>
            </div>
          </div>
        </div>
      </section>

      <div class="action-footer">
        <button class="btn-primary" id="btnSalvar">📸 Salvar Painel em JPG</button>
      </div>

      <style>
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .greeting-box h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.05em; margin: 0; }
        .greeting-box p { color: var(--text-muted); margin-top: 4px; }
        .clock-box { background: var(--bg-card); padding: 12px 24px; border-radius: 16px; border: 1px solid var(--border); }
        #digital-clock { font-family: 'Monaco', monospace; font-size: 2rem; font-weight: 700; color: var(--accent); }

        .widgets-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .widget-card { background: var(--bg-card); border-radius: 20px; padding: 24px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 15px; }
        .widget-header { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .widget-header i { color: var(--accent); }

        .pomodoro-display { font-size: 3rem; font-weight: 800; text-align: center; font-variant-numeric: tabular-nums; }
        .pomodoro-controls { display: flex; justify-content: center; gap: 10px; }
        .pomo-btn { background: rgba(255,255,255,0.05); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; transition: 0.2s; }
        .pomo-btn:hover { background: var(--accent); }

        .progress-circle-container { flex: 1; display: flex; align-items: center; justify-content: center; }
        .progress-stats { font-size: 2.5rem; font-weight: 800; text-align: center; line-height: 1; }
        .progress-stats small { display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; }

        .habits-list { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
        .habit-mini { background: var(--bg-input); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 14px; font-size: 1.5rem; text-decoration: none; border: 1px solid var(--border); transition: 0.2s; }
        .habit-mini:hover { transform: translateY(-3px); border-color: var(--accent); background: rgba(14, 165, 233, 0.1); }

        .planner-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
        .day-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; padding-left: 4px; }
        .day-tasks { display: flex; flex-direction: column; gap: 10px; }
        
        .task-card { background: var(--bg-card); padding: 16px; border-radius: 14px; border: 1px solid var(--border); border-left: 4px solid #333; cursor: pointer; transition: 0.2s; }
        .task-card:hover { transform: scale(1.02); background: #1f1f23; border-color: rgba(255,255,255,0.1); }
        .task-card.done { opacity: 0.2; filter: grayscale(1); }
        .t-title { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 2px; }
        .t-desc { display: block; font-size: 0.75rem; color: var(--text-muted); }

        .c-tech { border-left-color: #0ea5e9; }
        .c-lang { border-left-color: #a855f7; }
        .c-music { border-left-color: #f97316; }
        .c-math { border-left-color: #ef4444; }
        .c-talks { border-left-color: #3b82f6; }
        .c-relax { border-left-color: #10b981; }
        .c-spirit { border-left-color: #eab308; }

        .action-footer { margin-top: 40px; text-align: center; }

        @media (max-width: 768px) {
          .widgets-row { grid-template-columns: 1fr; }
          .greeting-box h1 { font-size: 1.8rem; }
          .clock-box { display: none; }
        }
      </style>
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
      let greeting = "Boa noite, Luan";
      if (hour >= 5 && hour < 12) greeting = "Bom dia, Luan";
      else if (hour >= 12 && hour < 18) greeting = "Boa tarde, Luan";
      greetingEl.innerText = greeting;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

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

  // Task interaction
  const tasks = document.querySelectorAll('.task-card');
  const completedEl = document.getElementById('completed-count');
  const totalEl = document.getElementById('total-count');

  function updateProgress() {
    const total = tasks.length;
    const completed = document.querySelectorAll('.task-card.done').length;
    if (completedEl) completedEl.innerText = completed;
    if (totalEl) totalEl.innerText = total;
  }

  tasks.forEach(task => {
    // Click to open link
    task.addEventListener('click', (e) => {
      const link = task.getAttribute('data-link');
      if (link && link !== '#') {
        window.open(link, '_blank');
      }
    });

    // Double click or Right click to mark as done
    const markDone = (e) => {
      e.preventDefault();
      task.classList.toggle('done');
      updateProgress();
    };

    task.addEventListener('dblclick', markDone);
    task.addEventListener('contextmenu', markDone);
  });

  updateProgress();

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
