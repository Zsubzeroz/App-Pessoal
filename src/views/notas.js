const NOTES_KEY = "central-luan-notas";
const API_KEY_STORAGE = "central-luan-api-key";

function getNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); } catch { return []; }
}

function setNotes(arr) {
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(arr)); } catch {}
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

async function callClaude(rawText, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 700,
      messages: [{ role: "user", content:
        "Você organiza anotações técnicas de um engenheiro de software e cibersegurança. Reescreva em português, clara e estruturada, sem inventar fatos novos. Responda APENAS com JSON: {\"title\":\"até 8 palavras\",\"content\":\"nota organizada\"}.\n\nNota bruta:\n" + rawText
      }]
    })
  });
  if (!response.ok) throw new Error("status " + response.status);
  const data = await response.json();
  const text = data.content.map(b => b.text || "").join("\n");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

function addNote(title, content, ai) {
  const notes = getNotes();
  notes.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    content,
    ai,
    date: new Date().toLocaleString("pt-BR")
  });
  setNotes(notes);
  renderNotesList();
}

function renderNotesList() {
  const list = document.getElementById("notesList");
  if (!list) return;
  const notes = getNotes();
  if (notes.length === 0) {
    list.innerHTML = '<p class="note-empty">nenhuma anotação ainda.</p>';
    return;
  }
  list.innerHTML = "";
  notes.slice().reverse().forEach(n => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <button class="note-del" aria-label="Excluir" data-id="${n.id}">×</button>
      <div class="note-title">${escapeHtml(n.title)}</div>
      <div class="note-content">${escapeHtml(n.content)}</div>
      <div class="note-meta">${n.date}${n.ai ? " · organizado por IA" : ""}</div>`;
    list.appendChild(card);
  });
  list.querySelectorAll(".note-del").forEach(btn => {
    btn.addEventListener("click", () => {
      const notes = getNotes().filter(n => n.id !== btn.dataset.id);
      setNotes(notes);
      renderNotesList();
    });
  });
}

export function renderNotas() {
  return `
    <div class="notas-container">
      <header class="view-header">
        <p class="panel-eyebrow">echo "nova anotação" >> caderno.md</p>
        <h1 class="section-title">Ideias & Notas</h1>
        <p class="section-desc">Escreva qualquer coisa solta e deixe a IA organizar, ou salve direto.</p>
      </header>

      <details class="ref-group">
        <summary>configurar chave da API <span class="ref-tag ia-tag">IA</span></summary>
        <div class="ref-items">
          <p class="settings-hint">Fica salva só neste navegador. Nunca vai pro GitHub. Pegue a sua em <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>. Como a chamada é feita direto do navegador, trate como uso pessoal.</p>
          <input type="password" id="apiKey" class="key-input" placeholder="sk-ant-..." autocomplete="off">
          <button class="btn-ghost" id="saveKey" type="button">salvar chave</button>
        </div>
      </details>

      <div class="note-composer">
        <textarea id="noteInput" placeholder="Escreva aqui, pode ser bagunçado — a IA organiza em título + nota."></textarea>
        <div class="composer-actions">
          <button class="btn-ghost" id="addPlain" type="button">salvar como está</button>
          <button class="btn-accent" id="addAI" type="button">&#10022; organizar com IA</button>
        </div>
        <p class="ai-status" id="aiStatus"></p>
      </div>
      <div class="notes-list" id="notesList"></div>
    </div>
  `;
}

export function mountNotas() {
  const savedKey = localStorage.getItem(API_KEY_STORAGE);
  const apiKeyInput = document.getElementById("apiKey");
  if (savedKey && apiKeyInput) apiKeyInput.value = savedKey;

  document.getElementById("saveKey")?.addEventListener("click", () => {
    localStorage.setItem(API_KEY_STORAGE, apiKeyInput.value.trim());
    const aiStatus = document.getElementById("aiStatus");
    if (aiStatus) {
      aiStatus.textContent = "chave salva.";
      setTimeout(() => aiStatus.textContent = "", 2000);
    }
  });

  document.getElementById("addPlain")?.addEventListener("click", () => {
    const noteInput = document.getElementById("noteInput");
    const raw = noteInput.value.trim();
    if (!raw) return;
    addNote(raw.split("\n")[0].slice(0, 60) || "anotação", raw, false);
    noteInput.value = "";
  });

  document.getElementById("addAI")?.addEventListener("click", async () => {
    const noteInput = document.getElementById("noteInput");
    const aiStatus = document.getElementById("aiStatus");
    const btn = document.getElementById("addAI");
    const raw = noteInput.value.trim();
    if (!raw) return;
    const key = localStorage.getItem(API_KEY_STORAGE);
    if (!key) { aiStatus.textContent = "configure sua chave primeiro."; return; }
    btn.disabled = true;
    aiStatus.textContent = "organizando com IA...";
    try {
      const result = await callClaude(raw, key);
      addNote(result.title, result.content, true);
      noteInput.value = "";
      aiStatus.textContent = "";
    } catch (err) {
      aiStatus.textContent = "erro: " + err.message;
    } finally {
      btn.disabled = false;
    }
  });

  renderNotesList();
}
