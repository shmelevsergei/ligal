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

  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    

    if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('sender.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert("Ошибка отправки данных");
        form.classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input); 
          error++;
        }
      } else if(input.classList.contains('_phone')) {
          if (phoneTest(input)) {
            formAddError(input); 
            error++;
          }
      } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input); 
        error++;
      } else {
        if (input.value === '') {
          formAddError(input); 
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  //Проверка Email 
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  //проверка телефона 
  function phoneTest(input) {
    return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
  }

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
