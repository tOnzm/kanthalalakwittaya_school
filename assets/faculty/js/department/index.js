app.controller('index',[ '$scope', 'daftkung', function ($scope, daftkung) {

  $scope.init = function init() {
    $scope.gent_background_news(); $scope.gent_background_alumni();
    var gridalicious_height = 500, wd_width = $(window).width();
    if(wd_width <= 1199){ gridalicious_height = 400; }
    if(wd_width <= 991){ gridalicious_height = 360; }
    $('#box-view-alumni').gridalicious({ 'width': gridalicious_height, 'gutter': 0 });
  };

  $scope.gent_background_alumni = function gent_background_alumni() {
    var alumni = $('.alumni-cover'); $.each(alumni,function(index, el) { $("#"+el.id).backstretch(el.dataset.background); });
  };

  $scope.gent_background_news = function gent_background_news() {
    var news = $('.news-cover'); $.each(news,function(index, el) { $("#"+el.id).backstretch(el.dataset.background); });
  };

}]);
$(document).ready(function() {
  var $owl_gallery = $('#owl-carousel-gallery').owlCarousel({ autoPlay : 3000, loop:true, margin:7, pagination:false, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] });
  $owl_gallery.trigger('refresh.owl.carousel');
  window.sr = ScrollReveal(); sr.reveal('.ibox-news'); sr.reveal('.media-news'); sr.reveal('.box-alumni');
});
$(window).resize(function() {
  $('#index').scope().init();
});
