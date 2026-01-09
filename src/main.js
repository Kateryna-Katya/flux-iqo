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
});