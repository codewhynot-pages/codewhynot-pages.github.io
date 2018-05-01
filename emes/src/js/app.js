import $ from 'jquery';
import Barba from 'barba.js';
import {TimelineMax, TweenLite} from 'gsap';


const mainPageInit = function() {
  let wW = $(window).innerWidth();
  TweenLite.to('nav',0.5,{left: wW/2 - 150});    
  let tl = new TimelineMax();
  tl.set('nav',{visibility: 'visible'})
    .to('.main_page_banner .image',0.5,{opacity: 1})
    .to('nav',0.5,{height: '100vh', opacity: 1})
    .staggerTo('nav a', 0.5,{y: 0, opacity: 1}, 0.05)
    .to('nav p', 0.5, {y: 0, opacity: 1});
};
const pageInit = function() {
  let wW = $(window).innerWidth();
  TweenLite.to('nav',0.5,{left: 0});
  let tl = new TimelineMax();
  tl.set('nav',{visibility: 'visible'}, 0.5)
    .to('nav',0.5,{height: '100vh'})
    .staggerTo('nav a', 0.5,{y: 0, opacity: 1}, 0.05)
    .to('nav p', 0.5, {y: 0, opacity: 1})
    .to('.page_wrapper',0.5,{opacity: 1},0.5);
};


//BARBA
var Homepage = Barba.BaseView.extend({
  namespace: 'mainpage',
  onEnter: function() {    
    mainPageInit();
  },
  onEnterCompleted: function() {

  },
  onLeave: function() {},
  onLeaveCompleted: function() {}
});
Homepage.init();
var Page = Barba.BaseView.extend({
  namespace: 'page',
  onEnter: function() {    
    pageInit();
  },
  onEnterCompleted: function() {
    
  },
  onLeave: function() {},
  onLeaveCompleted: function() {}
});
Page.init();
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    let loader = $('#loader');
    Promise
      .all([this.newContainerLoading, loader.fadeIn(), this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },
  
  fadeOut: function() {
    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },
  
  fadeIn: function() {
    var _this = this;
    var $el = $(this.newContainer);
  
    $(this.oldContainer).hide();
  
    $el.css({
      visibility : 'visible',
      opacity : 0
    });
  
    $el.animate({ opacity: 1 }, 500, function() {
      $('#loader').fadeOut();
      _this.done();
    });
  }
});
Barba.Pjax.getTransition = function() {
  return FadeTransition;
};

Barba.Pjax.start();
