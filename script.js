/* ============================================
   PORTFOLIO SCRIPT
   ============================================ */

(function () {
    'use strict';

    // ===== MOBILE NAVIGATION =====
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
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            const link = document.querySelector('.nav-link[href*=' + sectionId + ']');
            if (!link) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // ===== HEADER SHADOW ON SCROLL =====
    const header = document.getElementById('header');

    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }

    window.addEventListener('scroll', scrollHeader);

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scroll-top');

    function scrollTop() {
        if (window.scrollY >= 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', scrollTop);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== REVEAL ANIMATION ON SCROLL =====
    const reveals = document.querySelectorAll('[data-reveal]');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('reveal');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');

            formStatus.textContent = 'Thank you, ' + name + '! Your message has been sent. ✨';
            formStatus.style.color = '#10b981';

            contactForm.reset();

            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    // ===== FOOTER YEAR =====
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ===== TYPING EFFECT FOR HERO TITLE =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titles = [
            'Computer Engineering Student',
            'Web Developer',
            'Problem Solver',
            'Tech Enthusiast'
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentTitle = titles[titleIndex];

            if (isDeleting) {
                heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }
})();
