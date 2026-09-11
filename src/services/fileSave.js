let fileHandle = null;
const FILE_NAME = 'central-produtividade.txt';

function getUserEmail() {
  try {
    const user = JSON.parse(localStorage.getItem('central-user'));
    return user?.email || 'usuario';
  } catch { return 'usuario'; }
}

function gatherAllData() {
  const email = getUserEmail();
  const now = new Date().toLocaleString('pt-BR');
  const lines = [
    '========================================',
    '  CENTRAL DE PRODUTIVIDADE - BACKUP',
    `  Usuário: ${email}`,
    `  Data: ${now}`,
    '========================================',
    ''
  ];

  const sections = [
    { key: 'zen-routine-data', label: 'MINHA ROTINA' },
    { key: 'zen-routine-completed', label: 'TAREFAS CONCLUÍDAS' },
    { key: 'minhas_vagas', label: 'VAGAS / CANDIDATURAS' },
    { key: 'zen-notas-list', label: 'IDEIAS & NOTAS' },
    { key: 'zen-checklist-items', label: 'CHECKLIST' },
    { key: 'notion_cards', label: 'PIPELINE NOTION' },
    { key: 'zen-ai-chat-history', label: 'HISTÓRICO CHAT IA' }
  ];

  sections.forEach(({ key, label }) => {
    const raw = localStorage.getItem(key);
    if (!raw) return;

    lines.push(`--- ${label} ---`);

    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        data.forEach((item, i) => {
          if (typeof item === 'object') {
            lines.push(`  [${i + 1}] ${JSON.stringify(item, null, 2).split('\n').join('\n      ')}`);
          } else {
            lines.push(`  [${i + 1}] ${item}`);
          }
        });
      } else if (typeof data === 'object') {
        Object.entries(data).forEach(([k, v]) => {
          lines.push(`  ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`);
        });
      } else {
        lines.push(`  ${data}`);
      }
    } catch {
      lines.push(`  ${raw}`);
    }

    lines.push('');
  });

  // Bible progress
  const bibleCompleted = [];
  for (let i = 1; i <= 365; i++) {
    if (localStorage.getItem(`biblia_dia_${i}`) === 'true') {
      bibleCompleted.push(i);
    }
  }
  if (bibleCompleted.length > 0) {
    lines.push('--- PLANO BÍBLICO ---');
    lines.push(`  Dias concluídos: ${bibleCompleted.length}/365`);
    lines.push(`  Dias: ${bibleCompleted.join(', ')}`);
    lines.push('');
  }

  lines.push('========================================');
  lines.push('  FIM DO BACKUP');
  lines.push('========================================');

  return lines.join('\n');
}

function hasNativeFS() {
  return 'showSaveFilePicker' in window;
}

function permissionModal() {
  return new Promise((resolve) => {
    let modal = document.getElementById('save-permission-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'save-permission-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;';
      modal.innerHTML = `
        <div style="background:#0d1119;border:1px solid #212a38;border-radius:20px;padding:32px;max-width:400px;width:100%;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
          <div style="width:56px;height:56px;background:linear-gradient(135deg,#4fc3ff,#34e0a1);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:24px;">
            <i class="fas fa-download"></i>
          </div>
          <h3 style="color:#f4f4f5;font-size:1.1rem;margin-bottom:8px;">Salvar seus dados?</h3>
          <p style="color:#8d97a8;font-size:0.85rem;margin-bottom:24px;line-height:1.5;">
            Deseja salvar suas informações em um arquivo <strong style="color:#4fc3ff;">${FILE_NAME}</strong> no seu dispositivo?
          </p>
          <div style="display:flex;gap:12px;justify-content:center;">
            <button id="save-perm-no" style="background:rgba(255,255,255,0.05);border:1px solid #212a38;color:#8d97a8;padding:12px 28px;border-radius:12px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.2s;">
              Não salvar
            </button>
            <button id="save-perm-yes" style="background:linear-gradient(135deg,#4fc3ff,#34e0a1);color:#0a0d13;border:none;padding:12px 28px;border-radius:12px;font-size:0.9rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;">
              <i class="fas fa-save"></i> Salvar
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('save-perm-no').addEventListener('click', () => {
        modal.remove();
        resolve(false);
      });

      document.getElementById('save-perm-yes').addEventListener('click', () => {
        modal.remove();
        resolve(true);
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          resolve(false);
        }
      });
    }
  });
}

async function saveWithNativeFS(content) {
  try {
    if (!fileHandle) {
      fileHandle = await window.showSaveFilePicker({
        suggestedName: FILE_NAME,
        types: [{
          description: 'Texto',
          accept: { 'text/plain': ['.txt'] }
        }]
      });
    } else {
      const permission = await fileHandle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted') return false;
    }

    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return true;
  } catch (err) {
    if (err.name === 'AbortError') return false;
    console.error('Erro ao salvar:', err);
    return false;
  }
}

function saveWithDownload(content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = FILE_NAME;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

export async function promptSave() {
  const granted = await permissionModal();
  if (!granted) return false;

  const content = gatherAllData();

  if (hasNativeFS()) {
    return await saveWithNativeFS(content);
  } else {
    return saveWithDownload(content);
  }
}

export async function autoSave() {
  const content = gatherAllData();

  if (hasNativeFS() && fileHandle) {
    try {
      const permission = await fileHandle.requestPermission({ mode: 'readwrite' });
      if (permission === 'granted') {
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        return true;
      }
    } catch {}
  }

  return false;
}
