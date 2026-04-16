export function renderBiblia() {
  return `
    <style>
      .b-container { max-width: 900px; margin: 0 auto; }
      .b-header { text-align: center; margin-bottom: 20px; }
      .b-header h1 { font-size: 26px; font-weight: 600; }
      .b-info { background: rgba(0, 180, 216, 0.1); padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; border: 1px solid var(--accent); }
      
      .b-table { width: 100%; border-collapse: collapse; background: var(--bg-card); border-radius: 8px; overflow: hidden; font-size: 14px; }
      .b-table th, .b-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #333; }
      .b-table th { background: #1a1a1d; color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
      .b-table tr:hover { background: rgba(255,255,255,0.05); }
      
      .checkbox-cell { width: 50px; text-align: center; }
      input[type="checkbox"] { transform: scale(1.3); cursor: pointer; accent-color: var(--accent); }
      .completed { background: #1a2a22 !important; color: #555; text-decoration: line-through; }
    </style>

    <div class="b-container">
      <div class="b-header">
        <h1>Meu Plano de Leitura Bíblica</h1>
      </div>
      <div class="b-info">
        <p><strong>Meta Anual:</strong> Ler toda a Bíblia gerenciando o status por dia. (Média 3~4 cáp/dia)</p>
      </div>

      <table class="b-table">
        <thead>
          <tr>
            <th class="checkbox-cell">Lido</th>
            <th>Dia</th>
            <th>Leitura Resumida</th>
          </tr>
        </thead>
        <tbody id="b-tbody">
          <!-- Populated by JS -->
        </tbody>
      </table>
    </div>
  `;
}

export function mountBiblia() {
  const tbody = document.getElementById('b-tbody');
  if(!tbody) return;

  // Simple mock generation of 365 days
  for(let i = 1; i <= 365; i++) {
    const isChecked = localStorage.getItem(`biblia_dia_${i}`) === 'true';
    const tr = document.createElement('tr');
    if (isChecked) tr.classList.add('completed');
    
    // Simulate some logic for chapter names based on index
    let leitura = "";
    if(i < 50) leitura = `Gênesis ${i} - ${i+2}`;
    else if(i < 90) leitura = `Êxodo ${i-50} - ${i-48}`;
    else leitura = `Leitura Bíblica: Cáp ${i*3} ao ${i*3+3}`;

    tr.innerHTML = `
      <td class="checkbox-cell">
        <input type="checkbox" data-dia="${i}" ${isChecked ? 'checked' : ''}>
      </td>
      <td>Dia ${i}</td>
      <td><strong>${leitura}</strong></td>
    `;
    tbody.appendChild(tr);
  }

  // Event Listeners for checkboxes
  tbody.addEventListener('change', (e) => {
    if(e.target.tagName === 'INPUT') {
      const dia = e.target.getAttribute('data-dia');
      const tr = e.target.closest('tr');
      if(e.target.checked) {
        tr.classList.add('completed');
        localStorage.setItem(`biblia_dia_${dia}`, 'true');
      } else {
        tr.classList.remove('completed');
        localStorage.removeItem(`biblia_dia_${dia}`);
      }
    }
  });
}
