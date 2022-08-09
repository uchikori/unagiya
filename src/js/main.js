jQuery(document).ready(function(){
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
  // jQuery(window).on('load',function(){
    
  // });
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
 * メインビジュアルクロスフェードアニメーション
 */
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
/**
 * スクロールアニメーション
 */
const scrollTrigger = document.querySelectorAll('.scrollTrigger');
function scrollAnimation(){
  scrollTrigger.forEach(function(item){
    gsap.to(item,{
      scrollTrigger:{
        trigger: item,
        start: 'top bottom-=15%', 
        end: 'center center',
        markers: true,
        onEnter: function(){
          item.classList.add('scroll-on');
        }
      },
    });
  });
}