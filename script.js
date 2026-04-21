document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Set default theme from localStorage or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  setTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // 2. Tabbed Experience Logic (Runs only on experience.html)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if(tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // 3. Page Fade-In Logic (Replaces the heavy scroll intersection observers since every page is loaded instantly)
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 50);

  // 4. Smooth Anchor Scroll for the Contact Section only
  document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetElement = document.querySelector('#contact');
      if (targetElement) {
        e.preventDefault();
        const offset = 80; 
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

});
