// Burger handler

$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('.body').toggleClass('lock');
    });
    $('.header__menu').click(function () {
        $('.header__burger, .header__menu').removeClass('active');
        $('body').removeClass('lock');

    });
});

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight = document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());




var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 5,
    loop: true,
    breakpoints: {
        992: {
            slidesPerView: 4,
        },
        786: {
            slidesPerView: 3,
        },
        450: {
            slidesPerView: 2,
        },
        200: {
            slidesPerView: 1,
            slidesOffsetAfter: 50,
            navigation: {
                nextEl: ".button-next"
            }
        },
    }
});


var isScrolling = false;
 
window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function() {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

var listItems = document.querySelectorAll("#mainContent ol li");
var firstBox = document.querySelector("#firstBox");
var secondBox = document.querySelector("#secondBox");

function scrolling(e) {

  if (isPartiallyVisible(firstBox)) {
    firstBox.classList.add("active");

    document.body.classList.add("colorOne");
    document.body.classList.remove("colorTwo");
  } else {
    document.body.classList.remove("colorOne");
    document.body.classList.remove("colorTwo");
  }

  if (isFullyVisible(secondBox)) {
    secondBox.classList.add("active");

    document.body.classList.add("colorTwo");
    document.body.classList.remove("colorOne");
  }

  for (var i = 0; i < listItems.length; i++) {
    var listItem = listItems[i];

    if (isPartiallyVisible(listItem)) {
      listItem.classList.add("active");
    } else {
      listItem.classList.remove("active");
    }
  }
}

function isPartiallyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();

  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  var height = elementBoundary.height;

  return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

function isFullyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();

  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;

  return ((top >= 0) && (bottom <= window.innerHeight));
}

