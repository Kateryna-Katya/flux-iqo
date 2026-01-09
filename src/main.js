document.addEventListener('DOMContentLoaded', () => {
    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
    lucide.createIcons();

    // 2. РЕГИСТРАЦИЯ GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 3. МОБИЛЬНОЕ МЕНЮ
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    burger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) toggleMenu();
        });
    });

    // 4. HERO АНИМАЦИЯ (GSAP + SplitType)
    const initHero = () => {
        const splitTitle = new SplitType('.hero__title', { types: 'words, chars' });
        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

        tl.from('.hero__tag', { y: 20, opacity: 0 })
          .from(splitTitle.chars, { y: 100, opacity: 0, stagger: 0.02, rotateX: -90 }, '-=0.6')
          .from('.hero__description', { y: 30, opacity: 0 }, '-=1.1')
          .from('.hero__actions', { y: 20, opacity: 0 }, '-=0.8')
          .from('.hero__visual', { scale: 0.9, opacity: 0 }, '-=1.2');
    };
    initHero();

    // 5. СКРОЛЛ-АНИМАЦИИ (About, Benefits, Blog)
    const scrollAnims = () => {
        // Описание (About)
        gsap.from('.about__header, .about-card', {
            scrollTrigger: { trigger: '.about', start: 'top 70%' },
            y: 50, opacity: 0, stagger: 0.2, duration: 1
        });

        // Преимущества (Benefits)
        gsap.from('.benefit-card', {
            scrollTrigger: { trigger: '.benefits__grid', start: 'top 80%' },
            y: 60, opacity: 0, stagger: 0.15, duration: 0.8
        });

        // Инновации (Innovations)
        gsap.from('.tech-card', {
            scrollTrigger: { trigger: '.innovations', start: 'top 60%' },
            scale: 0.8, opacity: 0, stagger: 0.2, ease: 'back.out(1.7)'
        });
        
        // Floating effect for tech cards
        gsap.to('.tech-card', { 
            y: 15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', 
            stagger: { each: 0.5, from: "random" } 
        });

        // Блог (Blog)
        gsap.from('.blog-card', {
            scrollTrigger: { trigger: '.blog__grid', start: 'top 80%' },
            y: 40, opacity: 0, stagger: 0.2, duration: 0.8
        });
    };
    scrollAnims();

    // 6. ФОРМА КОНТАКТОВ
    const form = document.getElementById('contact-form');
    if (form) {
        const phoneInput = document.getElementById('phone');
        const captchaLabel = document.getElementById('captcha-question');
        const successMessage = document.getElementById('form-success');

        // Капча
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        const result = n1 + n2;
        if (captchaLabel) captchaLabel.textContent = `${n1} + ${n2}`;

        // Только цифры в телефоне
        phoneInput.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/[^\d+]/g, ''); });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const answer = parseInt(document.getElementById('captcha-answer').value);
            if (answer !== result) {
                alert('Неправильный ответ капчи');
                return;
            }

            const btn = form.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = 'Отправка...';

            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.add('active');
                gsap.from(successMessage, { opacity: 0, y: 20, duration: 0.5 });
            }, 1500);
        });
    }

    // 7. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    if (!localStorage.getItem('flux_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    cookieBtn.addEventListener('click', () => {
        localStorage.setItem('flux_cookies_accepted', 'true');
        cookiePopup.classList.remove('active');
    });

    // 8. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ХЕДЕРА
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.style.boxShadow = window.scrollY > 50 ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none';
        header.style.background = window.scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)';
    });
});