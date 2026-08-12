import './style.css';
import { renderRotina, mountRotina } from './views/rotina.js';
import { renderBiblia, mountBiblia } from './views/biblia.js';
import { renderVagas, mountVagas } from './views/vagas.js';
import { renderCurriculo, mountCurriculo } from './views/curriculo.js';
import { renderIA, mountIA } from './views/ia.js';
import { renderNotas, mountNotas } from './views/notas.js';
import { renderChecklist, mountChecklist } from './views/checklist.js';
import { renderDesafio, mountDesafio } from './views/desafio.js';
import { renderCiclo, mountCiclo } from './views/ciclo.js';
import { renderReferencia, mountReferencia } from './views/referencia.js';

const appContent = document.getElementById('app-content');
const navItems = document.querySelectorAll('.nav-item');

const views = {
  rotina: { render: renderRotina, mount: mountRotina },
  biblia: { render: renderBiblia, mount: mountBiblia },
  vagas: { render: renderVagas, mount: mountVagas },
  curriculo: { render: renderCurriculo, mount: mountCurriculo },
  ia: { render: renderIA, mount: mountIA },
  notas: { render: renderNotas, mount: mountNotas },
  checklist: { render: renderChecklist, mount: mountChecklist },
  desafio: { render: renderDesafio, mount: mountDesafio },
  ciclo: { render: renderCiclo, mount: mountCiclo },
  referencia: { render: renderReferencia, mount: mountReferencia }
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

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    switchView(btn.getAttribute('data-target'));
  });
});

switchView('rotina');
