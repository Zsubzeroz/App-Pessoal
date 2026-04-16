export function renderRotina() {
  // Objeto central de links atualizado
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
    fluencyTalks: "https://talks.fluency.io/", // Novo Link
    xadrez: "https://www.chess.com/pt-BR",
    piano: "#", 
    abaco: "https://www.geogebra.org/m/S97v79S5" 
  };

  return `
    <style>
      .r-container { 
        max-width: 1200px; margin: 0 auto; font-family: 'Inter', sans-serif;
        background-color: #0a0a0a; padding: 20px; border-radius: 15px; color: #fff;
      }
      .r-header { text-align: center; margin-bottom: 30px; }
      .r-header h1 { font-size: 26px; margin-bottom: 5px; color: #fff; }
      .r-header p { color: #888; font-size: 13px; }
      
      /* Habits */
      .habits-container { 
        display: flex; justify-content: center; gap: 12px; margin-bottom: 30px; flex-wrap: wrap; 
      }
      .habit { 
        background-color: #121212; padding: 10px 16px; border-radius: 10px; 
        display: flex; align-items: center; gap: 8px; font-size: 12px; 
        color: #e0e0e0; text-decoration: none; border: 1px solid #222; transition: 0.2s;
      }
      .habit:hover { border-color: #444; background: #1a1a1a; transform: translateY(-2px); }

      /* Grid */
      .grid-board { 
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; 
      }
      @media (max-width: 1100px) { .grid-board { grid-template-columns: repeat(3, 1fr); } }
      @media (max-width: 850px) { .grid-board { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 550px) { .grid-board { grid-template-columns: 1fr; } }
      
      /* Day Cards */
      .day-card { 
        background-color: #161616; border-radius: 12px; padding: 15px; 
        display: flex; flex-direction: column; gap: 10px; border: 1px solid #222;
      }
      .day-title { 
        font-size: 11px; font-weight: 800; color: #666; text-transform: uppercase; 
        letter-spacing: 1px; margin-bottom: 5px;
      }
      
      /* Task Items */
      .task-link { text-decoration: none; display: block; }
      .task { 
        background-color: #1f1f1f; border-radius: 8px; padding: 12px; 
        display: flex; flex-direction: column; gap: 4px; border-left: 4px solid #333;
        transition: 0.2s; position: relative;
      }
      .task:hover { background-color: #282828; }
      .task.done { opacity: 0.3; filter: grayscale(1); }
      .task.done::after { content: '✓'; position: absolute; right: 10px; top: 10px; color: #1dd1a1; font-weight: bold; }
      
      .task-title { font-size: 13px; font-weight: 700; color: #eee; }
      .task-desc { font-size: 11px; color: #888; }
      
      /* Cores */
      .c-tech { border-left-color: #00d2d3; } 
      .c-lang { border-left-color: #9b59b6; } 
      .c-music { border-left-color: #ff9f43; } 
      .c-math { border-left-color: #ee5253; } 
      .c-relax { border-left-color: #1dd1a1; } 
      .c-spirit { border-left-color: #feca57; }
      .c-talks { border-left-color: #54a0ff; } /* Cor específica para conversação */

      .r-btn { 
        border: 1px solid #333; background: #1a1a1a; color: #fff; padding: 10px 20px; 
        border-radius: 8px; cursor: pointer; margin-top: 30px; font-size: 13px;
      }
    </style>
    
    <div class="r-container" id="capture-area">
      <div class="r-header">
        <h1>Painel de Estudos Integrado</h1>
        <p>Clique nos cards para abrir os portais | Botão direito ou clique duplo para concluir</p>
      </div>

      <div class="habits-container">
        <a href="${links.biblia}" target="_blank" class="habit">📖 Bíblia</a>
        <a href="${links.duolingo}" target="_blank" class="habit">🦉 Duolingo</a>
        <a href="${links.libras}" target="_blank" class="habit">✋ Libras</a>
        <a href="${links.xadrez}" target="_blank" class="habit">♟️ Xadrez</a>
        <a href="${links.abaco}" target="_blank" class="habit">🧮 Ábaco</a>
      </div>

      <div class="grid-board">
        <!-- SEGUNDA -->
        <div class="day-card">
          <div class="day-title">Segunda-feira</div>
          <a href="${links.piano}" target="_blank" class="task-link"><div class="task c-music"><span class="task-title">🎹 Piano</span><span class="task-desc">Aula e Prática</span></div></a>
          <a href="${links.unicesumar}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Unicesumar</span><span class="task-desc">Studeo / Atividades</span></div></a>
          <a href="${links.mate}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Mate Academy</span><span class="task-desc">Code / Frontend</span></div></a>
          <a href="${links.fluency}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-title">Fluency Academy</span><span class="task-desc">Listening Practice</span></div></a>
        </div>
        
        <!-- TERÇA -->
        <div class="day-card">
          <div class="day-title">Terça-feira</div>
          <a href="${links.fluencyTalks}" target="_blank" class="task-link"><div class="task c-talks"><span class="task-title">🗣️ Fluency Talks</span><span class="task-desc">Sessão de Conversação</span></div></a>
          <a href="${links.cisco}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Cisco NetAcad</span><span class="task-desc">Networking / Infra</span></div></a>
          <a href="${links.seda}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-title">SEDA College</span><span class="task-desc">Brasil Bilíngue</span></div></a>
          <a href="${links.abaco}" target="_blank" class="task-link"><div class="task c-math"><span class="task-title">🧮 Ábaco Mental</span><span class="task-desc">Matemática Oriental</span></div></a>
        </div>

        <!-- QUARTA -->
        <div class="day-card">
          <div class="day-title">Quarta-feira</div>
          <a href="${links.coddy}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Coddy.tech</span><span class="task-desc">Python Fundamentals</span></div></a>
          <a href="${links.mate}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Mate Academy</span><span class="task-desc">Projetos em Grupo</span></div></a>
          <a href="${links.littleLanguage}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-title">Little Language</span><span class="task-desc">Daily Lessons</span></div></a>
          <a href="${links.unicesumar}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Unicesumar</span><span class="task-desc">Fórum e Teoria</span></div></a>
        </div>

        <!-- QUINTA -->
        <div class="day-card">
          <div class="day-title">Quinta-feira</div>
          <a href="${links.fluencyTalks}" target="_blank" class="task-link"><div class="task c-talks"><span class="task-title">🗣️ Fluency Talks</span><span class="task-desc">Sessão de Conversação</span></div></a>
          <a href="${links.cisco}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Cisco NetAcad</span><span class="task-desc">Labs / Packet Tracer</span></div></a>
          <a href="${links.fluency}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-title">Fluency Academy</span><span class="task-desc">Memorização / Anki</span></div></a>
          <a href="#" target="_blank" class="task-link"><div class="task c-music"><span class="task-title">🎼 Teoria Musical</span><span class="task-desc">Solfejo e Partitura</span></div></a>
        </div>

        <!-- SEXTA -->
        <div class="day-card">
          <div class="day-title">Sexta-feira</div>
          <a href="${links.euCapacito}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Eu Capacito</span><span class="task-desc">Cursos e Certificados</span></div></a>
          <a href="${links.coddy}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Coddy.tech</span><span class="task-desc">Resolução de Problemas</span></div></a>
          <a href="${links.libras}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-title">Libras Básico</span><span class="task-desc">Prática de Sinais</span></div></a>
          <a href="${links.xadrez}" target="_blank" class="task-link"><div class="task c-relax"><span class="task-title">♟️ Xadrez</span><span class="task-desc">Análise de Partidas</span></div></a>
        </div>

        <!-- SÁBADO -->
        <div class="day-card">
          <div class="day-title">Sábado</div>
          <a href="${links.educa}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-title">Cursos Educa</span><span class="task-desc">Desenvolvimento Pessoal</span></div></a>
          <a href="${links.piano}" target="_blank" class="task-link"><div class="task c-music"><span class="task-title">🎹 Piano</span><span class="task-desc">Prática Livre / Música</span></div></a>
          <a href="${links.fluency}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-title">Imersão Inglês</span><span class="task-desc">Filmes / Séries</span></div></a>
        </div>

        <!-- DOMINGO -->
        <div class="day-card">
          <div class="day-title">Domingo</div>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-title">Bíblia Ilustrada</span><span class="task-desc">Renovação e Estudo</span></div></a>
          <a href="#" class="task-link"><div class="task c-relax"><span class="task-title">Planejamento</span><span class="task-desc">Organizar próxima semana</span></div></a>
        </div>
      </div>
      
      <div style="text-align: center;">
        <button class="r-btn" id="btnSalvar">📸 Salvar Painel em JPG</button>
      </div>
    </div>
  `;
}

export function mountRotina() {
  document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('contextmenu', function(e) {
      e.preventDefault(); 
      this.classList.toggle('done');
    });
    
    task.addEventListener('dblclick', function(e) {
      e.preventDefault();
      this.classList.toggle('done');
    });
  });

  const btn = document.getElementById('btnSalvar');
  if(btn) {
    btn.addEventListener('click', () => {
      btn.style.display = 'none';
      html2canvas(document.getElementById('capture-area'), {
        backgroundColor: '#0a0a0a', scale: 2
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Minha_Rotina_Links.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        btn.style.display = 'inline-block';
      });
    });
  }
}
