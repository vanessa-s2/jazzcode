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

  updateTotal();

  if (checkoutModal) {
    checkoutModal.style.display = 'flex';
    checkoutModal.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], {
      duration: 200,
      fill: 'forwards'
    });
  }
}

// Fechar Modal
function closeCheckout() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    const animation = checkoutModal.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 150
    });

    animation.onfinish = () => {
      checkoutModal.style.display = 'none';
    };
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
  const eventDay = document.getElementById('eventDay').value;
  const ticketQty = document.getElementById('ticketQty').value;
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  document.getElementById('recName').innerText = buyerName;
  document.getElementById('recType').innerText = currentType;
  document.getElementById('recDay').innerText = eventDay;
  document.getElementById('recQty').innerText = ticketQty;
  document.getElementById('recCode').innerText = randomCode;

  const formContainer = document.getElementById('formContainer');
  const receiptContainer = document.getElementById('receiptContainer');

  formContainer.style.display = 'none';
  receiptContainer.style.display = 'block';

  receiptContainer.animate([
    { opacity: 0, transform: 'scale(0.95)' },
    { opacity: 1, transform: 'scale(1)' }
  ], {
    duration: 250,
    easing: 'ease-out'
  });
}

// Animações e Interatividade
document.addEventListener('DOMContentLoaded', () => {

  // Fechar ao clicar fora do modal
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }

  // Rolagem suave no menu
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = document.querySelector(link.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Efeito de clique nos botões
  const buttons = document.querySelectorAll('.btn-buy, .btn-submit');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.style.transform = 'scale(0.97)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });

  // Animação de entrada dos cards
  const cards = document.querySelectorAll('.ticket-card, .day-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s';
    observer.observe(card);
  });

});