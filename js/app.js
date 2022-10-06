$(document).ready(function(){
  $('.reviews__carusel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplaySpeed: 0,
    responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 541,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  });

  $('.carusel-progress').each(function(i, el) {
    var sliderId = $(el).data('slider'),
        $slider = $('#' + sliderId),
        $progressInput = $(el).find('.carusel-progress__input');
    
    $progressInput.attr('max', $slider[0].slick.slideCount - 1)
    
    $slider.on('afterChange', function(event, slick, currentSlide){
      $progressInput.val(currentSlide);
      console.log(currentSlide)
    });
    
    $($progressInput).mousedown(function() {
      $slider.slick('slickPause')
    });
  
    $($progressInput).mouseup(function() {
      $slider.slick('slickPlay')
    })
    
    $($progressInput).on('input', function() {
      $slider.slick('slickGoTo', $(this).val());
    })
  });


  $('a[href*="#"]').on('click', function() {
    $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
    return false;
  });

});

'use strict'
document.addEventListener('DOMContentLoaded', () => {


    //Form 

    const form = document.querySelector('.form__body');
    const telSelector = form.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    const validation = new JustValidate('.form__body');

validation
  .addField('.input-name', [
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя!'
    }
  ])
  .addField('.input-mail', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Email обязателен',
    },
    {
      rule: 'email',
      value: true,
      errorMessage: 'Введите корректный Email',
    },
  ])
  .addField('.input-tel', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Телефон обязателен',
    },
    {
      rule: 'function',
      validator: function() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'sender.php', true);
    xhr.send(formData);

    event.target.reset();
  });

  // Accordion
  const accordions = document.querySelectorAll('.accordion-questions__item');


  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const control = self.querySelector('.accordion-questions__header');
      const content = self.querySelector('.accordion-questions__text');
      
      self.classList.toggle('open');

      if (self.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  const btnUp = {
  el: document.querySelector('.btn-fixed'),
  show() {
    if (window.innerWidth < 768) {
      // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('btn-call_hide');
    }
    
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('btn-call_hide');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 400 ? this.show() : this.hide();
    });
  }
}

btnUp.addEventListener();
});
