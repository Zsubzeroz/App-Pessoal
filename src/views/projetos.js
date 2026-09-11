const projects = [
  {
    mark: 'AI',
    title: 'StudyFlow-AI',
    desc: 'Aplicação de IA Generativa para automação de aprendizado e consumo estruturado de APIs.',
    tags: ['Python', 'LLMs', 'APIs'],
    link: null,
    featured: true
  },
  {
    mark: 'D',
    title: 'Gestão de Cozinha / Restaurante',
    desc: 'Sistema de estoque e insumos com modelagem de dados para cardápios e lógica condicional avançada.',
    tags: ['Python', 'Modelagem'],
    link: 'https://github.com/Zsubzeroz/cozinha-restaurante'
  },
  {
    mark: '✓',
    title: 'Check List — To-Do App',
    desc: 'Django MVT, CRUD completo, ORM SQLite, rotas e templates dinâmicos com tags.',
    tags: ['Django', 'SQLite', 'MVT'],
    link: 'https://github.com/Zsubzeroz/django-todo-list'
  },
  {
    mark: '♟',
    title: 'Motor de Xadrez',
    desc: 'Lógica avançada de matrizes e controle de regras de alta complexidade.',
    tags: ['JavaScript', 'Lógica'],
    link: null
  },
  {
    mark: '$',
    title: 'Controle de Despesas',
    desc: 'Aplicação em C#/.NET com Programação Orientada a Objetos e persistência de dados.',
    tags: ['C#', '.NET', 'POO'],
    link: null
  }
];

export function renderProjetos() {
  return `
    <div class="projetos-container">
      <header class="view-header">
        <h1 class="section-title">💻 Portfólio de Projetos</h1>
        <p class="section-desc">Projetos citados nos currículos e desenvolvidos durante a formação.</p>
      </header>

      <div class="projects-grid">
        ${projects.map(p => `
          <div class="project-card glass-panel ${p.featured ? 'featured' : ''}">
            <div class="project-mark ${p.featured ? 'ai' : ''}">${p.mark}</div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="project-tags">
              ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            ${p.link ? `<a href="${p.link}" target="_blank" class="project-link">GitHub ↗</a>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function mountProjetos() {
  // Static view
}
