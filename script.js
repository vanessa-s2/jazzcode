let singleDayPrice = 0;
let doubleDayPrice = 0;
let currentType = '';

// Abrir Modal de Checkout guardando o preço de 1 dia e o preço promocional de 2 dias
function openCheckout(type, priceSingle, priceDouble) {
  currentType = type;
  singleDayPrice = priceSingle;
  doubleDayPrice = priceDouble;

  const modalTitle = document.getElementById('modalTitle');
  const ticketForm = document.getElementById('ticketForm');
  const formContainer = document.getElementById('formContainer');
  const receiptContainer = document.getElementById('receiptContainer');
  const checkoutModal = document.getElementById('checkoutModal');

  if (modalTitle) modalTitle.innerText = 'COMPRAR - ' + type;
  if (ticketForm) ticketForm.reset();
  if (formContainer) formContainer.style.display = 'block';
  if (receiptContainer) receiptContainer.style.display = 'none';

  // Marca por padrão o primeiro dia
  const firstDayOption = document.querySelector('input[name="eventDayOption"][value="Sábado (28/11)"]');
  if (firstDayOption) firstDayOption.checked = true;
  
  handleDayChange();

  if (checkoutModal) {
    checkoutModal.style.display = 'flex';
  }
}

// Controla a mudança do dia escolhido e recalcula os preços
function handleDayChange() {
  const selectedDay = document.querySelector('input[name="eventDayOption"]:checked').value;
  const surpriseBonus = document.getElementById('surpriseBonus');

  if (selectedDay === 'Passaporte 2 Dias (Sáb + Dom)') {
    if (surpriseBonus) surpriseBonus.style.display = 'block';
  } else {
    if (surpriseBonus) surpriseBonus.style.display = 'none';
  }

  updateTotal();
}

// Fechar Modal
function closeCheckout() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.style.display = 'none';
  }
}

// Atualizar preço unitário e valor total em tempo real
function updateTotal() {
  const qtyInput = document.getElementById('ticketQty');
  const unitPriceSpan = document.getElementById('unitPrice');
  const totalPriceSpan = document.getElementById('totalPrice');
  const selectedDayOption = document.querySelector('input[name="eventDayOption"]:checked');

  if (!selectedDayOption) return;

  const selectedDay = selectedDayOption.value;
  const activePrice = (selectedDay === 'Passaporte 2 Dias (Sáb + Dom)') ? doubleDayPrice : singleDayPrice;
  const qty = parseInt(qtyInput.value) || 1;

  if (unitPriceSpan) unitPriceSpan.innerText = activePrice.toFixed(2);
  if (totalPriceSpan) totalPriceSpan.innerText = (qty * activePrice).toFixed(2);
}

// Processar compra e exibir comprovante
function handlePurchase(e) {
  e.preventDefault();

  const buyerName = document.getElementById('buyerName').value;
  const selectedDay = document.querySelector('input[name="eventDayOption"]:checked').value;
  const ticketQty = document.getElementById('ticketQty').value;
  const activePrice = (selectedDay === 'Passaporte 2 Dias (Sáb + Dom)') ? doubleDayPrice : singleDayPrice;
  const totalAmount = (parseInt(ticketQty) * activePrice).toFixed(2);
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  let giftText = 'Nenhum';
  if (selectedDay === 'Passaporte 2 Dias (Sáb + Dom)') {
    giftText = '🎁 BRINDE SURPRESA JAZZ CODE';
  }

  document.getElementById('recName').innerText = buyerName;
  document.getElementById('recType').innerText = currentType;
  document.getElementById('recDay').innerText = selectedDay;
  document.getElementById('recQty').innerText = ticketQty;
  document.getElementById('recTotal').innerText = totalAmount;
  document.getElementById('recGift').innerText = giftText;
  document.getElementById('recCode').innerText = randomCode;

  const formContainer = document.getElementById('formContainer');
  const receiptContainer = document.getElementById('receiptContainer');

  formContainer.style.display = 'none';
  receiptContainer.style.display = 'block';
}

// Fechar ao clicar fora
document.addEventListener('DOMContentLoaded', () => {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }
});