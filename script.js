document.addEventListener('DOMContentLoaded', () => {
    // Top removed: Custom Cursor logic

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent body scrolling when menu is open
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- Smooth Scroll for Anchor Links (Backup for Safari/older browsers) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Day Card Scroll Dots ---
    const dayCards = document.getElementById('dayCards');
    const scrollDots = document.querySelectorAll('.scroll-dot');

    if (dayCards && scrollDots.length) {
        // Click dot → scroll to card
        scrollDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.dataset.index);
                const cards = dayCards.querySelectorAll('.day-card');
                if (cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                }
            });
        });

        // Scroll → update active dot
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = Array.from(dayCards.querySelectorAll('.day-card'));
                    const idx = cards.indexOf(entry.target);
                    scrollDots.forEach((d, i) => d.classList.toggle('active', i === idx));
                }
            });
        }, { root: dayCards, threshold: 0.6 });

        dayCards.querySelectorAll('.day-card').forEach(card => cardObserver.observe(card));
    }
});
