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
    piano: "#", 
    abaco: "https://www.geogebra.org/m/S97v79S5" 
  };

  return `
    <style>
      .r-container { 
        max-width: 1250px; margin: 0 auto; font-family: 'Inter', sans-serif;
        background-color: #0b0c10; padding: 25px; border-radius: 16px; color: #c5c6c7;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      }
      .r-header { text-align: center; margin-bottom: 35px; }
      .r-header h1 { font-size: 28px; margin-bottom: 8px; color: #66fcf1; font-weight: 800; letter-spacing: 0.5px; }
      .r-header p { color: #8b9bb4; font-size: 14px; }
      
      /* Quick Habits Bar */
      .habits-container { 
        display: flex; justify-content: center; gap: 14px; margin-bottom: 35px; flex-wrap: wrap; 
      }
      .habit { 
        background: linear-gradient(135deg, #1f2833, #151c24); padding: 12px 20px; border-radius: 12px; 
        display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600;
        color: #66fcf1; text-decoration: none; border: 1px solid #1f2833; transition: 0.3s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      .habit:hover { border-color: #45f3ff; background: #1f2833; transform: translateY(-3px); }

      /* Visual Grid Layout for Weekly Schedule */
      .grid-board { 
        display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; 
      }
      
      /* Day Card Design */
      .day-card { 
        background: linear-gradient(135deg, #111622, #0d1117); border-radius: 16px; padding: 18px; 
        display: flex; flex-direction: column; gap: 12px; border: 1px solid #1f2833;
        transition: 0.3s; box-shadow: 0 6px 18px rgba(0,0,0,0.15);
      }
      .day-card:hover { border-color: #45f3ff; transform: translateY(-4px); }
      .day-title { 
        font-size: 14px; font-weight: 800; color: #45f3ff; text-transform: uppercase; 
        letter-spacing: 1.2px; margin-bottom: 8px; border-bottom: 1px solid #1f2833; 
        padding-bottom: 6px; display: flex; align-items: center; justify-content: space-between;
      }
      
      /* Task Layout with Hours */
      .task-link { text-decoration: none; display: block; }
      .task { 
        background-color: #1a2230; border-radius: 10px; padding: 10px 14px; 
        display: flex; align-items: center; gap: 14px; border-left: 4px solid #333;
        transition: 0.25s; position: relative; cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
      .task:hover { background-color: #243042; transform: translateX(2px); }
      .task.done { opacity: 0.25; filter: grayscale(1); border-left-color: #888 !important; }
      .task.done::after { content: '✓'; position: absolute; right: 12px; top: 12px; color: #00ff87; font-weight: 800; font-size: 14px; }
      
      .task-time { font-size: 13px; font-weight: 800; color: #45f3ff; min-width: 45px; }
      .task-info { display: flex; flex-direction: column; gap: 3px; }
      .task-title { font-size: 13px; font-weight: 700; color: #edf5e1; }
      .task-desc { font-size: 11px; color: #8b9bb4; }
      
      /* Task color indicators */
      .c-core { border-left-color: #ff4a4a; } 
      .c-lang { border-left-color: #9b59b6; } 
      .c-tech { border-left-color: #3498db; } 
      .c-music { border-left-color: #ff9f43; } 
      .c-hobby { border-left-color: #1dd1a1; } 
      .c-spirit { border-left-color: #feca57; }

      .r-btn { 
        border: 1px solid #45f3ff; background: #0b0c10; color: #45f3ff; padding: 12px 24px; 
        border-radius: 10px; cursor: pointer; margin-top: 35px; font-size: 14px;
        font-weight: 600; transition: 0.3s; box-shadow: 0 4px 12px rgba(69, 252, 241, 0.15);
      }
      .r-btn:hover { background: #45f3ff; color: #0b0c10; transform: translateY(-2px); }
    </style>
    
    <div class="r-container" id="capture-area">
      <div class="r-header">
        <h1>Planejamento Semanal</h1>
        <p>Acompanhe suas atividades semanais | Clique com botão direito ou clique duplo para concluir</p>
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
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">07:00</span><div class="task-info"><span class="task-title">Acordar / Café</span><span class="task-desc">Início do dia</span></div></div></a>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-time">07:30</span><div class="task-info"><span class="task-title">📖 Bíblia Ilustrada</span><span class="task-desc">Leitura e oração</span></div></div></a>
          <a href="${links.duolingo}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">08:00</span><div class="task-info"><span class="task-title">🦉 Duolingo (15min)</span><span class="task-desc">Prática de Idiomas</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Foco total</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">12:00</span><div class="task-info"><span class="task-title">🍽️ Almoço</span><span class="task-desc">Descanso e refeição</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">13:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Retorno às atividades</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">18:00</span><div class="task-info"><span class="task-title">🚗 Deslocamento</span><span class="task-desc">Fim do expediente</span></div></div></a>
          <a href="${links.piano}" target="_blank" class="task-link"><div class="task c-music"><span class="task-time">19:00</span><div class="task-info"><span class="task-title">🎹 Piano</span><span class="task-desc">Prática de partituras</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-hobby"><span class="task-time">20:30</span><div class="task-info"><span class="task-title">🥋 JIU-JITSU</span><span class="task-desc">Atividade física</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-title">🌙 Descanso</span><span class="task-desc">Preparação para dormir</span></div></div></a>
        </div>
        
        <!-- TERÇA -->
        <div class="day-card">
          <div class="day-title">Terça-feira</div>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">07:00</span><div class="task-info"><span class="task-title">Acordar / Café</span><span class="task-desc">Início do dia</span></div></div></a>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-time">07:30</span><div class="task-info"><span class="task-title">📖 Bíblia Ilustrada</span><span class="task-desc">Leitura e oração</span></div></div></a>
          <a href="${links.libras}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">08:00</span><div class="task-info"><span class="task-title">✋ Libras (15min)</span><span class="task-desc">Prática de sinais</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Foco total</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">12:00</span><div class="task-info"><span class="task-title">🍽️ Almoço</span><span class="task-desc">Descanso e refeição</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">13:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Retorno às atividades</span></div></div></a>
          <a href="${links.coddy}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-time">18:00</span><div class="task-info"><span class="task-title">🐍 Coddy (Python)</span><span class="task-desc">Resolução de problemas</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-tech"><span class="task-time">19:00</span><div class="task-info"><span class="task-title">☁️ Google Cloud Lab</span><span class="task-desc">Prática em nuvem</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">20:30</span><div class="task-info"><span class="task-title">🍽️ Jantar / Lazer</span><span class="task-desc">Descanso noturno</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-title">📚 Leitura / Sono</span><span class="task-desc">Desconexão</span></div></div></a>
        </div>

        <!-- QUARTA -->
        <div class="day-card">
          <div class="day-title">Quarta-feira</div>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">07:00</span><div class="task-info"><span class="task-title">Acordar / Café</span><span class="task-desc">Início do dia</span></div></div></a>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-time">07:30</span><div class="task-info"><span class="task-title">📖 Bíblia Ilustrada</span><span class="task-desc">Leitura e oração</span></div></div></a>
          <a href="${links.duolingo}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">08:00</span><div class="task-info"><span class="task-title">🦉 Duolingo (15min)</span><span class="task-desc">Prática de Idiomas</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Foco total</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">12:00</span><div class="task-info"><span class="task-title">🍽️ Almoço</span><span class="task-desc">Descanso e refeição</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">13:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Retorno às atividades</span></div></div></a>
          <a href="${links.fluency}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">18:00</span><div class="task-info"><span class="task-title">🇬🇧 Fluency Academy</span><span class="task-desc">Listening & Prática</span></div></div></a>
          <a href="${links.seda}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">19:00</span><div class="task-info"><span class="task-title">🌐 SEDA College</span><span class="task-desc">Inglês Avançado</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">20:30</span><div class="task-info"><span class="task-title">🍽️ Jantar / Lazer</span><span class="task-desc">Descanso noturno</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-time">22:00</span><span class="task-title">📚 Leitura / Sono</span><span class="task-desc">Desconexão</span></div></div></a>
        </div>

        <!-- QUINTA -->
        <div class="day-card">
          <div class="day-title">Quinta-feira</div>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">07:00</span><div class="task-info"><span class="task-title">Acordar / Café</span><span class="task-desc">Início do dia</span></div></div></a>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-time">07:30</span><div class="task-info"><span class="task-title">📖 Bíblia Ilustrada</span><span class="task-desc">Leitura e oração</span></div></div></a>
          <a href="${links.libras}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">08:00</span><div class="task-info"><span class="task-title">✋ Libras (15min)</span><span class="task-desc">Prática de sinais</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Foco total</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">12:00</span><div class="task-info"><span class="task-title">🍽️ Almoço</span><span class="task-desc">Descanso e refeição</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">13:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Retorno às atividades</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-music"><span class="task-time">18:00</span><div class="task-info"><span class="task-title">🎼 Teoria Musical</span><span class="task-desc">Estudo e Solfejo</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-music"><span class="task-time">19:00</span><div class="task-info"><span class="task-title">🎹 TEORIA MUSICAL</span><span class="task-desc">Harmonia e Prática</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">20:30</span><div class="task-info"><span class="task-title">🍽️ Jantar / Lazer</span><span class="task-desc">Descanso noturno</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-title">📚 Leitura / Sono</span><span class="task-desc">Desconexão</span></div></div></a>
        </div>

        <!-- SEXTA -->
        <div class="day-card">
          <div class="day-title">Sexta-feira</div>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">07:00</span><div class="task-info"><span class="task-title">Acordar / Café</span><span class="task-desc">Início do dia</span></div></div></a>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-time">07:30</span><div class="task-info"><span class="task-title">📖 Bíblia Ilustrada</span><span class="task-desc">Leitura e oração</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-tech"><span class="task-time">08:00</span><div class="task-info"><span class="task-title">📈 Estudo Rápido</span><span class="task-desc">Meta diária</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Foco total</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">12:00</span><div class="task-info"><span class="task-title">🍽️ Almoço</span><span class="task-desc">Descanso e refeição</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">13:00</span><div class="task-info"><span class="task-title">💼 TRABALHO</span><span class="task-desc">Retorno às atividades</span></div></div></a>
          <a href="${links.unicesumar}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-time">18:00</span><div class="task-info"><span class="task-title">📝 Revisão Unicesumar</span><span class="task-desc">Resumos e matérias</span></div></div></a>
          <a href="${links.euCapacito}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-time">19:00</span><div class="task-info"><span class="task-title">💡 Eu Capacito / Educa</span><span class="task-desc">Cursos complementares</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">20:30</span><div class="task-info"><span class="task-title">🍽️ Jantar / Lazer</span><span class="task-desc">Descanso noturno</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-title">🎉 Lazer Livre</span><span class="task-desc">Descontração</span></div></div></a>
        </div>

        <!-- SÁBADO -->
        <div class="day-card">
          <div class="day-title">Sábado</div>
          <a href="${links.educa}" target="_blank" class="task-link"><div class="task c-tech"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">💡 Cursos Educa</span><span class="task-desc">Cursos e Certificados</span></div></div></a>
          <a href="${links.piano}" target="_blank" class="task-link"><div class="task c-music"><span class="task-time">14:00</span><div class="task-info"><span class="task-title">🎹 Piano</span><span class="task-desc">Prática livre</span></div></div></a>
          <a href="${links.fluency}" target="_blank" class="task-link"><div class="task c-lang"><span class="task-time">18:00</span><div class="task-info"><span class="task-title">🇬🇧 Imersão Inglês</span><span class="task-desc">Estudo e imersão</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-title">🌙 Lazer / Descanso</span><span class="task-desc">Relaxamento</span></div></div></a>
        </div>

        <!-- DOMINGO -->
        <div class="day-card">
          <div class="day-title">Domingo</div>
          <a href="${links.biblia}" target="_blank" class="task-link"><div class="task c-spirit"><span class="task-time">09:00</span><div class="task-info"><span class="task-title">📖 Bíblia Ilustrada</span><span class="task-desc">Leitura e meditação</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-hobby"><span class="task-time">11:00</span><div class="task-info"><span class="task-title">📆 Planejamento</span><span class="task-desc">Próxima semana</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">14:00</span><div class="task-info"><span class="task-title">🏖️ Descanso / Lazer</span><span class="task-desc">Dia em família</span></div></div></a>
          <a href="#" class="task-link"><div class="task c-core"><span class="task-time">22:00</span><div class="task-info"><span class="task-title">🌙 Dormir / Descanso</span><span class="task-desc">Noite de sono</span></div></div></a>
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
        backgroundColor: '#0b0c10', scale: 2
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Minha_Rotina_Semanal.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        btn.style.display = 'inline-block';
      });
    });
  }
}
