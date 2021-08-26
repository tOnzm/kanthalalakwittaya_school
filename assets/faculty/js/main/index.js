app.controller('index',[ '$scope', 'daftkung', function ($scope, daftkung) {

  $scope.init = function init() {
    $scope.gent_box_background_dept(); $scope.gent_box_video (); $scope.gent_box_portfolio_image(); $scope.gent_box_alumni();
    $scope.gent_box_inter_department();
    $('#box-view-alumni').gridalicious({ 'width': 400, 'gutter': 0 });
  };

  $scope.gent_box_inter_department = function gent_box_inter_department() {
    var departments = $('.box-department');
    $.each(departments,function(index, el) {
      $("#"+el.id).backstretch(el.dataset.departmentbg);
    });
  };

  $scope.gent_box_alumni = function gent_box_alumni() {
    var alumni = $('.box-background-alumni');
    $.each(alumni,function(index, el) {
      $("#"+el.id).backstretch(el.dataset.background);
    });
  };

  $scope.gent_box_background_dept = function gent_box_background_dept() {
    var box_background_dept = $('.box-background-department');
    setTimeout(function () {
      $.each(box_background_dept,function(index, el) { $("#"+el.id).backstretch({ 'url': el.dataset.background, 'duration': 0 }); });
    },500);
  };

  $scope.gent_box_portfolio_image = function gent_box_portfolio_image() {
    var box_portfolio_image = $('.box-portfolio-image');
    $.each(box_portfolio_image,function(index, el) { $("#"+el.id).backstretch(el.dataset.background); });
  };

  $scope.gent_box_video = function gent_box_video() {
    var hh_video = $('#iframe-box-video').height();
    $('.box-image-link, .box-content-scotch').css('height',hh_video);
    var box_image_link = $('.box-image-link');
    $.each(box_image_link,function(index, el) {
      $('#'+el.id).backstretch(el.dataset.bg);
    });
  };

}]);
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  $('#index').scope().gent_box_background_dept(); $('#index').scope().gent_box_portfolio_image(); $('#index').scope().gent_box_inter_department();
});
$('#accordion-inter-department').on('shown.bs.collapse', function () {
  $('#index').scope().gent_box_background_dept(); $('#index').scope().gent_box_portfolio_image(); $('#index').scope().gent_box_inter_department();
});
$(document).ready(function() {
  window.sr = ScrollReveal(); sr.reveal('.box-department-xs',{ reset: true });
  var $owl_tab_department =  $(".owl-tab-department").owlCarousel({ autoPlay: 3000, items : 4 });
  var owlCarousel_option = { autoPlay : 3000, loop:true, margin:7, pagination:false, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'], itemsTablet : [768,4], itemsMobile : [767,1] };
  var $owl_gallery = $('#owl-carousel-gallery').owlCarousel(owlCarousel_option);
  var $owl_board_of_directors = $('#owl-carousel-board-of-directors').owlCarousel(owlCarousel_option);
  $owl_tab_department.trigger('refresh.owl.carousel'); $owl_gallery.trigger('refresh.owl.carousel'); $owl_board_of_directors.trigger('refresh.owl.carousel');
});
$(window).resize(function() {
  $('#index').scope().init();
});
