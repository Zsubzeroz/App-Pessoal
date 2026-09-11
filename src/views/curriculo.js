import { generateCV } from '../services/aiService.js';

function showCVModal(content) {
  let modal = document.getElementById('cv-analysis-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cv-analysis-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content glass-panel" style="max-width:600px">
        <div class="modal-header">
          <h3>Gerador de CV com IA</h3>
          <button class="modal-close-btn" onclick="this.closest('.modal-overlay').style.display='none'">&times;</button>
        </div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  modal.querySelector('.modal-body').innerHTML = content;
  modal.style.display = 'flex';
}

export function renderCurriculo() {
  return `
    <div class="cp-container">
      <header class="cp-header">
        <div class="cp-header-info">
          <h1>Editor de Currículo Live</h1>
          <p>Edite o HTML e CSS abaixo para ver as mudanças em tempo real. Padrão "CodePen".</p>
        </div>
        <div class="cp-actions">
          <button class="btn-secondary" id="cp-btn-generate"><i class="fas fa-magic"></i> Gerar CV com IA</button>
          <button class="cp-btn" id="cp-btn-print"><i class="fas fa-print"></i> Imprimir / PDF</button>
        </div>
      </header>

      <div class="cp-workspace">
        <div class="cp-editors">
          <div class="cp-editor-box">
            <div class="cp-editor-label"><i class="fab fa-html5"></i> HTML</div>
            <textarea id="cp-html-editor" spellcheck="false"><!-- Estrutura do Currículo -->
<div class="cv-page">
  <header>
    <h1>SEU NOME</h1>
    <p>Sua Área | Especialidade</p>
  </header>

  <section>
    <h2>Resumo</h2>
    <p>Profissional dedicado com foco em eficiência e resultados.</p>
  </section>

  <div class="cv-grid">
    <div class="cv-main">
      <section>
        <h2>Experiência</h2>
        <div class="cv-item">
          <strong>Empresa Anterior</strong> | 2022 - 2024
          <p>Desenvolvimento e manutenção de sistemas.</p>
        </div>
      </section>
    </div>
    <div class="cv-side">
      <section>
        <h2>Skills</h2>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>React / Node.js</li>
          <li>Docker / Linux</li>
        </ul>
      </section>
    </div>
  </div>
</div></textarea>
          </div>
          <div class="cp-editor-box">
            <div class="cp-editor-label"><i class="fab fa-css3-alt"></i> CSS</div>
            <textarea id="cp-css-editor" spellcheck="false">/* Estilo do Currículo */
body {
  font-family: 'Inter', sans-serif;
  background: #eee;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.cv-page {
  background: white;
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  color: #333;
}

header {
  border-bottom: 3px solid #00b4d8;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

h1 { margin: 0; color: #000; font-size: 32px; }
h2 { color: #00b4d8; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; }

.cv-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
ul { padding-left: 20px; }
li { margin-bottom: 5px; font-size: 14px; }</textarea>
          </div>
        </div>

        <div class="cp-preview">
          <div class="cp-editor-label"><i class="fas fa-eye"></i> Visualização</div>
          <iframe id="cp-preview-frame"></iframe>
        </div>
      </div>
    </div>
  `;
}

export function mountCurriculo() {
  const htmlEditor = document.getElementById('cp-html-editor');
  const cssEditor = document.getElementById('cp-css-editor');
  const previewFrame = document.getElementById('cp-preview-frame');
  const btnPrint = document.getElementById('cp-btn-print');
  const btnGenerate = document.getElementById('cp-btn-generate');

  function updatePreview() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
  }

  htmlEditor.addEventListener('input', updatePreview);
  cssEditor.addEventListener('input', updatePreview);

  btnPrint.addEventListener('click', () => {
    previewFrame.contentWindow.print();
  });

  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => {
      showCVModal(`
        <div class="cv-gen-form">
          <p style="margin-bottom:12px; color:var(--text-muted);">Cole o texto da vaga ou a URL para gerar um CV direcionado:</p>
          <textarea id="cv-gen-vaga" rows="4" style="width:100%; background:var(--bg-input); border:1px solid var(--border); color:var(--text-main); padding:12px; border-radius:8px; font-family:inherit; resize:vertical;" placeholder="Ex: Vaga de Desenvolvedor Python Júnior na empresa X..."></textarea>
          <button id="cv-gen-submit" class="btn-primary" style="margin-top:12px; width:100%;">
            <i class="fas fa-magic"></i> Gerar Currículo
          </button>
          <div id="cv-gen-result" style="margin-top:12px;"></div>
        </div>
      `);

      document.getElementById('cv-gen-submit').addEventListener('click', async () => {
        const vagaText = document.getElementById('cv-gen-vaga').value.trim();
        if (!vagaText) return;

        const resultEl = document.getElementById('cv-gen-result');
        resultEl.innerHTML = '<div class="notion-loading"><i class="fas fa-spinner fa-spin"></i> Gerando currículo...</div>';

        try {
          const dossie = `Nome: Luan Estifer Rodrigues Pereira
Localização: Artur Nogueira, SP
Contato: (19) 99722-2694 | luanestiferpy@gmail.com
GitHub: github.com/Zsubzeroz | LinkedIn: linkedin.com/in/luanestifer
Experiência: 29 meses (Ecoflora Brasil - Automação IA/TI + Embrasatec - Suporte TI/Protheus)
Stack: Python, Django, SQL, ERP Protheus, Docker, Git, C#, JavaScript, HTML5, CSS3
Formação: Engenharia de Software (UniCesumar, previsão 2027), Defesa Cibernética (Estácio, 2026)
Cursos: Python & Django, SQL Basics, IA Generativa & AWS Bedrock, C#, Git
Diferenciais: Ex-Líder de Xadrez, Campeão Olimpíada de Astronomia, Piano Clássico, Inglês B2
Nota 9,7 em Técnicas de Programação`;

          const html = await generateCV(
            { empresa: '', cargo: vagaText, modelo: '', link: '' },
            dossie
          );

          htmlEditor.value = html;
          updatePreview();
          resultEl.innerHTML = '<p style="color:#10b981">CV gerado com sucesso! Verifique o editor e a preview.</p>';

          setTimeout(() => {
            document.getElementById('cv-analysis-modal').style.display = 'none';
          }, 2000);
        } catch (err) {
          resultEl.innerHTML = `<p style="color:#ef4444">Erro: ${err.message}</p>`;
        }
      });
    });
  }

  updatePreview();
}
