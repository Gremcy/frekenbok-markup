// eslint-disable-next-line max-classes-per-file
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import $, { Callbacks } from 'jquery';
import 'slick-carousel';

function fixHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

$(document).ready(() => {
  fixHeight();

  window.addEventListener('resize', () => {
    fixHeight();
  });

  $.fn.modalOpen = function () {
    $('.js-modal').modalCloseAll();
    $('body').addClass('is-hidden');
    $(this).fadeIn(1);
    $(this).addClass('is-open');

    // hotfix for zoomer inside modal
    window.PinchZoomer.remove();
    $('.controlHolder').remove();
    window.PinchZoomer.init();
    return this;
  };

  $.fn.modalClose = function () {
    $(this).fadeOut(1);
    $(this).removeClass('is-open');
    $('body').removeClass('is-hidden');
    return this;
  };

  $.fn.modalCloseAll = function () {
    $('.js-modal').modalClose();
    return this;
  };

  $(document).on('click', '.js-close-modal', () => {
    $('.js-modal').modalCloseAll();
  });

  $(document).on('click', '.js-modal-link', (e) => {
    const target = $(e.currentTarget).attr('data-target');
    const $modal = $(`.js-modal[data-modal="${target}"]`);

    if ($modal.length) {
      $modal.modalOpen();
    }
  });

  $(document).on('click', '.header-burger', () => {
    $('.menu-wrapper').addClass('show');
    $('.menu-overlay').addClass('show');
    $('html').addClass('is-hidden');
  });

  $(document).on('click', '.js-menu-close, .menu-overlay', () => {
    $('.menu-wrapper').removeClass('show');
    $('.menu-overlay').removeClass('show');
    $('html').removeClass('is-hidden');
  });

  if ($('.home-table-mob-slider').length > 0) {
    $('.home-table-mob-slider').slick({
      slidesToShow: 1,
      arrows: true,
      dots: false,
      infinite: true,
      autoplay: false,
      slidesToScroll: 1,
      mobileFirst: true,
      prevArrow: $('.home-table-mob-slider-arrows .slick-prev'),
      nextArrow: $('.home-table-mob-slider-arrows .slick-next'),
      responsive: [
        {
          breakpoint: 767,
          settings: 'unslick',
        },
      ],
    });
  }
});
