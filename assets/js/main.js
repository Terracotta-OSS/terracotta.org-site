(function () {
  'use strict';

  function getStoredTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function setStoredTheme(t) {
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  function applyTheme(t) {
    var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  }
  function currentResolved() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle buttons
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = currentResolved() === 'dark' ? 'light' : 'dark';
        setStoredTheme(next);
        applyTheme(next);
      });
    });

    // Mobile nav toggle
    var navBtn = document.querySelector('[data-nav-toggle]');
    var navMenu = document.getElementById('nav-mobile');
    if (navBtn && navMenu) {
      navBtn.addEventListener('click', function () {
        var open = navMenu.classList.toggle('hidden') === false;
        navBtn.setAttribute('aria-expanded', String(open));
      });
      // Close menu when any link inside is clicked
      navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.classList.add('hidden');
          navBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Copy-to-clipboard on code blocks
    document.querySelectorAll('pre').forEach(function (pre) {
      if (pre.querySelector('.copy-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'copy-btn absolute top-3 right-3 rounded-md px-2 py-1 text-xs font-medium text-content-muted/70 opacity-0 transition hover:text-content hover:bg-white/10';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      pre.style.position = 'relative';
      pre.appendChild(btn);
      pre.addEventListener('mouseenter', function () { btn.style.opacity = '1'; });
      pre.addEventListener('mouseleave', function () { btn.style.opacity = '0'; });
      btn.addEventListener('click', function () {
        var code = pre.querySelector('code');
        var text = code ? code.textContent : pre.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copied!';
          btn.classList.add('text-green-400');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('text-green-400');
          }, 1500);
        });
      });
    });

    // Active nav link based on current URL
    var currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '/') return;
      var linkPath = href.replace(/^https?:\/\/[^/]+/, '').replace(/index\.html$/, '').replace(/\/$/, '');
      if (linkPath === currentPath || (currentPath.indexOf(linkPath) === 0 && linkPath.length > 1)) {
        link.classList.add('nav-link-active');
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();