import { chat } from '../services/aiService.js';

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_TOKEN = import.meta.env.VITE_NOTION_TOKEN;
const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

const STATUS_COLORS = {
  'Candidatado': '#3b82f6',
  'Entrevista': '#f59e0b',
  'Aprovado': '#10b981',
  'Rejeitado': '#ef4444',
  'Negociação': '#a855f7',
  'EM ADMISSÃO/CONTRATAÇÃO': '#10b981',
  'CANDIDATURA/CONTATO': '#3b82f6'
};

function getStatusColor(status) {
  for (const [key, color] of Object.entries(STATUS_COLORS)) {
    if (status?.toLowerCase().includes(key.toLowerCase())) return color;
  }
  return '#71717a';
}

async function fetchNotionPages() {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return { error: 'Token Notion não configurado. Adicione VITE_NOTION_TOKEN no .env' };
  }

  try {
    const res = await fetch(`${NOTION_API}/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (!res.ok) {
      return { error: `Erro Notion API: ${res.status}` };
    }

    const data = await res.json();
    return { pages: data.results || [] };
  } catch (err) {
    return { error: `Falha na conexão: ${err.message}` };
  }
}

function extractProp(page, ...names) {
  for (const name of names) {
    const prop = page.properties?.[name];
    if (!prop) continue;
    if (prop.type === 'title') return prop.title?.[0]?.plain_text || '';
    if (prop.type === 'rich_text') return prop.rich_text?.[0]?.plain_text || '';
    if (prop.type === 'select') return prop.select?.name || '';
    if (prop.type === 'status') return prop.status?.name || '';
  }
  return '';
}

function pageToCard(page) {
  return {
    id: page.id,
    empresa: extractProp(page, 'Empresa', 'Empresa/Contato', 'Nome'),
    cargo: extractProp(page, 'Nome', 'Title'),
    tipo: extractProp(page, 'Tipo'),
    status: extractProp(page, 'Status', 'Coluna'),
    notas: extractProp(page, 'Notas', 'Descrição'),
    lastEdited: page.last_edited_time
  };
}

function getLocalCards() {
  return JSON.parse(localStorage.getItem('notion_cards') || '[]');
}

function saveLocalCards(cards) {
  localStorage.setItem('notion_cards', JSON.stringify(cards));
}

async function pushStatusToNotion(pageId, status) {
  if (!NOTION_TOKEN) return { error: 'Token não configurado' };

  try {
    const res = await fetch(`${NOTION_API}/pages/${pageId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          Status: { select: { name: status } }
        }
      })
    });
    return res.ok ? { ok: true } : { error: `${res.status}` };
  } catch (err) {
    return { error: err.message };
  }
}

