app.controller('news-clipping', ['$scope','daftkung', function ($scope, daftkung) {

  $scope._groups = $scope.cur_page = [];

  $scope.init = function init() {
    $scope.get_groups();
  };

  $scope.get_groups = function get_groups() {
    daftkung.get('./'+language+'/news-clipping/get_groups', [], function (response) {
      $scope._groups = response;
      $.each($scope._groups, function(index, el) {
        $scope.cur_page[el.id] = null;
        $scope.list_news(el.id, 1);
      });
    });
  };

  $scope.list_news = function list_news(idx, page) {
    $scope.cur_page[idx] = (page == null ? 1 : page);
    var btnLoadMore = $('#btn-load-more-'+idx).ladda(); btnLoadMore.ladda('start');
    daftkung.get('./'+language+'/news-clipping/list_news/'+$scope.cur_page[idx], { 'group': idx }, function (response) {
      if(response.length == 0){
        $('#btn-load-more-'+idx).hide();
      } else {
        $.each(response, function(index, el) {
          $('#news-clipping-'+idx).append('<div class="col-xs-6 col-sm-4">'
          + '<a href="'+el.link+'" target="_blank">'
          + '<div class="ibox">'
          + '<div class="ibox-content product-box">'
          + '<div class="product-imitation" style="background-image: url('+el.cover+');background-size: 100%;background-repeat: no-repeat;">'
          + '</div>'
          + '<div class="product-desc">'
          + '<div class="product-name">'+el.name+'</div>'
          + '<div class="publish">'+ el.publish +'</div>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</a>'
          + '</div>');
        });
      }
      btnLoadMore.ladda('stop');
    });
  };

}]);
$(document).ready(function() {
  var $owl_hotnews = $('#owl-carousel-hotnews').owlCarousel({ autoPlay: true, loop:true, margin:0, pagination:false, singleItem:true, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] });
  $owl_hotnews.trigger('refresh.owl.carousel');
});
