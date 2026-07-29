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

        lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
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

        new Swiper(slider, {
            speed: 900,
            slidesPerView: 'auto',
            spaceBetween: 70,
            centeredSlides: true,
            grabCursor: true,
            navigation: {
                prevEl: box.querySelector('.js-bend-prev'),
                nextEl: box.querySelector('.js-bend-next'),
            },
            pagination: {
                el: box.querySelector('.js-bend-pag'),
                type: 'custom',
                renderCustom(swiper, current, total) {
                    return `${current}/${total}`;
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

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initVideoAutoplay();
    initScheduleBox();
    initAnchors();
    initBendSliders();
    initReviewsSliders();
    initRotateBlocks();
});
