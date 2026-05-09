import './style.css';
import { renderRotina, mountRotina } from './views/rotina.js';
import { renderBiblia, mountBiblia } from './views/biblia.js';
import { renderVagas, mountVagas } from './views/vagas.js';
import { renderCurriculo, mountCurriculo } from './views/curriculo.js';

const appContent = document.getElementById('app-content');
const navItems = document.querySelectorAll('.nav-item');

function switchView(target) {
  // Update Active Nav
  navItems.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-target="${target}"]`).classList.add('active');

  // Clear previous content
  appContent.innerHTML = '';
  const viewContainer = document.createElement('div');
  viewContainer.className = 'view-container';

  // Inject New View
  if (target === 'rotina') {
    viewContainer.innerHTML = renderRotina();
    appContent.appendChild(viewContainer);
    mountRotina();
  } else if (target === 'biblia') {
    viewContainer.innerHTML = renderBiblia();
    appContent.appendChild(viewContainer);
    mountBiblia();
  } else if (target === 'vagas') {
    viewContainer.innerHTML = renderVagas();
    appContent.appendChild(viewContainer);
    mountVagas();
  } else if (target === 'curriculo') {
    viewContainer.innerHTML = renderCurriculo();
    appContent.appendChild(viewContainer);
    mountCurriculo();
  }
}

// Event Listeners for Nav
navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    switchView(btn.getAttribute('data-target'));
  });
});

// Initialize with Rotina
switchView('rotina');