function renderKanban(cards) {
  const statuses = ['Candidatado', 'Entrevista', 'Aprovado', 'Rejeitado'];
  const grouped = {};
  statuses.forEach(s => grouped[s] = []);
  cards.forEach(c => {
    const s = statuses.find(st => c.status?.toLowerCase().includes(st.toLowerCase())) || 'Candidatado';
    grouped[s].push(c);
  });

  return `
    <div class="kanban-board">
      ${statuses.map(s => `
        <div class="kanban-column" data-status="${s}">
          <div class="kanban-col-header">
            <span class="kanban-dot" style="background:${getStatusColor(s)}"></span>
            <span>${s}</span>
            <span class="kanban-count">${grouped[s].length}</span>
          </div>
          <div class="kanban-cards">
            ${grouped[s].map(c => `
              <div class="kanban-card glass-panel" data-id="${c.id || ''}">
                <div class="kanban-card-empresa">${c.empresa || 'Sem empresa'}</div>
                <div class="kanban-card-cargo">${c.cargo || c.tipo || ''}</div>
                ${c.notas ? `<div class="kanban-card-notas">${c.notas.substring(0, 80)}${c.notas.length > 80 ? '...' : ''}</div>` : ''}
                <div class="kanban-card-footer">
                  <span class="kanban-card-tipo">${c.tipo || ''}</span>
                  ${c.id ? `<button class="kanban-analyze-btn" data-index="${cards.indexOf(c)}" title="Analisar com IA"><i class="fas fa-magic"></i></button>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderNotion() {
  return `
    <div class="notion-container">
      <header class="view-header">
        <h1 class="section-title">📋 Pipeline de Oportunidades</h1>
        <p class="section-desc">Kanban sincronizado com o Notion — visualize e analise suas candidaturas.</p>
      </header>

      <div class="notion-toolbar glass-panel">
        <button id="notion-sync-btn" class="btn-primary"><i class="fas fa-sync-alt"></i> Sincronizar com Notion</button>
        <button id="notion-analyze-all" class="btn-secondary"><i class="fas fa-magic"></i> Analisar Todas com IA</button>
        <span id="notion-status" class="notion-status-text"></span>
      </div>

      <div id="notion-kanban">
        <div class="notion-loading">
          <i class="fas fa-spinner fa-spin"></i> Carregando pipeline...
        </div>
      </div>

      <div id="notion-analysis-modal" class="modal-overlay" style="display:none">
        <div class="modal-content glass-panel">
          <div class="modal-header">
            <h3>Análise da IA</h3>
            <button id="modal-close" class="modal-close-btn">&times;</button>
          </div>
          <div id="modal-body" class="modal-body"></div>
        </div>
      </div>
    </div>
  `;
}

export function mountNotion() {
  const kanbanEl = document.getElementById('notion-kanban');
  const syncBtn = document.getElementById('notion-sync-btn');
  const analyzeAllBtn = document.getElementById('notion-analyze-all');
  const statusEl = document.getElementById('notion-status');
  const modal = document.getElementById('notion-analysis-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  let allCards = getLocalCards();

  function renderAll() {
    if (allCards.length === 0) {
      kanbanEl.innerHTML = `
        <div class="notion-empty glass-panel">
          <i class="fas fa-inbox" style="font-size:2rem; color:var(--text-muted); margin-bottom:12px;"></i>
          <p>Nenhuma oportunidade encontrada.</p>
          <p style="font-size:0.82rem; color:var(--text-muted);">Clique em "Sincronizar com Notion" ou adicione vagas no módulo Vagas.</p>
        </div>
      `;
      return;
    }
    kanbanEl.innerHTML = renderKanban(allCards);
    bindCardActions();
  }

  function bindCardActions() {
    document.querySelectorAll('.kanban-analyze-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        const vaga = allCards[idx];
        if (!vaga) return;

        statusEl.textContent = 'Analisando vaga com IA...';
        modal.style.display = 'flex';
        modalBody.innerHTML = '<div class="notion-loading"><i class="fas fa-spinner fa-spin"></i> Analisando...</div>';

        try {
          const dossie = `Nome: Luan Estifer Rodrigues Pereira
Experiência: 29 meses (Ecoflora Brasil + Embrasatec)
Stack: Python, Django, SQL, ERP Protheus, Docker, Git, C#
Formação: Engenharia de Software (UniCesumar), Defesa Cibernética (Estácio)
Diferenciais: Xadrez competitivo, Piano, Arduino, Inglês B2`;

          const analysis = await chat(
            `Analise esta vaga para o candidato e retorne um JSON:
{ "fitScore": 0-100, "pontosFortes": [], "pontosAtencao": [], "sugestaoAbordagem": "texto", "resumoFit": "resumo" }

Vaga: ${vaga.empresa} - ${vaga.cargo} (${vaga.tipo || vaga.status})
Notas: ${vaga.notas || 'Nenhuma'}

Perfil: ${dossie}`,
            [],
            'Você é um analista de carreira. Retorne APENAS o JSON, sem markdown.'
          );

          let analysisData;
          try {
            const cleaned = analysis.response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            analysisData = JSON.parse(cleaned);
          } catch {
            analysisData = null;
          }

          if (analysisData) {
            modalBody.innerHTML = `
              <div class="analysis-result">
                <div class="analysis-score">
                  <div class="score-circle" style="--score-color: ${analysisData.fitScore >= 70 ? '#10b981' : analysisData.fitScore >= 40 ? '#f59e0b' : '#ef4444'}">
                    <span class="score-num">${analysisData.fitScore}</span>
                    <span class="score-label">Fit Score</span>
                  </div>
                </div>
                <div class="analysis-resumo">${analysisData.resumoFit || ''}</div>
                <div class="analysis-section">
                  <h4 style="color:#10b981">Pontos Fortes</h4>
                  <ul>${(analysisData.pontosFortes || []).map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
                <div class="analysis-section">
                  <h4 style="color:#f59e0b">Pontos de Atenção</h4>
                  <ul>${(analysisData.pontosAtencao || []).map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
                <div class="analysis-section">
                  <h4 style="color:#3b82f6">Sugestão de Abordagem</h4>
                  <p>${analysisData.sugestaoAbordagem || ''}</p>
                </div>
              </div>
            `;
          } else {
            modalBody.innerHTML = `<p style="color:#cbd5e1">${analysis.response}</p>`;
          }
        } catch (err) {
          modalBody.innerHTML = `<p style="color:#ef4444">Erro: ${err.message}</p>`;
        }

        statusEl.textContent = '';
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => modal.style.display = 'none');
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  syncBtn.addEventListener('click', async () => {
    statusEl.textContent = 'Sincronizando com Notion...';
    syncBtn.disabled = true;

    const result = await fetchNotionPages();

    if (result.error) {
      statusEl.textContent = result.error;
      syncBtn.disabled = false;

      const local = getLocalCards();
      if (local.length > 0) {
        allCards = local;
        renderAll();
      }
      return;
    }

    allCards = result.pages.map(pageToCard);
    saveLocalCards(allCards);
    renderAll();
    statusEl.textContent = `Sincronizado! ${allCards.length} oportunidades carregadas.`;
    syncBtn.disabled = false;

    setTimeout(() => { statusEl.textContent = ''; }, 3000);
  });

  analyzeAllBtn.addEventListener('click', async () => {
    if (allCards.length === 0) {
      statusEl.textContent = 'Nenhuma vaga para analisar.';
      return;
    }

    statusEl.textContent = 'Analisando todas as vagas com IA...';
    analyzeAllBtn.disabled = true;

    const dossie = `Nome: Luan Estifer Rodrigues Pereira
Experiência: 29 meses (Ecoflora Brasil + Embrasatec)
Stack: Python, Django, SQL, ERP Protheus, Docker, Git, C#
Formação: Engenharia de Software (UniCesumar), Defesa Cibernética (Estácio)
Diferenciais: Xadrez competitivo, Piano, Arduino, Inglês B2`;

    try {
      const summary = allCards.map((c, i) => `${i + 1}. ${c.empresa} - ${c.cargo} [${c.status}]`).join('\n');
      const response = await chat(
        `Dê um panorama geral das ${allCards.length} candidaturas listadas, destacando prioridades e sugestões:\n\n${summary}`,
        [],
        'Você é um consultor de carreira. Seja direto e prático.'
      );

      modal.style.display = 'flex';
      modalBody.innerHTML = `<div class="analysis-result"><div class="analysis-resumo" style="white-space:pre-wrap">${response.response}</div></div>`;
    } catch (err) {
      modal.style.display = 'flex';
      modalBody.innerHTML = `<p style="color:#ef4444">Erro: ${err.message}</p>`;
    }

    statusEl.textContent = '';
    analyzeAllBtn.disabled = false;
  });

  renderAll();
}
