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
});
