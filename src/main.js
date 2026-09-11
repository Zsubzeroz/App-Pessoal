import './style.css';
import { getLoggedUser, logout, loginWithName } from './auth.js';
import { promptSave } from './services/fileSave.js';
import { exportToTxt } from './utils.js';
import { renderRotina, mountRotina } from './views/rotina.js';
import { renderBiblia, mountBiblia } from './views/biblia.js';
import { renderVagas, mountVagas } from './views/vagas.js';
import { renderCurriculo, mountCurriculo } from './views/curriculo.js';
import { renderIA, mountIA } from './views/ia.js';
import { renderNotas, mountNotas } from './views/notas.js';
import { renderChecklist, mountChecklist } from './views/checklist.js';
import { renderCartas, mountCartas } from './views/cartas.js';
import { renderEntrevistas, mountEntrevistas } from './views/entrevistas.js';
import { renderSaude, mountSaude } from './views/saude.js';
import { renderCabelo, mountCabelo } from './views/cabelo.js';
import { renderFinanceiro, mountFinanceiro } from './views/financeiro.js';
import { renderProjetos, mountProjetos } from './views/projetos.js';
import { renderNotion, mountNotion } from './views/notion.js';

const loginScreen = document.getElementById('login-screen');
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginSubmit = document.getElementById('login-submit');
const loginError = document.getElementById('login-error');
const appLayout = document.getElementById('app-layout');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const appContent = document.getElementById('app-content');
const navItems = document.querySelectorAll('.nav-item');
const btnExport = document.getElementById('btn-export');
const btnLogout = document.getElementById('btn-logout');

const views = {
  rotina: { render: renderRotina, mount: mountRotina },
  biblia: { render: renderBiblia, mount: mountBiblia },
  vagas: { render: renderVagas, mount: mountVagas },
  curriculo: { render: renderCurriculo, mount: mountCurriculo },
  ia: { render: renderIA, mount: mountIA },
  notas: { render: renderNotas, mount: mountNotas },
  checklist: { render: renderChecklist, mount: mountChecklist },
  cartas: { render: renderCartas, mount: mountCartas },
  entrevistas: { render: renderEntrevistas, mount: mountEntrevistas },
  saude: { render: renderSaude, mount: mountSaude },
  cabelo: { render: renderCabelo, mount: mountCabelo },
  financeiro: { render: renderFinanceiro, mount: mountFinanceiro },
  projetos: { render: renderProjetos, mount: mountProjetos },
  notion: { render: renderNotion, mount: mountNotion }
};

function switchView(target) {
  if (!views[target]) return;

  navItems.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === target);
  });

  appContent.innerHTML = '';
  const viewContainer = document.createElement('div');
  viewContainer.className = 'view-container';
  viewContainer.innerHTML = views[target].render();
  appContent.appendChild(viewContainer);
  views[target].mount();
}

function startApp(user) {
  loginScreen.style.display = 'none';
  appLayout.style.display = 'flex';

  userAvatar.textContent = user.name?.charAt(0)?.toUpperCase() || '?';
  userName.textContent = user.name || user.email;

  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.getAttribute('data-target'));
    });
  });

  switchView('rotina');
}

function showError(msg) {
  loginError.textContent = msg;
  loginError.style.display = 'block';
}

function clearError() {
  loginError.style.display = 'none';
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const name = loginUsername.value.trim();
  if (!name) {
    showError('Digite seu nome.');
    return;
  }

  const result = loginWithName(name);
  if (result.ok) {
    startApp(result.user);
  } else {
    showError(result.error);
  }
});

if (btnExport) {
  btnExport.addEventListener('click', async () => {
    const saved = await promptSave();
    if (saved) {
      const status = document.createElement('div');
      status.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#10b981;color:#fff;padding:12px 20px;border-radius:12px;font-size:0.85rem;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(16,185,129,0.3);';
      status.textContent = 'Dados salvos com sucesso!';
      document.body.appendChild(status);
      setTimeout(() => status.remove(), 3000);
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    if (confirm('Deseja sair da sua conta?')) {
      logout();
    }
  });
}

const user = getLoggedUser();
if (user) {
  startApp(user);
}
