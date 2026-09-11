import { chat } from '../services/aiService.js';

const HISTORY_KEY = 'zen-ai-chat-history';

function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-50)));
}

function renderMessage(msg) {
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg--${msg.role}`;
  div.innerHTML = `
    <div class="chat-msg-avatar">${msg.role === 'user' ? '👤' : '🤖'}</div>
    <div class="chat-msg-content">${msg.content.replace(/\n/g, '<br>')}</div>
  `;
  return div;
}

export function renderIA() {
  return `
    <div class="ia-container">
      <header class="view-header">
        <h1 class="section-title">🤖 Zen AI</h1>
        <p class="section-desc">Assistente inteligente via B.AI — MiMo-V2.5, Qwen, GLM.</p>
      </header>

      <div class="chat-wrapper glass-panel">
        <div class="chat-status" id="chat-status">
          <i class="fas fa-circle" style="color:#10b981; font-size:8px;"></i>
          <span>Conectado à B.AI</span>
          <button id="chat-clear-btn" class="chat-clear-btn" title="Limpar histórico"><i class="fas fa-trash"></i></button>
        </div>

        <div class="chat-box" id="chat-box">
          <div class="chat-msg chat-msg--bot">
            <div class="chat-msg-avatar">🤖</div>
            <div class="chat-msg-content">Olá! Sou a Zen AI. Como posso ajudar você hoje?</div>
          </div>
        </div>

        <div class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Digite sua mensagem..." autocomplete="off">
          <button id="chat-send-btn" class="btn-primary" title="Enviar">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function mountIA() {
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const clearBtn = document.getElementById('chat-clear-btn');

  if (!chatBox || !chatInput || !sendBtn) return;

  let history = getHistory();
  let isLoading = false;

  function renderHistory() {
    const existing = chatBox.querySelectorAll('.chat-msg');
    existing.forEach(el => el.remove());
    history.forEach(msg => chatBox.appendChild(renderMessage(msg)));
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addMessage(role, content) {
    const msg = { role, content };
    history.push(msg);
    saveHistory(history);
    chatBox.appendChild(renderMessage(msg));
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    isLoading = true;
    chatInput.value = '';
    sendBtn.disabled = true;
    addMessage('user', text);

    const thinking = document.createElement('div');
    thinking.className = 'chat-msg chat-msg--bot';
    thinking.innerHTML = `
      <div class="chat-msg-avatar">🤖</div>
      <div class="chat-msg-content"><i class="fas fa-spinner fa-spin"></i> Pensando...</div>
    `;
    chatBox.appendChild(thinking);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const result = await chat(text, history.slice(0, -1));
      thinking.remove();
      addMessage('assistant', result.response);
    } catch (err) {
      thinking.remove();
      addMessage('assistant', `Erro: ${err.message}`);
    }

    isLoading = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Limpar todo o histórico de conversas?')) {
        history = [];
        saveHistory(history);
        renderHistory();
      }
    });
  }

  renderHistory();
  chatInput.focus();
}
