document.addEventListener('DOMContentLoaded', () => {
  /*
   * ==========================================
   * LOGO 360° — ARRASTRAR CON DEDO O RATÓN
   * ==========================================
   */

  const logo = document.getElementById('hero-logo');

  if (logo) {
    let isDragging = false;
    let startX = 0;
    let rotation = 0;

    const sensitivity = 0.8;

    function startDrag(event) {
      isDragging = true;

      const point = event.touches
        ? event.touches[0]
        : event;

      startX = point.clientX;

      logo.style.transition = 'none';

      if (event.cancelable) {
        event.preventDefault();
      }
    }

    function moveDrag(event) {
      if (!isDragging) return;

      const point = event.touches
        ? event.touches[0]
        : event;

      const currentX = point.clientX;
      const difference = currentX - startX;

      rotation += difference * sensitivity;

      logo.style.transform =
        `perspective(1000px) rotateY(${rotation}deg)`;

      startX = currentX;

      if (event.cancelable) {
        event.preventDefault();
      }
    }

    function endDrag() {
      if (!isDragging) return;

      isDragging = false;
      logo.style.transition =
        'transform 120ms linear';
    }

    /* MÓVIL */
    logo.addEventListener(
      'touchstart',
      startDrag,
      { passive: false }
    );

    logo.addEventListener(
      'touchmove',
      moveDrag,
      { passive: false }
    );

    logo.addEventListener(
      'touchend',
      endDrag
    );

    /* ORDENADOR */
    logo.addEventListener(
      'mousedown',
      startDrag
    );

    document.addEventListener(
      'mousemove',
      moveDrag
    );

    document.addEventListener(
      'mouseup',
      endDrag
    );
  }


  /*
   * ==========================================
   * BOTÓN ENTRAR
   * ==========================================
   */

  const enterButton =
    document.getElementById('hero-enter');

  const hero =
    document.getElementById('hero-interactive');

  if (enterButton && hero) {

    enterButton.addEventListener('click', () => {

      const destination =
        hero.dataset.enterUrl || '/collections/all';

      /*
       * Evitamos pulsaciones múltiples
       */
      if (hero.classList.contains('is-entering')) {
        return;
      }

      hero.classList.add('is-entering');

      /*
       * Esperamos a que termine
       * el efecto de acercamiento.
       */
      setTimeout(() => {
        window.location.href = destination;
      }, 850);

    });
  }


  /*
   * ==========================================
   * SCROLL SUAVE
   * ==========================================
   */

  document
    .querySelectorAll('[data-scroll-to]')
    .forEach((button) => {

      button.addEventListener('click', () => {

        const targetId =
          button.dataset.scrollTo;

        const target =
          document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });

    });


  /*
   * ==========================================
   * CARRITO
   * ==========================================
   */

  const cartButton =
    document.getElementById('cart-btn');

  const cartDrawer =
    document.getElementById('cart-drawer');

  const cartClose =
    document.querySelector('.cart-drawer__close');

  const cartOverlay =
    document.querySelector('.cart-drawer__overlay');


  function openCart() {
    if (!cartDrawer) return;

    cartDrawer.classList.add('is-open');
    document.body.classList.add('cart-open');
  }


  function closeCart() {
    if (!cartDrawer) return;

    cartDrawer.classList.remove('is-open');
    document.body.classList.remove('cart-open');
  }


  if (cartButton) {
    cartButton.addEventListener(
      'click',
      openCart
    );
  }


  if (cartClose) {
    cartClose.addEventListener(
      'click',
      closeCart
    );
  }


  if (cartOverlay) {
    cartOverlay.addEventListener(
      'click',
      closeCart
    );
  }

});
