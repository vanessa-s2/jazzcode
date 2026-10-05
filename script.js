let currentPrice = 0;
let currentType = '';

// Abrir Modal de Checkout
function openCheckout(type, price) {
  currentType = type;
  currentPrice = price;

  const modalTitle = document.getElementById('modalTitle');
  const ticketForm = document.getElementById('ticketForm');
  const formContainer = document.getElementById('formContainer');
  const receiptContainer = document.getElementById('receiptContainer');
  const checkoutModal = document.getElementById('checkoutModal');

  if (modalTitle) modalTitle.innerText = 'COMPRAR - ' + type;
  if (ticketForm) ticketForm.reset();
  if (formContainer) formContainer.style.display = 'block';
  if (receiptContainer) receiptContainer.style.display = 'none';

  // Reseta seleção de dia para a primeira opção
  const firstDayOption = document.querySelector('input[name="eventDayOption"][value="Sábado (28/11)"]');
  if (firstDayOption) firstDayOption.checked = true;
  
  handleDayChange();
  updateTotal();

  if (checkoutModal) {
    checkoutModal.style.display = 'flex';
  }
}

// Controla a mudança do dia escolhido no modal
function handleDayChange() {
  const selectedDay = document.querySelector('input[name="eventDayOption"]:checked').value;
  const surpriseBonus = document.getElementById('surpriseBonus');

  if (selectedDay === 'Passaporte 2 Dias (Sáb + Dom)') {
    if (surpriseBonus) surpriseBonus.style.display = 'block';
  } else {
    if (surpriseBonus) surpriseBonus.style.display = 'none';
  }
}

// Fechar Modal
function closeCheckout() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.style.display = 'none';
  }
}

// Atualizar preço total
function updateTotal() {
  const qtyInput = document.getElementById('ticketQty');
  const totalPriceSpan = document.getElementById('totalPrice');
  
  if (qtyInput && totalPriceSpan) {
    const qty = parseInt(qtyInput.value) || 1;
    totalPriceSpan.innerText = (qty * currentPrice).toFixed(2);
  }
}

// Processar compra e exibir comprovante
function handlePurchase(e) {
  e.preventDefault();

  const buyerName = document.getElementById('buyerName').value;
  const selectedDay = document.querySelector('input[name="eventDayOption"]:checked').value;
  const ticketQty = document.getElementById('ticketQty').value;
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  let giftText = 'Nenhum';
  if (selectedDay === 'Passaporte 2 Dias (Sáb + Dom)') {
    giftText = '🎁 BRINDE SURPRESA JAZZ CODE';
  }

  document.getElementById('recName').innerText = buyerName;
  document.getElementById('recType').innerText = currentType;
  document.getElementById('recDay').innerText = selectedDay;
  document.getElementById('recQty').innerText = ticketQty;
  document.getElementById('recGift').innerText = giftText;
  document.getElementById('recCode').innerText = randomCode;

  const formContainer = document.getElementById('formContainer');
  const receiptContainer = document.getElementById('receiptContainer');

  formContainer.style.display = 'none';
  receiptContainer.style.display = 'block';
}

// Eventos de carregamento
document.addEventListener('DOMContentLoaded', () => {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }
});