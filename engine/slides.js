/* slides.js — Deck navigation */

let currentSlide = 0;
let slides = [];
const slideEls = () => document.querySelectorAll('[data-slide]');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counterEl = document.getElementById('counter');
const dotsEl = document.getElementById('dots');

function initSlides() {
  slides = slideEls();
  if (slides.length === 0) return;
  currentSlide = 0;
  updateSlides();
  setupControls();
  setupKeyboard();
  setupTouch();
}

function updateSlides() {
  slides.forEach((s, i) => {
    s.classList.toggle('is-active', i === currentSlide);
  });
  if (counterEl) counterEl.textContent = `${currentSlide + 1} / ${slides.length}`;
  if (prevBtn) prevBtn.disabled = currentSlide === 0;
  if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
  if (dotsEl) {
    const dots = dotsEl.querySelectorAll('.controls__dot');
    dots.forEach((d, i) => d.classList.toggle('is-active', i === currentSlide));
  }
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentSlide = index;
  updateSlides();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function setupControls() {
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (dotsEl && slides.length > 1) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'controls__dot';
      dot.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(dot);
    });
  }
}

function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  });
}

function setupTouch() {
  let startX = 0;
  document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? prevSlide() : nextSlide();
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initSlides);
