jQuery(document).ready(function(){
  loading();
  indicator();
  menuOpen();
  crossfade();
  anchor()
  swiper();
  tab();
});
/**
 * ローディングアニメーション
 */
function loading(){
  if(sessionStorage.getItem('access')){
    console.log('2回以上のアクセスです');
    jQuery(".splash").addClass('hide');
  }
  else{
    sessionStorage.setItem('access',0);
    console.log('初回アクセスです');
    jQuery(".splash").delay(1700).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    jQuery(".splash__logo").delay(1300).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
  }
}
/**
 * ヘッダーページインジケーター
 */
 function indicator(){
  jQuery('.nav-link').each(function(){
    let target = jQuery(this).attr('href');
    if(location.href.match(target)){
        jQuery(this).addClass('current');
    }
  });
}
/**
 * ドロワーメニュー
 */
 function menuOpen(){
  let humberger = jQuery('.humberger');
  let spNavi = jQuery('.gloval-navi');
  // let body = jQuery('body');
  humberger.on('click', function(){
    humberger.toggleClass('menu-active');
    humberger.toggleClass('fixed');
    spNavi.toggleClass('open');
    // body.toggleClass('fixed');
  });
}
function resClassRemove(){
  jQuery(window).on('load resize', function(){
    let w = jQuery(window).width();
    if(w <= 768){
      jQuery('.menu').find('.button__color_orange').removeClass('button__color_orange');
    }
  });
}
/**
 * メインビジュアルクロスフェードアニメーション
 */
function crossfade(){
  if(jQuery('.main-visual__image')){
    let elInner, duration, defaultIndex, switchImage;
    elInner = document.getElementsByClassName('main-visual__image');
    duration = 5000;
    defaultIndex = 0;
    switchImage = function(next){
        let current = next ? (next -1) : elInner.length -1;
        elInner[current].classList.remove('is-visible');
        elInner[next].classList.add('is-visible');
        next = (++next < elInner.length) ? next : 0;
        setTimeout(switchImage.bind(this, next), duration);
    };
    window.onload = switchImage.bind(this, defaultIndex);
  }
}
/**
 * アンカーリンクスクロールアニメーション
 */
function anchor(){
  jQuery('.js-anchor').click(function(){
    //スクロールのスピード
    var speed = 500;
    //リンク元を取得
    var href= jQuery(this).attr("href");
    //リンク先を取得
    var target = jQuery(href == "#" || href == "" ? 'html' : href);
    //リンク先までの距離を取得
    var position = target.offset().top;
    //スムーススクロール
    jQuery("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
}
/**
 * スライダーアニメーション
 */
function swiper(){
  if(jQuery('.swiper-container')){
    const mySwiper = new Swiper('.swiper-container', {
      autoplay:{
        delay:5000,
      },
      spaceBetween: 16,
      loop: true,
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      initialSlide: 0,
      pagination:{
        el:'.swiper-pagination',
        type:'bullets',
        clickable: true
      },
      breakpoints:{
        857:{
          slidesPerView: 4,
        },
      },
    });
  }
}
/**
 * タブ切り替え
 */
function tab(){
  let tabs = jQuery('.tab-button');
    jQuery('.tab-button').on('click', function(){
      jQuery('.active').removeClass('active');
      jQuery(this).addClass('active');
  
      const index = tabs.index(this);
      jQuery('.content-item').removeClass('show').eq(index).addClass('show');
    });
}