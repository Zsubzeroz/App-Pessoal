import './style.css';
import { getLoggedUser, login, register, logout } from './auth.js';
import { exportToTxt } from './utils.js';
import { renderRotina, mountRotina } from './views/rotina.js';
import { renderBiblia, mountBiblia } from './views/biblia.js';
import { renderVagas, mountVagas } from './views/vagas.js';
import { renderCurriculo, mountCurriculo } from './views/curriculo.js';
import { renderIA, mountIA } from './views/ia.js';
import { renderNotas, mountNotas } from './views/notas.js';
import { renderChecklist, mountChecklist } from './views/checklist.js';

let isRegisterMode = false;

const loginScreen = document.getElementById('login-screen');
const loginTitle = document.getElementById('login-title');
const loginSubtitle = document.getElementById('login-subtitle');
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginSubmit = document.getElementById('login-submit');
const loginToggle = document.getElementById('login-toggle');
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

  const initials = (user.name || user.email || '?').charAt(0).toUpperCase();
  userAvatar.textContent = initials;
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

function toggleMode() {
  isRegisterMode = !isRegisterMode;
  clearError();
  loginUsername.value = '';
  loginPassword.value = '';

  if (isRegisterMode) {
    loginTitle.textContent = 'Criar Conta';
    loginSubtitle.textContent = 'Preencha para criar sua conta.';
    loginSubmit.textContent = 'Criar Conta';
    loginToggle.textContent = 'Já tem conta? Entrar';
  } else {
    loginTitle.textContent = 'Entrar';
    loginSubtitle.textContent = 'Acesse sua conta para continuar.';
    loginSubmit.textContent = 'Entrar';
    loginToggle.textContent = 'Não tem conta? Criar conta';
  }
}

loginToggle.addEventListener('click', toggleMode);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();

  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (!username || !password) {
    showError('Preencha todos os campos.');
    return;
  }

  loginSubmit.disabled = true;
  loginSubmit.textContent = isRegisterMode ? 'Criando...' : 'Entrando...';

  try {
    const result = isRegisterMode
      ? await register(username, password)
      : await login(username, password);

    if (result.ok) {
      startApp(result.user);
    } else {
      showError(result.error);
    }
  } catch (err) {
    showError('Erro inesperado: ' + err.message);
  } finally {
    loginSubmit.disabled = false;
    loginSubmit.textContent = isRegisterMode ? 'Criar Conta' : 'Entrar';
  }
});

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
}
