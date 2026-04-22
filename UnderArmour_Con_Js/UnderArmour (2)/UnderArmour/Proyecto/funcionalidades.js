document.addEventListener('DOMContentLoaded', () => {

    const heroImage = document.querySelector('.imagen-hero');
    if (heroImage) {
        const images = [
            './assets/imagenes/Hero.webp',
            './assets/imagenes/Banner F4.webp',
            './assets/imagenes/bannerF3.webp'
        ];
        let currentIndex = 0;
        heroImage.style.transition = 'opacity 0.8s ease-in-out';

        setInterval(() => {
            heroImage.style.opacity = 0;
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                heroImage.src = images[currentIndex];
                heroImage.style.opacity = 1;
            }, 800);
        }, 4500);
    }


    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, #e31837, #ff6b6b, #e31837);
        background-size: 200% 100%;
        z-index: 9999;
        transition: width 0.1s linear;
        animation: shimmer 2s infinite linear;
    `;
    document.body.prepend(progressBar);

    const shimmerStyle = document.createElement('style');
    shimmerStyle.textContent = `
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(50px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.85); }
            to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
            0%   { transform: scale(0.8); opacity: 1; }
            80%, 100% { transform: scale(2.4); opacity: 0; }
        }

        .encabezado-principal {
            transition: transform 0.4s cubic-bezier(.4,0,.2,1),
                        box-shadow 0.4s ease,
                        background-color 0.4s ease;
        }
        .navbar-hidden {
            transform: translateY(-100%);
        }
        .navbar-scrolled {
            background-color: rgba(15,15,15,0.95) !important;
            box-shadow: 0 4px 30px rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
        }

        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-scale {
            opacity: 0;
            transform: scale(0.88);
            transition: opacity 0.65s ease, transform 0.65s cubic-bezier(.34,1.56,.64,1);
        }
        .reveal-scale.visible {
            opacity: 1;
            transform: scale(1);
        }

        #ua-toast {
            position: fixed;
            bottom: 32px;
            right: 32px;
            background: #000;
            color: #fff;
            padding: 14px 24px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            font-family: 'Barlow', sans-serif;
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            transform: translateY(80px);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.4s ease;
            pointer-events: none;
        }
        #ua-toast.show {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        #ua-toast .toast-icon {
            font-size: 18px;
            color: #e31837;
        }

        #ua-cursor {
            width: 12px;
            height: 12px;
            background: #e31837;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 999999;
            transform: translate(-50%, -50%);
            transition: transform 0.08s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s;
            mix-blend-mode: difference;
        }
        #ua-cursor-ring {
            width: 38px;
            height: 38px;
            border: 2px solid rgba(227,24,55,0.6);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 999998;
            transform: translate(-50%, -50%);
            transition: left 0.15s ease, top 0.15s ease, width 0.3s ease, height 0.3s ease;
        }
        body:has(a:hover) #ua-cursor,
        body:has(button:hover) #ua-cursor {
            width: 20px;
            height: 20px;
        }

        #scroll-top-btn {
            position: fixed;
            bottom: 40px;
            left: 32px;
            width: 44px;
            height: 44px;
            background: #e31837;
            color: #fff;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9990;
            opacity: 0;
            transform: scale(0);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(.34,1.56,.64,1);
            box-shadow: 0 4px 20px rgba(227,24,55,0.4);
        }
        #scroll-top-btn.visible {
            opacity: 1;
            transform: scale(1);
        }
        #scroll-top-btn:hover {
            background: #c0142e;
            transform: scale(1.1);
        }

        .tarjeta-producto {
            transition: transform 0.35s cubic-bezier(.34,1.56,.64,1),
                        box-shadow 0.35s ease;
        }
        .tarjeta-producto:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.14);
        }
        .tarjeta-categoria {
            transition: transform 0.35s cubic-bezier(.34,1.56,.64,1);
        }
        .tarjeta-categoria:hover {
            transform: translateY(-4px);
        }
        .imagen-categoria {
            transition: transform 0.5s ease !important;
        }
        .tarjeta-categoria:hover .imagen-categoria {
            transform: scale(1.06) !important;
        }

        .imagen-hero {
            will-change: transform;
        }

        .ripple-effect {
            position: relative;
            overflow: hidden;
        }
        .ripple-effect .ripple-circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.35);
            transform: scale(0);
            animation: ripple-anim 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-anim {
            to { transform: scale(4); opacity: 0; }
        }

        .insignia-mas {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 28px;
            height: 28px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #000;
            opacity: 0;
            transform: scale(0.5);
            transition: opacity 0.3s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .tarjeta-producto:hover .insignia-mas {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(shimmerStyle);


    const hero = document.querySelector('.imagen-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            hero.style.transform = `translateY(${scrollY * 0.35}px)`;
        }, { passive: true });
    }


    const navbar = document.querySelector('.encabezado-principal');
    if (navbar) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 80) {
                navbar.classList.add('navbar-scrolled');
                if (currentScrollY > lastScrollY + 5) {
                    navbar.classList.add('navbar-hidden');
                } else if (currentScrollY < lastScrollY - 5) {
                    navbar.classList.remove('navbar-hidden');
                }
            } else {
                navbar.classList.remove('navbar-scrolled', 'navbar-hidden');
            }
            lastScrollY = currentScrollY;
        }, { passive: true });
    }


    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }, { passive: true });


    const addRevealClasses = () => {
        document.querySelectorAll('.tarjeta-producto').forEach((el, i) => {
            el.classList.add('reveal-scale');
            el.style.transitionDelay = `${i * 0.08}s`;
        });
        document.querySelectorAll('.tarjeta-categoria').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.1}s`;
        });
        document.querySelectorAll('.seccion-banner-promo, .banner3').forEach(el => {
            el.classList.add('reveal');
        });
        document.querySelectorAll('.BannersFinales .banner').forEach((el, i) => {
            el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
        });
        document.querySelectorAll('.footer-column').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.1}s`;
        });
    };
    addRevealClasses();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach(el => revealObserver.observe(el));


    const cursor = document.createElement('div');
    cursor.id = 'ua-cursor';
    const cursorRing = document.createElement('div');
    cursorRing.id = 'ua-cursor-ring';
    document.body.append(cursor, cursorRing);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .tarjeta-producto, .tarjeta-categoria').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorRing.style.width = '52px';
            cursorRing.style.height = '52px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursorRing.style.width = '38px';
            cursorRing.style.height = '38px';
        });
    });


    const toast = document.createElement('div');
    toast.id = 'ua-toast';
    toast.innerHTML = `<span class="toast-icon"><i class="fa-solid fa-bag-shopping"></i></span> Producto añadido al carrito`;
    document.body.appendChild(toast);

    let toastTimer = null;
    const showToast = () => {
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    };

    document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            createRipple(e, btn);
            showToast();

            const cartIcon = document.querySelector('.enlace-icono .fa-bag-shopping');
            if (cartIcon) {
                cartIcon.parentElement.style.animation = 'none';
                cartIcon.parentElement.offsetHeight;
                cartIcon.parentElement.style.animation = 'pulse-ring 0.5s ease';
                cartIcon.parentElement.style.color = '#e31837';
                setTimeout(() => cartIcon.parentElement.style.color = '', 800);
            }
        });
    });


    function createRipple(e, element) {
        const circle = document.createElement('span');
        circle.classList.add('ripple-circle');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width  = circle.style.height = size + 'px';
        circle.style.left   = (e.clientX - rect.left - size / 2) + 'px';
        circle.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
        element.classList.add('ripple-effect');
        element.appendChild(circle);
        setTimeout(() => circle.remove(), 700);
    }

    document.querySelectorAll('.btn-enviar, .flecha-carrusel').forEach(btn => {
        btn.addEventListener('click', (e) => createRipple(e, btn));
    });


    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    scrollTopBtn.title = 'Volver arriba';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    const searchInput = document.querySelector('.barra-busqueda input');
    if (searchInput) {
        searchInput.style.transition = 'width 0.4s cubic-bezier(.4,0,.2,1), border-bottom-color 0.3s';
        searchInput.addEventListener('focus', () => {
            searchInput.style.width = '320px';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.style.width = '250px';
        });
    }


    const barraPromo = document.querySelector('.barra-promo-superior');
    if (barraPromo) {
        barraPromo.style.transition = 'background-color 0.5s ease';
        barraPromo.addEventListener('mouseenter', () => {
            barraPromo.style.backgroundColor = '#111';
        });
        barraPromo.addEventListener('mouseleave', () => {
            barraPromo.style.backgroundColor = '';
        });
    }


    const lazyImages = document.querySelectorAll('img');
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.6s ease';
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                }, { once: true });
                if (img.complete) img.style.opacity = '1';
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));


    function animateCounter(el, target, duration = 1500) {
        let start = 0;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString('es-CO');
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }
});
