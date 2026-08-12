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

const isConfigured = CLIENT_ID && !CLIENT_ID.includes('SEU_CLIENT_ID');
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

function showConfigError() {
  loginScreen.innerHTML = `
    <div class="login-card">
      <div class="login-logo"><i class="fas fa-cog" style="animation: spin 3s linear infinite;"></i></div>
      <h1>Configuração Necessária</h1>
      <p>O <strong>Google Client ID</strong> ainda não foi configurado.<br><br>
      Siga os passos abaixo para ativar o login:</p>
      <div style="text-align:left; background:#131924; padding:16px; border-radius:12px; margin:16px 0; font-size:0.8rem; color:#8d97a8; line-height:1.8;">
        <strong style="color:#4fc3ff;">1.</strong> Acesse <a href="https://console.cloud.google.com/" target="_blank" style="color:#4fc3ff;">console.cloud.google.com</a><br>
        <strong style="color:#4fc3ff;">2.</strong> Crie um projeto ou selecione um existente<br>
        <strong style="color:#4fc3ff;">3.</strong> Ative o <strong style="color:#fff;">Google Identity Services</strong><br>
        <strong style="color:#4fc3ff;">4.</strong> Crie um <strong style="color:#fff;">OAuth 2.0 Client ID</strong> (tipo: Web application)<br>
        <strong style="color:#4fc3ff;">5.</strong> Adicione o domínio do GitHub Pages<br>
        <strong style="color:#4fc3ff;">6.</strong> Cole o Client ID em <code style="background:#0a0d13; padding:2px 6px; border-radius:4px; color:#34e0a1;">src/main.js</code>
      </div>
      <p style="font-size:0.75rem; color:#5c6577;">Após configurar, faça um novo deploy.</p>
    </div>
  `;
}

onUserLogin = (user) => startApp(user);

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
} else if (isConfigured) {
  initGoogleAuth(onUserLogin);
} else {
  showConfigError();
}
