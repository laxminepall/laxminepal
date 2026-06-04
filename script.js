/* ============================================
   FUN PORTFOLIO SCRIPT — Laxmi Nepal ⚡
   ============================================ */

(function () {
    'use strict';

    // ===== MOBILE NAV =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // ===== ACTIVE LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach((current) => {
            const h = current.offsetHeight;
            const top = current.offsetTop - 100;
            const id = current.getAttribute('id');
            const link = document.querySelector('.nav-link[href*=' + id + ']');
            if (!link) return;
            if (scrollY > top && scrollY <= top + h) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // ===== SCROLL TO TOP =====
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 400) scrollTopBtn.classList.add('show');
        else scrollTopBtn.classList.remove('show');
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== REVEAL ON SCROLL =====
    const reveals = document.querySelectorAll('[data-reveal]');
    function revealOnScroll() {
        const wh = window.innerHeight;
        reveals.forEach((el) => {
            const top = el.getBoundingClientRect().top;
            if (top < wh - 100) {
                el.classList.add('reveal');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // ===== CONTACT FORM =====
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = new FormData(form).get('name');
            status.textContent = 'Thanks, ' + name + '! Your message just flew off 🚀✨';
            form.reset();
            setTimeout(() => { status.textContent = ''; }, 5000);
        });
    }

    // ===== FOOTER YEAR =====
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== CURSOR TRAIL (subtle fun touch) =====
    const trails = ['✨', '⭐', '💜', '⚡', '🚀'];
    let lastTrail = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrail < 80) return;
        lastTrail = now;
        const trail = document.createElement('span');
        trail.textContent = trails[Math.floor(Math.random() * trails.length)];
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: 1rem;
            z-index: 9999;
            transition: all 1s ease-out;
            opacity: 1;
        `;
        document.body.appendChild(trail);
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'translateY(-30px) scale(0.5)';
        }, 50);
        setTimeout(() => trail.remove(), 1100);
    });

    // ===== EASTER EGG: click logo 5 times for confetti =====
    let logoClicks = 0;
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            logoClicks++;
            if (logoClicks >= 5) {
                logoClicks = 0;
                for (let i = 0; i < 30; i++) {
                    const c = document.createElement('div');
                    c.textContent = ['🎉', '✨', '🎊', '⭐', '💜'][Math.floor(Math.random() * 5)];
                    c.style.cssText = `
                        position: fixed;
                        left: ${e.clientX}px;
                        top: ${e.clientY}px;
                        pointer-events: none;
                        font-size: 1.5rem;
                        z-index: 9999;
                        transition: all 1.5s ease-out;
                    `;
                    document.body.appendChild(c);
                    const x = (Math.random() - 0.5) * 400;
                    const y = (Math.random() - 0.5) * 400;
                    setTimeout(() => {
                        c.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
                        c.style.opacity = '0';
                    }, 50);
                    setTimeout(() => c.remove(), 1600);
                }
            }
        });
    }
})();
