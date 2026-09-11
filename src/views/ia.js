import { chat, hasAIConfig, getAIConfig, saveAIConfig, clearAIConfig } from '../services/aiService.js';

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

function renderConfigPanel() {
  const cfg = getAIConfig();
  return `
    <div class="notion-config glass-panel" style="margin-bottom:20px;">
      <div class="notion-config-header">
        <i class="fas fa-key"></i>
        <h3>Configurar API de IA</h3>
      </div>
      <p class="notion-config-desc">Cole sua API Key do B.AI (ou compatível OpenAI).</p>

      <div class="notion-config-field">
        <label>API Base URL</label>
        <input type="text" id="ai-base-input" class="notion-config-input"
          placeholder="https://api.b.ai/v1" value="${cfg.apiBase || 'https://api.b.ai/v1'}">
      </div>

      <div class="notion-config-field">
        <label>API Key</label>
        <input type="password" id="ai-key-input" class="notion-config-input"
          placeholder="sk-..." value="${cfg.apiKey || ''}">
      </div>

      <div class="notion-config-actions">
        <button id="ai-save-config" class="accent-btn"><i class="fas fa-save"></i> Salvar</button>
        <button id="ai-clear-config" class="btn-secondary">Limpar</button>
      </div>
    </div>
  `;
}

export function renderIA() {
  const hasKey = hasAIConfig();
  return `
    <div class="ia-container">
      <header class="view-header">
        <h1 class="section-title">🤖 Zen AI</h1>
        <p class="section-desc">Assistente inteligente via API de IA.</p>
        <button id="ia-toggle-config" class="btn-secondary"><i class="fas fa-cog"></i> Config</button>
      </header>

      <div id="ia-config-area"></div>

      ${hasKey ? `
      <div class="chat-wrapper glass-panel">
        <div class="chat-status" id="chat-status">
          <i class="fas fa-circle" style="color:#10b981; font-size:8px;"></i>
          <span>Conectado</span>
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
      ` : `
      <div class="notion-empty glass-panel">
        <i class="fas fa-key" style="font-size:2rem; color:var(--text-muted); margin-bottom:12px;"></i>
        <p>Configure sua API Key para usar a Zen AI.</p>
        <p style="font-size:0.82rem; color:var(--text-muted);">Clique em "Config" acima.</p>
      </div>
      `}
    </div>
  `;
}

export function mountIA() {
  const configArea = document.getElementById('ia-config-area');
  const toggleConfigBtn = document.getElementById('ia-toggle-config');

  if (toggleConfigBtn) {
    toggleConfigBtn.addEventListener('click', () => {
      if (configArea.innerHTML) {
        configArea.innerHTML = '';
        return;
      }
      configArea.innerHTML = renderConfigPanel();

      document.getElementById('ai-save-config').addEventListener('click', () => {
        const apiBase = document.getElementById('ai-base-input').value.trim();
        const apiKey = document.getElementById('ai-key-input').value.trim();
        if (!apiKey) {
          alert('Cole sua API Key.');
          return;
        }
        saveAIConfig({ apiBase: apiBase || 'https://api.b.ai/v1', apiKey });
        configArea.innerHTML = '';
        location.reload();
      });

      document.getElementById('ai-clear-config').addEventListener('click', () => {
        if (confirm('Limpar configuração de IA?')) {
          clearAIConfig();
          location.reload();
        }
      });
    });
  }

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
