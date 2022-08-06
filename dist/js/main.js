"use strict";

jQuery(document).ready(function () {
  loading();
  addHeaderClass();
  onscrollHeadFollow();
  menuOpen();
  resClassRemove();
  indicator();
  scrollAnimation();
});
/**
 * ローディングアニメーション
 */

function loading() {
  if (sessionStorage.getItem('access')) {
    console.log('2回以上のアクセスです');
    jQuery(".splash").addClass('hide');
  } else {
    sessionStorage.setItem('access', 0);
    console.log('初回アクセスです');
    jQuery(".splash").delay(1700).fadeOut('slow'); //ローディング画面を1.5秒（1500ms）待機してからフェードアウト

    jQuery(".splash__logo").delay(1300).fadeOut('slow'); //ロゴを1.2秒（1200ms）待機してからフェードアウト
  } // jQuery(window).on('load',function(){
  // });

}
/**
 * ヘッダー
 */


function addHeaderClass() {
  var path_url = location.href.split('/'); // console.log(path_url);

  if (path_url[4]) {
    jQuery('header').addClass('header standby fixed js-header');
  } else {
    jQuery('header').addClass('header js-fix-header js-header');
  }
}
/**
 * スクロールに応じたヘッダー固定切り替え
 */


function onscrollHeadFollow() {
  var $header = jQuery('.js-fix-header');
  var headerH = $header.outerHeight();
  var overplus = jQuery(window).outerWidth() * 0.1;
  jQuery(window).on('scroll', function () {
    if (jQuery(window).scrollTop() > headerH + overplus) {
      // 固定ヘッダー時
      $header.css({
        'transition': 'transform .5s ease-out'
      });
      $header.addClass('standby').addClass('fixed');
    } else if (jQuery(window).scrollTop() > headerH) {
      // 固定ヘッダー準備時
      if ($header.hasClass('standby')) {
        $header.css({
          'transition': 'transform .5s ease-out'
        });
      } else {
        $header.css({
          'transition': ''
        });
      }

      $header.addClass('standby').removeClass('fixed');
    } else {
      // 通常時
      $header.css({
        'transition': ''
      });
      $header.removeClass('standby fixed');
    }
  });
}
/**
 * ドロワーメニュー
 */


function menuOpen() {
  var humberger = jQuery('.humberger');
  var spNavi = jQuery('.gloval-navi');
  var body = jQuery('body');
  humberger.on('click', function () {
    humberger.toggleClass('menu-active');
    humberger.toggleClass('fixed');
    spNavi.toggleClass('open');
    body.toggleClass('fixed');
  });
}

function resClassRemove() {
  jQuery(window).on('load resize', function () {
    var w = jQuery(window).width();

    if (w <= 768) {
      jQuery('.menu').find('.button__color_orange').removeClass('button__color_orange');
    }
  });
}
/**
 * ヘッダーページインジケーター
 */


function indicator() {
  jQuery('.nav-link').each(function () {
    var target = jQuery(this).attr('href');

    if (location.href.match(target)) {
      jQuery(this).addClass('current');
    }
  });
}
/**
 * メインビジュアルクロスフェードアニメーション
 */


var elInner, duration, defaultIndex, _switchImage;

elInner = document.getElementsByClassName('main-visual__image');
duration = 5000;
defaultIndex = 0;

_switchImage = function switchImage(next) {
  var current = next ? next - 1 : elInner.length - 1;
  elInner[current].classList.remove('is-visible');
  elInner[next].classList.add('is-visible');
  next = ++next < elInner.length ? next : 0;
  setTimeout(_switchImage.bind(this, next), duration);
};

window.onload = _switchImage.bind(void 0, defaultIndex);
/**
 * スクロールアニメーション
 */

var scrollTrigger = document.querySelectorAll('.scrollTrigger');

function scrollAnimation() {
  scrollTrigger.forEach(function (item) {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom-=15%',
        end: 'center center',
        markers: true,
        onEnter: function onEnter() {
          item.classList.add('scroll-on');
        }
      }
    });
  });
}