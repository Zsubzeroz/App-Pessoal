import './style.css';
import { renderRotina, mountRotina } from './views/rotina.js';
import { renderBiblia, mountBiblia } from './views/biblia.js';
import { renderVagas, mountVagas } from './views/vagas.js';
import { renderCurriculo, mountCurriculo } from './views/curriculo.js';

const appContent = document.getElementById('app-content');
const navItems = document.querySelectorAll('.nav-item');

const views = {
  rotina: { render: renderRotina, mount: mountRotina },
  biblia: { render: renderBiblia, mount: mountBiblia },
  vagas: { render: renderVagas, mount: mountVagas },
  curriculo: { render: renderCurriculo, mount: mountCurriculo }
};

function switchView(target) {
  if (!views[target]) return;

  // Update Active Nav
  navItems.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === target);
  });

  // Clear and Transition
  appContent.innerHTML = '';
  const viewContainer = document.createElement('div');
  viewContainer.className = 'view-container';
  
  // Inject
  viewContainer.innerHTML = views[target].render();
  appContent.appendChild(viewContainer);
  
  // Initialize View Logic
  views[target].mount();
}

// Event Listeners for Nav
navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    switchView(btn.getAttribute('data-target'));
  });
});

// Initialize with Rotina
switchView('rotina');
