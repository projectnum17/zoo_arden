module.exports = function () {
    return Array.from(arguments).slice(0, -1);
};



// EXAMPLE (билдер для передачи однотипным данных)

// {{> _procedures
//     title = 'Детальніше про найпопулярніші процедури'
//     slides=(
//         array
//             (hash
//                 picture= './assets/images/proc_5.png'
//                 title = 'грязьове обгортання'
//             )
//             (hash
//                 picture= './assets/images/proc_6.png'
//                 title = 'електрогрязелікування'
//             )
//             (hash
//                 picture= './assets/images/proc_7.png'
//                 title = 'Ароматичні ванни'
//             )
//             (hash
//                 picture= './assets/images/proc_8.png'
//                 title = 'Лікувальні душі'
//             )
//     )
// }}

{
    /* <section class="procedures">
    <div class="container">
        {{> _titleBuilder
            tagWrapper = 'h2'
            className = 'section-heading section-heading--mini'
            label = title
        }}
        {{> _proceduresSlider slides = slides}}
    </div>
</section> */
}

{
    /* <div class="procedures-slider">
    <div class="procedures-slider__show swiper js-procedures-slider">
        <div class="procedures-slider__wrapper swiper-wrapper">
            {{#each slides}}
            <div class="procedures-slider__slide swiper-slide">
                <div class="procedures-slider__box">
                    <div class="procedures-slider__pic">
                        <img loading="lazy" decoding="async" src="{{ picture }}" alt="Picture">
                    </div>
                    <p class="procedures-slider__title">{{ title }}</p>
                </div>
            </div>
            {{/each}}
        </div>
    </div>
    <div class="slider-progress js-procedures-progress"></div>
</div> */
}
