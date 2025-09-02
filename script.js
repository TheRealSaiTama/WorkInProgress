// Typewriter for the middle "Work in Progress"
(function () {
  const el = document.getElementById('typed');
  if (!el) return;

  const text = 'Work in Progress';
  const words = text.split(' ');
  const typeDelay = 80;     // ms per character
  const wordPause = 600;    // pause after full text
  const deleteDelay = 180;  // ms per word deletion

  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function typeAll() {
    el.textContent = '';
    for (let i = 0; i < text.length; i++) {
      el.textContent = text.slice(0, i + 1);
      await sleep(typeDelay);
    }
  }

  async function deleteWordByWord() {
    // delete by whole words from the end
    let current = words.slice();
    while (current.length) {
      current.pop();
      el.textContent = current.join(' ');
      await sleep(deleteDelay);
    }
  }

  async function loop() {
    while (true) {
      await typeAll();
      await sleep(wordPause);
      await deleteWordByWord();
      await sleep(400);
    }
  }

  loop();
})();

// Ensure bell image renders; if missing, inject an SVG fallback
(function () {
  const holder = document.querySelector('.bell-circle');
  if (!holder) return;
  const img = holder.querySelector('img');
  if (!img) return;

  function insertFallback() {
    // Only insert once
    if (holder.querySelector('svg')) return;
    holder.innerHTML = '<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="#E7FFF2" stroke="#111" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"><path d="M60 26c-16 0-30 14-30 30v14c0 8-5 16-12 20l-5 3v8h94v-8l-5-3c-7-4-12-12-12-20V56c0-16-14-30-30-30z"/><path d="M50 22h20c0 6-4 10-10 10s-10-4-10-10z"/><circle cx="60" cy="94" r="6" fill="#111" stroke="#111"/><rect x="42" y="88" width="36" height="8" rx="4"/></g></svg>';
  }

  // If already loaded but failed
  if (img.complete && img.naturalWidth === 0) {
    insertFallback();
    return;
  }

  img.addEventListener('error', insertFallback);
})();
