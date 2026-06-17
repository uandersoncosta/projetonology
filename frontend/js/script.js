document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cashback-form');
  const resultContainer = document.getElementById('result-container');
  const cashbackResult = document.getElementById('cashback-result');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.spinner-border');

  const historyTbody = document.getElementById('history-tbody');
  const emptyState = document.getElementById('empty-state');
  const historyTab = document.getElementById('history-tab');

  const API_URL = 'https://projetonology.onrender.com/';

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const clientType = document.getElementById('clientType').value;
    const purchaseValue = parseFloat(document.getElementById('purchaseValue').value);
    const discountValue = parseFloat(document.getElementById('discountValue').value);

    if (!clientType || isNaN(purchaseValue) || isNaN(discountValue)) return;

    // UI Loading state
    btnText.classList.add('d-none');
    spinner.classList.remove('d-none');
    submitBtn.disabled = true;

    try {
      const response = await fetch(`${API_URL}cashback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo_cliente: clientType.toUpperCase(), valor: purchaseValue, desconto: discountValue })
      });

      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }

      const data = await response.json();

      cashbackResult.textContent = formatter.format(data.cashback);
      resultContainer.classList.remove('d-none');

    } catch (error) {
      console.error("Erro ao calcular cashback:", error);
      alert("Erro de comunicação com o servidor.");
    } finally {
      btnText.classList.remove('d-none');
      spinner.classList.add('d-none');
      submitBtn.disabled = false;
    }
  });

  const mainTitle = document.querySelector('.card-header h2');
  const calcTab = document.getElementById('calc-tab');

  calcTab.addEventListener('shown.bs.tab', () => {
    mainTitle.textContent = 'Consultar Cashback';
  });

  historyTab.addEventListener('shown.bs.tab', async () => {
    mainTitle.textContent = 'Histórico de Consultas';
    loadHistory();
  });

  async function loadHistory() {
    try {
      const response = await fetch(`${API_URL}consultas`);

      if (!response.ok) {
        throw new Error('Erro na requisição da API de histórico');
      }

      const data = await response.json();
      const historyData = data.consultas || [];

      historyTbody.innerHTML = '';

      if (historyData.length === 0) {
        emptyState.classList.remove('d-none');
        historyTbody.closest('.table-responsive').classList.add('d-none');
      } else {
        emptyState.classList.add('d-none');
        historyTbody.closest('.table-responsive').classList.remove('d-none');

        historyData.forEach(item => {
          const clientTypeLabel = item.tipo_cliente ? item.tipo_cliente.toUpperCase() : 'NORMAL';
          const badgeClass = clientTypeLabel === 'VIP' ? 'bg-warning text-dark' : 'bg-secondary';

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><span class="badge ${badgeClass}">${item.tipo_cliente}</span></td>
            <td>${formatter.format(item.valor_compra)}</td>
            <td class="text-success fw-bold">${formatter.format(item.cashback)}</td>
          `;
          historyTbody.appendChild(tr);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      historyTbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Erro ao carregar histórico</td></tr>';
    }
  }
});
