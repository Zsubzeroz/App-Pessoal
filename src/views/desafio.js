const challengeDays = [
  { tag:"dia 1", title:"AI jail — isolamento e segurança", desc:"Container Docker, agente nunca direto na máquina. Limita acesso ao sistema de arquivos real." },
  { tag:"dia 2", title:"Fundação — arquitetura e domínio", desc:"Histórias do projeto, stack, monorepo. Tudo documentado no CLAUDE.md. Sem código ainda." },
  { tag:"dia 3", title:"Escrever os testes", desc:"Cobertura de cada feature antes da implementação, mocando o que não existe." },
  { tag:"dia 4", title:"Mão na massa — codificação", desc:"IA escreve até o teste passar, nunca mais que isso." },
  { tag:"dia 5", title:"Otimização e refactor", desc:"Gargalos, refatoração do que ficou macarrônico." },
  { tag:"dia 6", title:"Interface de saída", desc:"Bot, API ou página simples — não precisa ser front-end completo." },
  { tag:"dia 7", title:"Deploy — esteira de CI/CD", desc:"Linters, testes, scan de vulnerabilidades, servidor de produção." }
];

const CH_KEY = "central-luan-challenge-done";

function getChDone() {
  try { return JSON.parse(localStorage.getItem(CH_KEY) || "[]"); } catch { return []; }
}

function setChDone(arr) {
  try { localStorage.setItem(CH_KEY, JSON.stringify(arr)); } catch {}
}

function updateChStatus() {
  const chDone = getChDone();
  const n = chDone.filter(Boolean).length;
  const fill = document.getElementById("chFill");
  const count = document.getElementById("chCount");
  if (fill) fill.style.width = (n / challengeDays.length * 100) + "%";
  if (count) count.textContent = n + "/" + challengeDays.length;
}

function renderDayRow(d, i, chDone) {
  const isDone = !!chDone[i];
  return `
    <div class="dayrow ${isDone ? 'done' : ''}" data-index="${i}">
      <div class="node" tabindex="0" role="checkbox" aria-checked="${isDone}" aria-label="Marcar ${d.title}">
        <svg viewBox="0 0 12 12" fill="none"><path d="M2 6.5L5 9.5L10 3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="dayrow-head"><span class="dayrow-tag">${d.tag}</span><span class="dayrow-title">${d.title}</span><span class="chev">&#8250;</span></div>
      <div class="dayrow-body"><p class="dayrow-desc">${d.desc}</p></div>
    </div>`;
}

export function renderDesafio() {
  const chDone = getChDone();
  return `
    <div class="desafio-container">
      <header class="view-header">
        <p class="panel-eyebrow">git log --oneline anti-vibe-coding</p>
        <h1 class="section-title">desafio de 7 dias</h1>
        <p class="section-desc">Do zero à produção, com disciplina de engenharia — o método Akita.</p>
      </header>

      <div class="rules">
        <b>regra 1</b> — teste sempre antes da feature, sem exceção.<br>
        <b>regra 2</b> — se a IA errar, documente no CLAUDE.md. Nunca corrija na mão.
      </div>

      <div class="day-status-bar">
        <span class="label">progresso</span>
        <div class="track"><div class="fill" id="chFill"></div></div>
        <span class="count" id="chCount">${chDone.filter(Boolean).length}/${challengeDays.length}</span>
      </div>

      <div class="log" id="chLog">
        ${challengeDays.map((d, i) => renderDayRow(d, i, chDone)).join('')}
      </div>
    </div>
  `;
}

export function mountDesafio() {
  const chDone = getChDone();
  const logEl = document.getElementById("chLog");
  if (!logEl) return;

  logEl.querySelectorAll(".dayrow").forEach(row => {
    const i = parseInt(row.dataset.index);
    const node = row.querySelector(".node");
    const head = row.querySelector(".dayrow-head");

    function toggle() {
      const arr = getChDone();
      arr[i] = !arr[i];
      setChDone(arr);
      row.classList.toggle("done", !!arr[i]);
      node.setAttribute("aria-checked", !!arr[i]);
      updateChStatus();
    }

    node.addEventListener("click", e => { e.stopPropagation(); toggle(); });
    node.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    head.addEventListener("click", () => row.classList.toggle("open"));
  });

  updateChStatus();
}
