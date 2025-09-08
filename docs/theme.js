// docs/theme.js
(function(){
  const STORAGE_KEY = 'site-theme';
  const html = document.documentElement;

  // Set theme early to avoid flash
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);

  function setTheme(next){
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    // update aria-pressed state if button exists
    const btn = document.getElementById('themeToggle');
    if(btn) btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  }

  function toggleTheme(){
    const current = html.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Hook up the button after DOM is ready
  window.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('themeToggle');
    if(btn){
      btn.addEventListener('click', toggleTheme);
      btn.setAttribute('aria-pressed', (html.getAttribute('data-theme') === 'dark') ? 'true' : 'false');
    }
  });
})();
