import './style.css';
import { getLoggedUser, initGoogleAuth, logout } from './auth.js';
import { exportToTxt } from './utils.js';
import { renderRotina, mountRotina } from './views/rotina.js';
import { renderBiblia, mountBiblia } from './views/biblia.js';
import { renderVagas, mountVagas } from './views/vagas.js';
import { renderCurriculo, mountCurriculo } from './views/curriculo.js';
import { renderIA, mountIA } from './views/ia.js';
import { renderNotas, mountNotas } from './views/notas.js';
import { renderChecklist, mountChecklist } from './views/checklist.js';

const CLIENT_ID = 'SEU_CLIENT_ID_AQUI.apps.googleusercontent.com';

const loginScreen = document.getElementById('login-screen');
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
  checklist: { render: renderChecklist, mount: mountChecklist }
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

  if (user.picture) {
    userAvatar.src = user.picture;
    userAvatar.style.display = 'block';
  }
  userName.textContent = user.name || user.email;

  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.getAttribute('data-target'));
    });
  });

  switchView('rotina');
}

function onUserLogin(user) {
  startApp(user);
}

if (btnExport) {
  btnExport.addEventListener('click', exportToTxt);
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    if (confirm('Deseja sair da sua conta?')) {
      logout();
    }
  });
}

// Init
const user = getLoggedUser();
if (user) {
  startApp(user);
} else {
  initGoogleAuth(onUserLogin);
}
