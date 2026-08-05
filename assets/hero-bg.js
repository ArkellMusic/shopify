document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let animationFrame;

  const particles = [];

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();

    width = canvas.width = rect.width * window.devicePixelRatio;
    height = canvas.height = rect.height * window.devicePixelRatio;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.setTransform(
      window.devicePixelRatio,
      0,
      0,
      window.devicePixelRatio,
      0,
      0
    );

    createParticles();
  }

  function createParticles() {
    particles.length = 0;

    const count = Math.min(
      100,
      Math.floor(window.innerWidth / 10)
    );

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function animate() {
    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    particles.forEach((particle) => {
      particle.y -= particle.speed;

      if (particle.y < -10) {
        particle.y = window.innerHeight + 10;
        particle.x = Math.random() * window.innerWidth;
      }

      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
      ctx.fill();
    });

    animationFrame = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
  animate();

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrame);
  });
});
