// ============================================================
// INSTITUTO LÍRIOS — interações da interface (RF07, RF11, RF18, RF21)
// ============================================================

/** Filtra as linhas de uma tabela a partir de um campo de busca. */
function attachTableSearch(inputEl, tableBodyEl) {
  if (!inputEl || !tableBodyEl) return;
  inputEl.addEventListener('input', () => {
    const q = inputEl.value.trim().toLowerCase();
    [...tableBodyEl.rows].forEach(row => {
     const name = row.cells[0].innerText.toLowerCase();
    row.style.display = name.includes(q) ? '' : 'none';
    });
  });
}

/** Alterna entre abas (usado na Ficha da Cliente). */
function attachTabs(navSelector, panelSelector) {
  const tabs = document.querySelectorAll(navSelector);
  const panels = document.querySelectorAll(panelSelector);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });
}

/** Simula a geração do Resumo Inteligente com IA (RF21 / HU11). */
function attachAISummary(buttonEl, outputEl, summaryLines) {
  if (!buttonEl || !outputEl) return;
  buttonEl.addEventListener('click', () => {
    buttonEl.disabled = true;
    const originalText = buttonEl.textContent;
    buttonEl.textContent = 'Gerando resumo...';
    outputEl.innerHTML = '';
    setTimeout(() => {
      outputEl.innerHTML = summaryLines.map(l => `<li>${l}</li>`).join('');
      buttonEl.textContent = originalText;
      buttonEl.disabled = false;
    }, 900);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Busca de clientes
  attachTableSearch(
    document.getElementById('clientSearch'),
    document.getElementById('clientTableBody')
  );

  // Abas da ficha da cliente
  attachTabs('.tab-btn', '.tab-panel');

  // Botões de Resumo Inteligente com IA (podem existir vários na página)
  document.querySelectorAll('[data-ai-summary]').forEach(btn => {
    const targetId = btn.getAttribute('data-ai-summary');
    const output = document.getElementById(targetId);
    const lines = JSON.parse(btn.getAttribute('data-ai-lines') || '[]');
    attachAISummary(btn, output, lines);
  });
});
