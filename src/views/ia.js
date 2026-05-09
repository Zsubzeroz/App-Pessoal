export function renderIA() {
  return `
    <div class="ia-container">
      <header class="view-header">
        <h1 class="section-title">Zen AI Assistant</h1>
        <p class="section-desc">Assistente inteligente para projetos e estudos.</p>
      </header>

      <div class="ia-workspace glass-panel">
        <div id="ia-status-bar" class="ia-status-bar">
          <span id="ia-status-text">Verificando motor de IA nativo...</span>

        </div>

        <div id="ia-chat-box" class="ia-chat-box">
          <div class="ia-msg bot">
            <div class="msg-bubble">
              <h3>Bem-vindo à Zen AI</h3>
            </div>
          </div>
        </div>

        <div class="ia-input-area">
          <input type="text" id="ia-input" placeholder="Pergunte qualquer coisa..." disabled>
          <button id="ia-send" class="pomo-btn" disabled><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;
}

export function mountIA() {
  const chatBox = document.getElementById('ia-chat-box');
  const input = document.getElementById('ia-input');
  const sendBtn = document.getElementById('ia-send');
  const statusText = document.getElementById('ia-status-text');


  let worker = null;

  // Initialize Worker
  try {
    worker = new Worker(new URL('../worker.js', import.meta.url), { type: 'module' });
    
    // Automatically try to load
    worker.postMessage({ type: 'load' });

    worker.onmessage = (e) => {
      const { type, message, data, text, error } = e.data;

      if (type === 'status') {
        statusText.innerText = message;
      }



      if (type === 'ready') {
        statusText.innerHTML = '<span style="color:var(--c-success)">●</span> Sistema Offline Pronto';
        input.disabled = false;
        sendBtn.disabled = false;
        input.placeholder = "Escreva sua mensagem...";
      }

      if (type === 'response') {
        addMessage(text, 'bot');
        input.disabled = false;
        sendBtn.disabled = false;
      }

      if (type === 'ollama_missing') {
        statusText.innerHTML = '<span style="color:var(--c-danger)">●</span> Motor Nativo Offline';
        const installMsg = `
          Para ter uma IA 100% offline, ultra-rápida e inteligente, instale o motor nativo <strong>Ollama</strong>.<br><br>
          1. Abra seu terminal e rode:<br>
          <code style="background:#222; padding:4px 8px; border-radius:4px; display:inline-block; margin-top:5px; color:#0f0">curl -fsSL https://ollama.com/install.sh | sh</code><br><br>
          2. Depois, baixe o cérebro da IA (Llama 3) rodando:<br>
          <code style="background:#222; padding:4px 8px; border-radius:4px; display:inline-block; margin-top:5px; color:#0f0">ollama run llama3.2</code><br><br>
          Após baixar, reinicie a Central Luan e aproveite!
        `;
        addMessage(installMsg, 'bot');
      }

      if (type === 'error') {
        statusText.innerText = `Erro: ${error}`;
        addMessage(`Houve um erro: ${error}`, 'bot');
      }
    };
  } catch (err) {
    console.error("Worker error:", err);
  }

  function addMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = `ia-msg ${sender}`;
    div.innerHTML = `<div class="msg-bubble">${msg}</div>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    worker.postMessage({ type: 'chat', text });
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
