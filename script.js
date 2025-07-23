const keyDisplay = document.getElementById('key-display');

function createParticles(keyElement) {
  if (!keyElement) return;
  const rect = keyElement.getBoundingClientRect();

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const x = (Math.random() - 0.5) * 100 + 'px';
    const y = (Math.random() - 0.5) * 100 + 'px';

    particle.style.setProperty('--x', x);
    particle.style.setProperty('--y', y);

    particle.style.left = rect.left + rect.width / 2 + 'px';
    particle.style.top = rect.top + rect.height / 2 + 'px';

    document.body.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  }
}

function activateKey(keyElement, label) {
  if (!keyElement) return;
  if (keyElement.classList.contains('active')) return;
  keyElement.classList.add('active');
  keyDisplay.textContent = label || '';
  createParticles(keyElement);
}

function deactivateKey(keyElement) {
  if (!keyElement) return;
  keyElement.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  // e.codeで探す
  const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
  if (!keyElement) return;
  activateKey(keyElement, e.key === ' ' ? 'Space' : e.key.toUpperCase());
});

document.addEventListener('keyup', (e) => {
  const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
  if (!keyElement) return;
  deactivateKey(keyElement);
});

// マウスで押したときのエフェクト
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('mousedown', () => {
    const label = key.textContent.trim() || '';
    activateKey(key, label);
  });
  key.addEventListener('mouseup', () => {
    deactivateKey(key);
  });
  key.addEventListener('mouseleave', () => {
    deactivateKey(key);
  });
});
