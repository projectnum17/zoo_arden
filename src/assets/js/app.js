'use strict';

const initVideoAutoplay = () => {
    const lazyVideos = Array.from(document.querySelectorAll('.js-video-bg'));

    if (!lazyVideos.length) return;

    const loadAndPlayVideo = (video) => {
        const sources = video.querySelectorAll('source[data-src]');
        sources.forEach((source) => {
            source.src = source.dataset.src;
        });

        video.load();

        video.play().catch((e) => {
            console.warn('Video autoplay failed:', e);
        });

        video.classList.remove('lazyVideo');
    };

    if ('IntersectionObserver' in window) {
        const lazyVideoObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        loadAndPlayVideo(video);
                        observer.unobserve(video);
                    }
                });
            },
        );

        lazyVideos.forEach((video) => {
            lazyVideoObserver.observe(video);
        });
    } else {
        lazyVideos.forEach(loadAndPlayVideo);
    }
};

const initScheduleBox = () => {
    const box = document.querySelector('.js-schedule-box');
    if (!box) return;

    const closeBox = box.querySelector('.js-schedule-close');

    const timeoutId = setTimeout(() => {
        box.classList.add('is-show');
    }, 2000);

    closeBox?.addEventListener('click', (e) => {
        e.stopPropagation();

        clearTimeout(timeoutId);

        box.addEventListener(
            'transitionend',
            () => {
                box.remove();
            },
            { once: true },
        );

        box.classList.remove('is-show');
    });
};

const initAnchors = () => {
    const anchors = document.querySelectorAll('.js-to-top');
    if (!anchors.length) return;

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.scrollIntoView({
                block: 'start',
                inline: 'nearest',
                behavior: 'smooth',
            });
        });
    });
};

const initHeader = () => {
    const header = document.querySelector('.js-header');
    if (!header) return;

    let lastScroll = 0;
    let scrollWay = 200;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        currentScroll > 10
            ? header.classList.add('is-colored')
            : header.classList.remove('is-colored');

        currentScroll > scrollWay && currentScroll > lastScroll
            ? header.classList.add('is-transform')
            : header.classList.remove('is-transform');

        document.documentElement.style.scrollPaddingTop =
            header.classList.contains('is-transform') ? '0px' : '50px';

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const initAsideMenu = () => {
        const screenWidth = window.innerWidth > 991.98;
        if (screenWidth) return;

        const menuTrigger = header.querySelector('.js-menu-trigger');
        const asideMenu = document.querySelector('.js-aside-menu');
        if (!asideMenu || !menuTrigger) return;

        const anchors = document.querySelectorAll('.js-nav-block a');
        if (!anchors.length) return;

        const openState = () => {
            menuTrigger.classList.add('is-active');
            asideMenu.classList.add('is-open');
            document.body.classList.add('is-locked');
        };

        const closeState = () => {
            menuTrigger.classList.remove('is-active');
            asideMenu.classList.remove('is-open');
            document.body.classList.remove('is-locked');
        };

        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();

            asideMenu.classList.contains('is-open')
                ? closeState()
                : openState();
        });

        asideMenu.addEventListener('click', (e) => {
            if (e.target === asideMenu) closeState();
        });

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                closeState();
            });
        });

        window.addEventListener('resize', closeState);
    };

    initAsideMenu();
};

