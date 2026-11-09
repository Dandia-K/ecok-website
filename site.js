const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}

menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

const backToTop = document.querySelector('.back-to-top');

function updateBackToTop() {
  backToTop.hidden = window.scrollY < 120;
}

backToTop.addEventListener('click', (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  document.querySelector('.brand').focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
});

window.addEventListener('scroll', updateBackToTop, { passive: true });
window.addEventListener('pageshow', updateBackToTop);
updateBackToTop();

const preview = document.querySelector('.document-dialog');

if (preview && typeof preview.showModal === 'function') {
  const previewImage = preview.querySelector('img');
  const previewTitle = preview.querySelector('h2');
  const previewScroll = preview.querySelector('.dialog-scroll');

  document.querySelectorAll('.document-preview').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();

      const title = link.getAttribute('aria-label').replace(' 확대', '');
      previewTitle.textContent = title;
      previewImage.alt = title;
      previewImage.src = link.href;
      preview.showModal();
      previewScroll.scrollTop = 0;
    });
  });
}

const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function syncVideoPlayback() {
    if (reducedMotion.matches) heroVideo.pause();
    else heroVideo.play().catch(() => {});
  }

  heroVideo.muted = true;
  reducedMotion.addEventListener('change', syncVideoPlayback);
  syncVideoPlayback();
}
