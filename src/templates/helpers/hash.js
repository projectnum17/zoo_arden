module.exports = function (options) {
  return options.hash;
};

// EXAMPLE (для хеширования -> сделать объект)

{
/*
  {{> _carousel
      label = 'Інтер’єр'
      thumbnails=(
          array
              (hash picture='./assets/images/c_5.jpg')
              (hash picture='./assets/images/c_6.jpg')
              (hash picture='./assets/images/c_7.jpg')
      )
      description = 1
      text = 'Ресторан готелю пропонує гостям страви європейської кухні, приготовані з місцевих продуктів. Нашими кухарями розроблені основне та дитяче меню. Крім того, завжди актуально сезонна пропозиція.'
  }}
*/
}