const initRotateBlocks = () => {
    const blocks = document.querySelectorAll('.js-rotate-card');
    if (!blocks.length) return;

    const multiplier = {
        translate: 0.2,
        rotate: 0.01,
    };

    const calculators = [];

    blocks.forEach((box) => {
        calculators.push(() => {
            const rect = box.getBoundingClientRect();
            const r = window.innerWidth * 0.5 - (rect.x + rect.width * 0.5);

            let ty =
                Math.abs(r) * multiplier.translate -
                rect.width * multiplier.translate;

            if (ty < 0) ty = 0;

            box.style.transform = `translateY(${ty}px) rotate(${
                -r * multiplier.rotate
            }deg)`;

            box.style.transformOrigin = r < 0 ? 'left top' : 'right top';
        });
    });

    const raf = () => {
        calculators.forEach((calculate) => calculate());
        requestAnimationFrame(raf);
    };

    raf();
};
const initBendSliders = () => {
    if (typeof Swiper === 'undefined') return;
    const sliderBoxes = document.querySelectorAll('.js-bend-slider');
    if (!sliderBoxes.length) return;

    sliderBoxes.forEach((box) => {
        const slider = box.querySelector('.swiper');
        const wrapper = box.querySelector('.swiper-wrapper');
        if (!wrapper) return;

        const slides = wrapper.querySelectorAll('.swiper-slide');
        const minSlidesRequired = 8;

        if (slides.length > 0 && slides.length < minSlidesRequired) {
            const initialCount = slides.length;
            let currentCount = initialCount;

            while (currentCount < minSlidesRequired) {
                slides.forEach((slide) => {
                    const clone = slide.cloneNode(true);
                    wrapper.appendChild(clone);
                });
                currentCount += initialCount;
            }
        }

        new Swiper(slider, {
            speed: 900,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 6,
            spaceBetween: 30,
            grabCursor: true,
            observer: true,
            observeParents: true,

            navigation: {
                prevEl: box.querySelector('.js-bend-prev'),
                nextEl: box.querySelector('.js-bend-next'),
            },
            pagination: {
                el: box.querySelector('.js-bend-pag'),
                type: 'custom',
                renderCustom(swiper) {
                    const realTotal = slides.length;
                    const realCurrent = (swiper.realIndex % realTotal) + 1;
                    return `${realCurrent}/${realTotal}`;
                },
            },
            breakpoints: {
                768: {
                    spaceBetween: 70,
                },
            },
        });
    });
};

const initReviewsSliders = () => {
    if (typeof Swiper === 'undefined') return;
    const sliderBoxes = document.querySelectorAll('.js-reviews-slider');
    if (!sliderBoxes.length) return;

    sliderBoxes.forEach((box) => {
        const slider = box.querySelector('.swiper');
        new Swiper(slider, {
            speed: 900,
            spaceBetween: 12,
            slidesPerView: 1,
            pagination: {
                el: box.querySelector('.js-reviews-pag'),
                clickable: true,
            },
        });
    });
};

const initCopyInfo = () => {
    const copyBtn = document.querySelector('.js-copy-trigger');
    const copyList = document.querySelector('.js-copy-list');

    if (!copyBtn || !copyList) return;

    let timeoutId = null;

    copyBtn.addEventListener('click', async () => {
        const textToCopy = Array.from(copyList.querySelectorAll('[data-copy]'))
            .map((item) => item.dataset.copy.trim())
            .filter(Boolean)
            .join('\n');

        if (timeoutId) clearTimeout(timeoutId);
        copyBtn.classList.remove('is-copied', 'is-error');

        try {
            await navigator.clipboard.writeText(textToCopy);

            copyBtn.classList.add('is-copied');

            timeoutId = setTimeout(() => {
                copyBtn.classList.remove('is-copied');
            }, 2000);
        } catch (err) {
            console.error('Ошибка копирования:', err);

            copyBtn.classList.add('is-error');

            timeoutId = setTimeout(() => {
                copyBtn.classList.remove('is-error');
            }, 2000);
        }
    });
};

const initStickyCTA = () => {
    const hero = document.querySelector('.js-hero');
    const cta = document.querySelector('.js-sticky-box');

    if (!hero || !cta) return;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        cta.classList.toggle('is-visible', currentScroll > 70);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
};

const initFancyBoxes = () => {
    const boxes = document.querySelectorAll('.js-season-card');
    if (!boxes.length) return;
    boxes.forEach((card) => {
        card.addEventListener('click', () => {
            const images = JSON.parse(card.dataset.images);

            Fancybox.show(
                images.map((src) => ({
                    src,
                    type: 'image',
                })),
                {
                    Images: {
                        initialSize: 'fit',
                    },
                },
            );
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initVideoAutoplay();
    initScheduleBox();
    initAnchors();
    initBendSliders();
    initReviewsSliders();
    initRotateBlocks();
    initCopyInfo();
    initStickyCTA();
    initFancyBoxes();
});
