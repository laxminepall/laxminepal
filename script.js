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

    // ===== CURSOR TRAIL =====
    const trails = ['🎂', '🎉', '💜', '🎁', '✨'];
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

    // ===== CONFETTI BURST =====
    function burstConfetti(count) {
        const emojis = ['🎉', '🎊', '✨', '⭐', '💜', '🎂', '🎁', '🌸'];
        for (let i = 0; i < count; i++) {
            const c = document.createElement('div');
            c.className = 'confetti-piece';
            c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            c.style.cssText = `
                left: ${Math.random() * 100}vw;
                top: ${-10 - Math.random() * 20}px;
                font-size: ${0.8 + Math.random() * 1.2}rem;
                animation-duration: ${2 + Math.random() * 3}s;
                animation-delay: ${Math.random() * 2}s;
            `;
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 6000);
        }
    }

    // Confetti on load
    window.addEventListener('load', () => {
        setTimeout(() => burstConfetti(40), 500);
    });

    // ===== EASTER EGG: click logo 5 times =====
    let logoClicks = 0;
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            logoClicks++;
            if (logoClicks >= 5) {
                logoClicks = 0;
                burstConfetti(50);
            }
        });
    }

    // ===== BIRTHDAY WISHES =====
    const STORAGE_KEY = 'laxmi_birthday_wishes';

    const sampleWishes = [
        { name: 'Anjali Sharma', relation: 'Friend', message: 'Happy birthday Laxmi! So glad to have you in my life. Stay amazing! 💖', time: Date.now() - 86400000 * 2 },
        { name: 'Ravi Kumar', relation: 'Classmate', message: 'Many many happy returns of the day! Enjoy your day to the fullest 🎂🎉', time: Date.now() - 86400000 * 1 },
        { name: 'Priya Thapa', relation: 'Sister', message: 'Happy birthday didi! You are the best sister anyone could ask for. Love you! 💕', time: Date.now() - 86400000 * 0.5 },
    ];

    function getWishes() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) return JSON.parse(data);
        } catch (e) {}
        return [];
    }

    function saveWishes(wishes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    }

    function renderWishes() {
        const grid = document.getElementById('wishes-grid');
        if (!grid) return;
        let wishes = getWishes();

        if (wishes.length === 0) {
            grid.innerHTML = `
                <div class="wishes-empty">
                    <span class="big-emoji">🎂</span>
                    <h3>No wishes yet!</h3>
                    <p>Be the first to wish Laxmi a happy birthday ✨</p>
                </div>
            `;
            return;
        }

        wishes.sort((a, b) => b.time - a.time);
        grid.innerHTML = wishes.map(w => {
            const initial = w.name.charAt(0).toUpperCase();
            const timeStr = new Date(w.time).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });
            return `
                <div class="wish-card">
                    <div class="wish-card-header">
                        <div class="wish-avatar">${initial}</div>
                        <div>
                            <div class="wish-name">${escapeHtml(w.name)}</div>
                            ${w.relation ? `<div class="wish-relation">${escapeHtml(w.relation)}</div>` : ''}
                        </div>
                    </div>
                    <p class="wish-message">${escapeHtml(w.message)}</p>
                    <div class="wish-time">💌 ${timeStr}</div>
                </div>
            `;
        }).join('');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Init wishes
    (function initWishes() {
        const existing = getWishes();
        if (existing.length === 0) {
            saveWishes(sampleWishes);
        }
        renderWishes();
    })();

    const wishesForm = document.getElementById('wishes-form');
    const wishesStatus = document.getElementById('wishes-status');
    if (wishesForm) {
        wishesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = wishesForm.querySelector('[name="wisher-name"]').value.trim();
            const relation = wishesForm.querySelector('[name="wisher-relation"]').value.trim();
            const message = wishesForm.querySelector('[name="wish-message"]').value.trim();

            if (!name || !message) return;

            const wishes = getWishes();
            wishes.push({ name, relation, message, time: Date.now() });
            saveWishes(wishes);
            renderWishes();
            wishesForm.reset();
            wishesStatus.textContent = '🎉 Your wish has been sent! Thank you! 💖';
            setTimeout(() => { wishesStatus.textContent = ''; }, 4000);
            burstConfetti(20);
        });
    }
})();