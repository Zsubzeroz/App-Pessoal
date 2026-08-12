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
        statusText.textContent = message;
      }



      if (type === 'ready') {
        statusText.textContent = '● Sistema Offline Pronto';
        statusText.style.color = 'var(--c-success)';
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
        statusText.textContent = '● Motor Nativo Offline';
        statusText.style.color = 'var(--c-danger)';
        addMessage('Para ter uma IA 100% offline, instale o Ollama:\n1. curl -fsSL https://ollama.com/install.sh | sh\n2. ollama run llama3.2\nApós baixar, reinicie o app.', 'bot');
      }

      if (type === 'error') {
        statusText.textContent = `Erro: ${error}`;
        addMessage(`Houve um erro: ${error}`, 'bot');
      }
    };
  } catch (err) {
    console.error("Worker error:", err);
  }

  function addMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = `ia-msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = msg;
    div.appendChild(bubble);
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
