document.addEventListener('DOMContentLoaded', () => {
    // 0. ИНИЦИАЛИЗАЦИЯ ИКОНОК
    const refreshIcons = () => window.lucide && window.lucide.createIcons();
    refreshIcons();

    // 1. МОБИЛЬНОЕ МЕНЮ
    const initMenu = () => {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('nav');
        if (!burger || !nav) return;

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие при клике на ссылки
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    };

    // 2. COOKIE POPUP
    const initCookies = () => {
        const popup = document.getElementById('cookie-popup');
        const acceptBtn = document.getElementById('cookie-accept');
        
        if (!popup || !acceptBtn) return;

        // Показываем, если еще не принимали
        if (!localStorage.getItem('flux_cookies_accepted')) {
            setTimeout(() => popup.classList.add('active'), 2000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('flux_cookies_accepted', 'true');
            popup.classList.remove('active');
        });
    };

    // 3. КАПЧА И ФОРМА (БЕЗОПАСНАЯ ВЕРСИЯ)
    const initForm = () => {
        const form = document.getElementById('contact-form');
        let correctAnswer = 0;

        const genCaptcha = () => {
            const q = document.getElementById('captcha-question');
            if (!q) return;
            const n1 = Math.floor(Math.random() * 10) + 1;
            const n2 = Math.floor(Math.random() * 10) + 1;
            correctAnswer = n1 + n2;
            q.textContent = `${n1} + ${n2}`;
        };

        if (form) {
            genCaptcha();
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const userAns = parseInt(document.getElementById('captcha-answer').value);
                
                if (userAns !== correctAnswer) {
                    alert('Неверная капча!');
                    genCaptcha();
                    return;
                }

                // Ищем кнопку внутри формы (безопасно)
                const btn = this.querySelector('button[type="submit"]');
                if (btn) {
                    btn.disabled = true;
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Отправка...';
                }

                setTimeout(() => {
                    this.innerHTML = `<div style="text-align:center; padding:30px;"><h3>Успешно!</h3><p>Мы свяжемся с вами.</p></div>`;
                }, 1500);
            });
        }
    };

    // 4. GSAP И ПОДГРУЗКА ЭЛЕМЕНТОВ
    const initAnimations = () => {
        if (typeof gsap === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        // Фикс разрыва слов в Hero
        const h1 = document.querySelector('.hero__title');
        if (h1 && typeof SplitType !== 'undefined') {
            const text = new SplitType(h1, { types: 'words, chars' });
            gsap.from(text.chars, { opacity: 0, y: 30, stagger: 0.02, duration: 1 });
        }

        // Подгрузка глубинных элементов (теперь они точно появятся)
        const reveal = (targets, trigger) => {
            if (document.querySelector(targets)) {
                gsap.from(targets, {
                    scrollTrigger: { trigger: trigger, start: "top 85%" },
                    y: 40, opacity: 0, stagger: 0.15, duration: 1,
                    onComplete: refreshIcons
                });
            }
        };

        reveal('.innovation-item', '.innovations');
        reveal('.tech-card', '.innovations__visual');
        reveal('.blog-card', '.blog__grid');
        reveal('.benefit-card', '.benefits__grid');
    };

    // ЗАПУСК ВСЕХ МОДУЛЕЙ
    initMenu();
    initCookies();
    initForm();
    initAnimations();
});