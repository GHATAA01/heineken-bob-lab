// copy.js — one-click clipboard copy for prompt and code blocks
// Attaches to all elements with class .copy-btn
// Usage: <button class="copy-btn" data-target="id-of-pre-element">Copy</button>

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var text = targetId
        ? (document.getElementById(targetId) || {}).innerText || ''
        : btn.closest('.prompt-box, .code-block').querySelector('pre').innerText;

      navigator.clipboard.writeText(text.trim()).then(function () {
        var original = btn.textContent;
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1800);
      }).catch(function () {
        // Fallback for browsers that block clipboard without HTTPS
        var ta = document.createElement('textarea');
        ta.value = text.trim();
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 1800);
      });
    });
  });
});
