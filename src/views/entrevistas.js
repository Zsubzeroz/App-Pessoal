import { interviewFeedback } from '../services/aiService.js';
import { getDossie } from '../services/profileService.js';

const STORAGE_KEY = 'zen-entrevistas-data';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function emptyQA() {
  return { q: '', a: '', feedback: '' };
}

function showFeedbackModal(content) {
  let modal = document.getElementById('feedback-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'feedback-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content glass-panel">
        <div class="modal-header">
          <h3>Feedback da IA</h3>
          <button class="modal-close-btn" onclick="this.closest('.modal-overlay').style.display='none'">&times;</button>
        </div>
        <div class="modal-body" id="feedback-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
  document.getElementById('feedback-modal-body').innerHTML = content;
  modal.style.display = 'flex';
}

export function renderEntrevistas() {
  return `
    <div class="entrevistas-container">
      <header class="view-header">
        <h1 class="section-title">🎤 Simulador de Entrevistas</h1>
        <p class="section-desc">Pratique suas respostas e receba feedback da IA.</p>
        <button class="accent-btn" id="new-qa-btn"><i class="fas fa-plus"></i> Nova Pergunta</button>
      </header>

      <div class="qa-list" id="qa-list"></div>
      <div id="qa-empty" class="empty-state" style="display:none;">
        <i class="fas fa-microphone"></i>
        <p>Nenhuma pergunta ainda. Clique em "Nova Pergunta" para começar.</p>
      </div>
    </div>
  `;
}

export function mountEntrevistas() {
  const list = document.getElementById('qa-list');
  const emptyState = document.getElementById('qa-empty');
  const newBtn = document.getElementById('new-qa-btn');
  let data = load();

  function render() {
    if (data.length === 0) {
      list.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';

    list.innerHTML = data.map((item, i) => `
      <div class="qa-card glass-panel" data-i="${i}">
        <div class="qa-card-top">
          <span class="qa-num">${i + 1}</span>
          <button class="qa-del" data-i="${i}" title="Excluir"><i class="fas fa-trash"></i></button>
        </div>
        <div class="qa-field">
          <label>Pergunta</label>
          <textarea class="qa-textarea" data-i="${i}" data-field="q" rows="2" placeholder="Digite a pergunta...">${item.q || ''}</textarea>
        </div>
        <div class="qa-field">
          <label>Sua Resposta</label>
          <textarea class="qa-textarea" data-i="${i}" data-field="a" rows="3" placeholder="Digite sua resposta...">${item.a || ''}</textarea>
        </div>
        <div class="qa-actions">
          <button class="qa-feedback-btn" data-i="${i}"><i class="fas fa-magic"></i> Pedir Feedback IA</button>
        </div>
        ${item.feedback ? `<div class="qa-feedback"><strong>Feedback anterior:</strong> ${item.feedback}</div>` : ''}
      </div>
    `).join('');

    list.querySelectorAll('.qa-textarea').forEach(el => {
      el.addEventListener('input', () => {
        data[+el.dataset.i][el.dataset.field] = el.value;
        save(data);
      });
    });

    list.querySelectorAll('.qa-del').forEach(el => {
      el.addEventListener('click', () => {
        if (confirm('Excluir esta pergunta?')) {
          data.splice(+el.dataset.i, 1);
          save(data);
          render();
        }
      });
    });

    list.querySelectorAll('.qa-feedback-btn').forEach(el => {
      el.addEventListener('click', async () => {
        const idx = +el.dataset.i;
        const item = data[idx];
        if (!item.q || !item.a) {
          alert('Preencha a pergunta e a resposta primeiro.');
          return;
        }

        el.disabled = true;
        el.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analisando...';

        try {
          const result = await interviewFeedback(item.q, item.a);
          data[idx].feedback = `Nota: ${result.nota}/10 | Fortes: ${(result.pontosFortes || []).join(', ')} | Melhorias: ${(result.melhorias || []).join(', ')}`;
          data[idx].respostaModelo = result.respostaModelo;
          save(data);

          showFeedbackModal(`
            <div class="analysis-result">
              <div class="analysis-score">
                <div class="score-circle" style="--score-color: ${result.nota >= 7 ? '#10b981' : result.nota >= 4 ? '#f59e0b' : '#ef4444'}">
                  <span class="score-num">${result.nota}</span>
                  <span class="score-label">Nota</span>
                </div>
              </div>
              <div class="analysis-section">
                <h4 style="color:#10b981">Pontos Fortes</h4>
                <ul>${(result.pontosFortes || []).map(p => `<li>${p}</li>`).join('')}</ul>
              </div>
              <div class="analysis-section">
                <h4 style="color:#f59e0b">Melhorias</h4>
                <ul>${(result.melhorias || []).map(p => `<li>${p}</li>`).join('')}</ul>
              </div>
              <div class="analysis-section">
                <h4 style="color:#3b82f6">Resposta Modelo</h4>
                <p>${result.respostaModelo || ''}</p>
              </div>
            </div>
          `);

          render();
        } catch (err) {
          showFeedbackModal(`<p style="color:#ef4444">Erro: ${err.message}</p>`);
        }

        el.disabled = false;
        el.innerHTML = '<i class="fas fa-magic"></i> Pedir Feedback IA';
      });
    });
  }

  newBtn.addEventListener('click', () => {
    data.push(emptyQA());
    save(data);
    render();
  });

  render();
}
