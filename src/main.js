document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Mobile Menu
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Анимация бургер-иконки
        if(burger.classList.contains('active')) {
            burger.style.setProperty('--tw-bg-opacity', '1');
        }
    });

    // Смена цвета хедера при скролле
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    lucide.createIcons();

    // --- GSAP + SplitType Hero Animation ---

    // 1. Разбиваем текст на слова и символы
    const splitTitle = new SplitType('.hero__title', { types: 'words, chars' });

    // 2. Создаем Timeline для последовательной анимации
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.from('.hero__tag', {
        y: 20,
        opacity: 0,
        duration: 0.8
    })
    .from(splitTitle.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.02, // Задержка между появлением символов
        rotateX: -90, // Эффект вращения
        transformOrigin: '0% 50% -50',
    }, '-=0.6') // Запускаем раньше, чем закончится предыдущая анимация
    .from('.hero__description', {
        y: 30,
        opacity: 0,
        duration: 1
    }, '-=1')
    .from('.hero__actions', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, '-=0.8')
    .from('.hero__visual', {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.2)'
    }, '-=1.2'); // Визуал появляется параллельно с текстом

    // Очистка стилей SplitType после анимации (для доступности и ресайза)
    tl.call(() => {
        splitTitle.revert();
    });
    // В самое начало script.js (если еще не добавили)
gsap.registerPlugin(ScrollTrigger);

// Добавьте этот код внутрь обработчика DOMContentLoaded
const aboutAnimation = () => {
    // Анимация заголовка и текста
    gsap.from('.about__header, .about__main-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Поэтапное появление карточек
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
};

    aboutAnimation();
    const benefitsAnimation = () => {
    // Анимация верхней части
    gsap.from('.benefits__top', {
        scrollTrigger: {
            trigger: '.benefits',
            start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Анимация карточек по очереди (stagger)
    gsap.from('.benefit-card', {
        scrollTrigger: {
            trigger: '.benefits__grid',
            start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });
};

    benefitsAnimation();
    const innovationsAnimation = () => {
    // Появление текста
    gsap.from('.innovations__info', {
        scrollTrigger: {
            trigger: '.innovations',
            start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Анимация появления карточек стека
    gsap.from('.tech-card', {
        scrollTrigger: {
            trigger: '.innovations__visual',
            start: 'top 60%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Эффект парения (Floating)
    gsap.to('.tech-card--1', { y: 15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.tech-card--2', { y: -20, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
    gsap.to('.tech-card--3', { y: 10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    gsap.to('.tech-card--4', { y: -15, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 });
};

    innovationsAnimation();
    const blogAnimation = () => {
    gsap.from('.blog-card', {
        scrollTrigger: {
            trigger: '.blog__grid',
            start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
};

    blogAnimation();
    const formLogic = () => {
    const form = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    const captchaLabel = document.getElementById('captcha-question');
    const successMessage = document.getElementById('form-success');

    // 1. Генерация капчи
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    if(captchaLabel) captchaLabel.textContent = `${num1} + ${num2}`;

    // 2. Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d+]/g, '');
    });

    // 3. Обработка отправки
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userAnswer = parseInt(document.getElementById('captcha-answer').value);

        if (userAnswer !== correctAnswer) {
            alert('Ошибка в капче. Попробуйте снова.');
            return;
        }

        // Имитация AJAX
        const submitBtn = form.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Отправка...';

        setTimeout(() => {
            form.style.display = 'none';
            successMessage.classList.add('active');
            
            // GSAP анимация успеха
            gsap.from(successMessage, { opacity: 0, scale: 0.9, duration: 0.5 });
        }, 1500);
    });
};

formLogic();

// GSAP анимация секции
gsap.from('.contact__info', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%',
    },
    x: -30,
    opacity: 0,
    duration: 1
});

gsap.from('.contact__form-wrapper', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%',
    },
    x: 30,
    opacity: 0,
    duration: 1
});
});