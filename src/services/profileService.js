const PROFILE_KEY = 'zen-user-profile';

function getDefault() {
  return {
    name: '',
    location: '',
    phone: '',
    email: '',
    github: '',
    linkedin: '',
    youtube: '',
    experience: '',
    education: '',
    skills: '',
    summary: ''
  };
}

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...getDefault(), ...JSON.parse(raw) };
  } catch {}
  return getDefault();
}

export function saveProfile(data) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

export function hasProfile() {
  const p = getProfile();
  return !!(p.name && p.name.trim());
}

export function getDossie() {
  const p = getProfile();
  const parts = [];
  if (p.name) parts.push(`Nome: ${p.name}`);
  if (p.location) parts.push(`Localização: ${p.location}`);
  if (p.phone || p.email) parts.push(`Contato: ${[p.phone, p.email].filter(Boolean).join(' | ')}`);
  if (p.github || p.linkedin) parts.push(`${[p.github, p.linkedin].filter(Boolean).join(' | ')}`);
  if (p.experience) parts.push(`Experiência: ${p.experience}`);
  if (p.education) parts.push(`Formação: ${p.education}`);
  if (p.skills) parts.push(`Stack: ${p.skills}`);
  if (p.summary) parts.push(`Resumo: ${p.summary}`);
  return parts.join('\n') || 'Perfil não configurado.';
}

export function renderProfileConfig() {
  const p = getProfile();
  return `
    <div class="notion-config glass-panel">
      <div class="notion-config-header">
        <i class="fas fa-user"></i>
        <h3>Meu Perfil Profissional</h3>
      </div>
      <p class="notion-config-desc">Preencha seus dados para usar nas funcionalidades de IA (currículo, análise de vagas, entrevistas).</p>

      <div class="notion-config-field">
        <label>Nome completo</label>
        <input type="text" id="prof-name" class="notion-config-input" value="${(p.name || '').replace(/"/g, '&quot;')}" placeholder="Seu nome">
      </div>
      <div class="notion-config-field">
        <label>Localização</label>
        <input type="text" id="prof-location" class="notion-config-input" value="${(p.location || '').replace(/"/g, '&quot;')}" placeholder="Cidade, Estado">
      </div>
      <div class="notion-config-field">
        <label>Telefone</label>
        <input type="text" id="prof-phone" class="notion-config-input" value="${(p.phone || '').replace(/"/g, '&quot;')}" placeholder="(00) 00000-0000">
      </div>
      <div class="notion-config-field">
        <label>E-mail</label>
        <input type="email" id="prof-email" class="notion-config-input" value="${(p.email || '').replace(/"/g, '&quot;')}" placeholder="email@exemplo.com">
      </div>
      <div class="notion-config-field">
        <label>GitHub</label>
        <input type="text" id="prof-github" class="notion-config-input" value="${(p.github || '').replace(/"/g, '&quot;')}" placeholder="github.com/usuario">
      </div>
      <div class="notion-config-field">
        <label>LinkedIn</label>
        <input type="text" id="prof-linkedin" class="notion-config-input" value="${(p.linkedin || '').replace(/"/g, '&quot;')}" placeholder="linkedin.com/in/usuario">
      </div>
      <div class="notion-config-field">
        <label>Experiência profissional</label>
        <textarea id="prof-experience" class="notion-config-input" rows="3" placeholder="Ex: 2 anos em empresa X, desenvolvimento Python...">${p.experience || ''}</textarea>
      </div>
      <div class="notion-config-field">
        <label>Formação</label>
        <input type="text" id="prof-education" class="notion-config-input" value="${(p.education || '').replace(/"/g, '&quot;')}" placeholder="Ex: Engenharia de Software (Universidade, previsão 2027)">
      </div>
      <div class="notion-config-field">
        <label>Stack / Habilidades</label>
        <input type="text" id="prof-skills" class="notion-config-input" value="${(p.skills || '').replace(/"/g, '&quot;')}" placeholder="Ex: Python, Django, SQL, Docker, Git">
      </div>
      <div class="notion-config-field">
        <label>Resumo profissional</label>
        <textarea id="prof-summary" class="notion-config-input" rows="3" placeholder="Breve descrição do seu perfil...">${p.summary || ''}</textarea>
      </div>

      <div class="notion-config-actions">
        <button id="prof-save" class="accent-btn"><i class="fas fa-save"></i> Salvar Perfil</button>
      </div>
    </div>
  `;
}

export function mountProfileConfig(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = renderProfileConfig();

  document.getElementById('prof-save').addEventListener('click', () => {
    const data = {
      name: document.getElementById('prof-name').value.trim(),
      location: document.getElementById('prof-location').value.trim(),
      phone: document.getElementById('prof-phone').value.trim(),
      email: document.getElementById('prof-email').value.trim(),
      github: document.getElementById('prof-github').value.trim(),
      linkedin: document.getElementById('prof-linkedin').value.trim(),
      experience: document.getElementById('prof-experience').value.trim(),
      education: document.getElementById('prof-education').value.trim(),
      skills: document.getElementById('prof-skills').value.trim(),
      summary: document.getElementById('prof-summary').value.trim(),
    };
    saveProfile(data);
    alert('Perfil salvo com sucesso!');
  });
}
