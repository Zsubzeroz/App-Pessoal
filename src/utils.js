const div = document.createElement('div');

export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  div.textContent = str;
  return div.innerHTML;
}

export function escapeAttr(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getTxtContent(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function montarTxt() {
  const rotina = getTxtContent('zen-routine-data', {
    Segunda: [], Terça: [], Quarta: [], Quinta: [],
    Sexta: [], Sábado: [], Domingo: []
  });
  const completas = getTxtContent('zen-routine-completed', []);
  const checklist = getTxtContent('zen-checklist-items', []);
  const notas = getTxtContent('central-luan-notas', []);
  const vagas = getTxtContent('minhas_vagas', []);

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const cores = {
    'c-tech': 'Tecnologia', 'c-lang': 'Línguas', 'c-music': 'Música',
    'c-math': 'Matemática', 'c-talks': 'Conversação', 'c-relax': 'Relax',
    'c-spirit': 'Espiritual', 'c-sports': 'Esporte', 'c-career': 'Carreira'
  };

  let txt = '========================================\n';
  txt += '  CENTRAL DE PRODUTIVIDADE\n';
  txt += `  Exportado em: ${new Date().toLocaleString('pt-BR')}\n`;
  txt += '========================================\n\n';

  txt += '--- MINHA ROTINA ---\n';
  dias.forEach(dia => {
    const tarefas = rotina[dia] || [];
    txt += `\n${dia}:\n`;
    if (tarefas.length === 0) {
      txt += '  (nenhuma tarefa)\n';
    } else {
      tarefas.forEach((t, i) => {
        const taskId = `${dia}-${i}`;
        const done = completas.includes(taskId);
        const cor = cores[t.color] || t.color || '';
        txt += `  [${done ? 'x' : ' '}] ${t.title} - ${t.desc || ''} (${cor}) ${t.tempo ? '- ' + t.tempo : ''}\n`;
      });
    }
  });

  txt += '\n--- CHECKLIST ---\n';
  if (checklist.length === 0) {
    txt += '  (nenhuma tarefa)\n';
  } else {
    checklist.forEach(t => {
      txt += `  [${t.done ? 'x' : ' '}] ${t.text}${t.fixed ? ' (diário)' : ''}\n`;
    });
  }

  txt += '\n--- NOTAS ---\n';
  if (notas.length === 0) {
    txt += '  (nenhuma nota)\n';
  } else {
    notas.forEach(n => {
      txt += `\n  Titulo: ${n.title}\n  Conteudo: ${n.content}\n  Data: ${n.date}${n.ai ? ' (organizado por IA)' : ''}\n`;
    });
  }

  txt += '\n--- VAGAS ---\n';
  if (vagas.length === 0) {
    txt += '  (nenhuma vaga)\n';
  } else {
    txt += '  Empresa | Cargo | Status | Modelo | Data\n';
    txt += '  ' + '-'.repeat(50) + '\n';
    vagas.forEach(v => {
      txt += `  ${v.empresa} | ${v.cargo} | ${v.status} | ${v.modelo} | ${v.data || '---'}\n`;
      if (v.nota) txt += `    Nota: ${v.nota}\n`;
    });
  }

  txt += '\n--- BIBLIA ---\n';
  let bibliaCount = 0;
  for (let i = 1; i <= 365; i++) {
    if (localStorage.getItem(`biblia_dia_${i}`) === 'true') bibliaCount++;
  }
  txt += `  Progresso: ${bibliaCount}/365 dias (${Math.round(bibliaCount / 365 * 100)}%)\n`;

  txt += '\n========================================\n';
  txt += '  FIM DO ARQUIVO\n';
  txt += '========================================\n';

  return txt;
}

export async function exportToTxt() {
  const { encryptTxt } = await import('./crypto.js');

  const user = getTxtContent('central-user', null);
  if (!user) {
    alert('Faça login para exportar seus dados.');
    return;
  }

  const lastExport = getTxtContent('central-last-export', '');
  const today = new Date().toISOString().split('T')[0];
  if (lastExport === today) {
    if (!confirm('Já existe um arquivo exportado hoje.\nDeseja sobrescrever?')) return;
  }

  const txt = montarTxt();

  try {
    const { salt, iv, data } = await encryptTxt(txt, user.sub);

    const conteudo = `CENTRAL-PRODUTIVIDADE-v2\nUser: ${user.email}\nSalt: ${salt}\nIV: ${iv}\nData: ${new Date().toLocaleString('pt-BR')}\n────────────────────\n${data}`;

    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `central-dados-${today}.enc.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    localStorage.setItem('central-last-export', JSON.stringify(today));
  } catch (err) {
    alert('Erro ao exportar: ' + err.message);
  }
}
