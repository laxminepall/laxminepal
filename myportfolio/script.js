(function () {
    'use strict';
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => links.classList.toggle('show'));
    }
    document.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => links.classList.remove('show'));
    });
})();