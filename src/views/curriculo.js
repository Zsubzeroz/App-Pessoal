export function renderCurriculo() {
  return `
    <div class="cp-container">
      <header class="cp-header">
        <div class="cp-header-info">
          <h1>Editor de Currículo Live</h1>
          <p>Edite o HTML e CSS abaixo para ver as mudanças em tempo real. Padrão "CodePen".</p>
        </div>
        <div class="cp-actions">
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
    <h1>LUAN ESTIFER</h1>
    <p>Engenharia de Software | Full Stack Python</p>
  </header>

  <section>
    <h2>Resumo</h2>
    <p>Especialista em automação e dados com foco em eficiência.</p>
  </section>

  <div class="cv-grid">
    <div class="cv-main">
      <section>
        <h2>Experiência</h2>
        <div class="cv-item">
          <strong>Ecoflora Brasil</strong> | 2025 - Presente
          <p>Liderança em digitalização e automação AppSheet/Python.</p>
        </div>
      </section>
    </div>
    <div class="cv-side">
      <section>
        <h2>Skills</h2>
        <ul>
          <li>Python / Django</li>
          <li>SQL / Protheus</li>
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

      <style>
        .cp-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 60px);
          color: white;
          background: #0f0f0f;
        }

        .cp-header {
          padding: 15px 25px;
          background: #18181b;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cp-header h1 { font-size: 1.2rem; margin: 0; }
        .cp-header p { font-size: 0.8rem; color: #888; margin: 2px 0 0 0; }

        .cp-btn {
          background: #00b4d8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-workspace {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 0;
          overflow: hidden;
        }

        .cp-editors {
          display: grid;
          grid-template-rows: 1fr 1fr;
          border-right: 1px solid #333;
          overflow: hidden;
        }

        .cp-editor-box {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #333;
        }

        .cp-editor-label {
          padding: 8px 15px;
          background: #222;
          font-size: 0.75rem;
          font-weight: bold;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-editor-box textarea {
          flex: 1;
          background: #1e1e1e;
          color: #d4d4d4;
          border: none;
          padding: 15px;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 13px;
          resize: none;
          outline: none;
          line-height: 1.5;
        }

        .cp-preview {
          display: flex;
          flex-direction: column;
          background: #2d2d2d;
        }

        #cp-preview-frame {
          flex: 1;
          background: white;
          border: none;
          width: 100%;
        }

        @media (max-width: 1000px) {
          .cp-workspace { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
          .cp-editors { border-right: none; border-bottom: 1px solid #333; }
        }
      </style>
    </div>
  `;
}

export function mountCurriculo() {
  const htmlEditor = document.getElementById('cp-html-editor');
  const cssEditor = document.getElementById('cp-css-editor');
  const previewFrame = document.getElementById('cp-preview-frame');
  const btnPrint = document.getElementById('cp-btn-print');

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

  // Initial update
  updatePreview();
}