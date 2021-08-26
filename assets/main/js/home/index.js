app.controller('index',['$scope','daftkung', function ($scope, daftkung) {

  $scope.init = function init() {
    $scope.gent_image_banners();
  };

  $scope.gent_image_banners = function gent_image_banners() {
    var banners = $('.banner-background'); var instance = []; $.each(banners, function(index, el) { $("#"+el.id).backstretch(el.dataset.background); instance[index] = $("#"+el.id).data("backstretch"); instance[index].resize(); });
  };

}]);
var _ini_homepage_video = function _ini_homepage_video() {
  var divHeight = $('.homepage-video > .box-youtube > .videoWrapper > iframe').height();
  $('.homepage-video').height(divHeight);$(".homepage-video > .box-detail").height(divHeight-60);
  $(".homepage-video > .box-detail").backstretch({ 'scale': 'fit', 'url' : "./assets/main/images/resize-bg-homepage-video.png"});
};
$(document).ready(function() {
  var $owl_banner = $('#owl-carousel-banner').owlCarousel({ autoPlay: true, loop:true, margin:0, pagination:false, singleItem:true, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] });
  $owl_banner.trigger('refresh.owl.carousel');
  var $owl_gallery = $('#owl-carousel-gallery').owlCarousel({ autoPlay : 3000, loop:true, margin:7, pagination:false, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] });
  $owl_gallery.trigger('refresh.owl.carousel');
  _ini_homepage_video();
  $('#imageModal').modal('show');
});
$(window).resize(function() {
  _ini_homepage_video();
});
