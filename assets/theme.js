document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('[data-scroll-to]');

  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.scrollTo;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.product-card__link');

      if (link) {
        window.location.href = link.href;
      }
    });
  });

  const cartButton = document.getElementById('cart-btn');

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      window.location.href = '/cart';
    });
  }
});
