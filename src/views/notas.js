export function renderNotas() {
  return `
    <div class="notas-container">
      <header class="view-header">
        <h1 class="section-title">💡 Ideias & Notas</h1>
        <p class="section-desc">Rascunhe seus pensamentos. Tudo é salvo automaticamente.</p>
      </header>

      <div class="notas-workspace glass-panel">
        <textarea id="notas-editor" placeholder="Comece a escrever suas ideias aqui..."></textarea>
      </div>
    </div>
  `;
}

export function mountNotas() {
  const editor = document.getElementById('notas-editor');
  if (!editor) return;

  // Carregar conteúdo salvo
  const savedContent = localStorage.getItem('zen-notas-content');
  if (savedContent) {
    editor.value = savedContent;
  }

  // Salvar automaticamente ao digitar
  editor.addEventListener('input', () => {
    localStorage.setItem('zen-notas-content', editor.value);
  });
}
