import $ from "jquery";

import "foundation-sites";
import "slick-carousel";
window.$ = $;
$(function () {
  $(document).foundation();

  var $slider = $("#11723_carousel");

  $slider.slick({
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    dots: false,
    fade: false,
    infinite: true,
    vertical: false,
    verticalSwiping: false,
  });

  // mini-cart
  $(".toggle-cart").on("click", function () {
    $(".off-canvas.position-right").foundation("toggle");
  });

  $(".product-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 3,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $("#recent-slider").slick({
    speed: 300,
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  var $responsiveImages = $slider.find("img[data-responsive-images]");
  if ($responsiveImages.length) {
    $slider.hide();
    $responsiveImages.each(function () {
      $(this).attr("data-interchange", $(this).data("responsiveImages"));
    });
    $slider.foundation().show().resize();
  }

  //checkout

  $(document).on("change", "input[name=shippingOption][value=Store]", function () {
    $(".reveal-overlay").show();
  });

  $(document).on("click", ".reveal-overlay .close-button", function () {
    $(".reveal-overlay").hide();
  });
});
