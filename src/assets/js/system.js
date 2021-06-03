
$(document).ready(function () {



  $('.carousel').slick({
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    centerMode: false,
    arrows: false,


  });
  // ==================================================================
  $('.recentcolumns').slick({

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    centerMode: false,
    arrows: true,
  });

  // ==================================================================
  $('.ourreviews').slick({
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    centerMode: false,
    arrows: true,
  });
  // ==================================================================
  $('.youAlsoLike').slick({
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: false,
    centerMode: false,
    arrows: true,
  });
  // ==================================================================

  $('.brandlogos').slick({
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    prevArrow: false,
    nextArrow: false
  });

});