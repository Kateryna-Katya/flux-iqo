document.addEventListener('DOMContentLoaded', () => {
    // 0. Сразу инициализируем иконки
    const refreshIcons = () => window.lucide && window.lucide.createIcons();
    refreshIcons();

    // 1. Проверка библиотек
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP/ScrollTrigger не найден.");
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // 2. ФУНКЦИЯ СКРЫТИЯ (Вместо CSS)
    // Мы скрываем элементы через JS, чтобы не было "вечной невидимости"
    const hideForAnimation = () => {
        gsap.set('.innovation-item, .tech-card, .blog-card, .benefit-card', { 
            opacity: 0, 
            y: 30 
        });
    };
    hideForAnimation();

    // 3. HERO СЕКЦИЯ (С фиксом разрыва слов)
    const initHero = () => {
        const title = document.querySelector('.hero__title');
        if (!title) return;

        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

        if (typeof SplitType !== 'undefined') {
            // Инициализация SplitType
            const text = new SplitType(title, { types: 'words, chars' });
            
            // Скрываем заголовок перед анимацией
            gsap.set(text.chars, { opacity: 0, y: 50 });

            tl.to(text.chars, { 
                y: 0, 
                opacity: 1, 
                stagger: 0.02, 
                rotateX: 0 
            })
            .from('.hero__tag', { y: 20, opacity: 0 }, 0.2)
            .from('.hero__description', { y: 20, opacity: 0 }, 0.4)
            .from('.hero__actions', { y: 20, opacity: 0 }, 0.6)
            .from('.hero__visual', { scale: 0.9, opacity: 0 }, 0.5);
        } else {
            // Запасной вариант без SplitType
            tl.from(title, { y: 30, opacity: 0 });
        }
    };
    initHero();

    // 4. УНИВЕРСАЛЬНАЯ ПОДГРУЗКА ДЛЯ ВСЕХ СЕКЦИЙ
    const setupScrollAnims = () => {
        // AI Решения (Списки и карточки)
        const innovItems = document.querySelectorAll('.innovation-item');
        if (innovItems.length > 0) {
            gsap.to(innovItems, {
                scrollTrigger: {
                    trigger: '.innovations',
                    start: 'top 85%',
                },
                x: 0,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                onComplete: refreshIcons
            });
        }

        const techCards = document.querySelectorAll('.tech-card');
        if (techCards.length > 0) {
            gsap.to(techCards, {
                scrollTrigger: {
                    trigger: '.innovations__visual',
                    start: 'top 75%',
                },
                scale: 1,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: 'back.out(1.7)'
            });
        }

        // Блог (Инсайты)
        const blogCards = document.querySelectorAll('.blog-card');
        if (blogCards.length > 0) {
            gsap.to(blogCards, {
                scrollTrigger: {
                    trigger: '.blog__grid',
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.8
            });
        }
        
        // Преимущества
        const benefitCards = document.querySelectorAll('.benefit-card');
        if (benefitCards.length > 0) {
            gsap.to(benefitCards, {
                scrollTrigger: {
                    trigger: '.benefits__grid',
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8
            });
        }
    };
    setupScrollAnims();

    // 5. ЛОГИКА МЕНЮ
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 6. ПАВАНИЕ КАРТОЧЕК (Постоянное)
    gsap.to('.tech-card', {
        y: "-=15",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: "random" }
    });
});