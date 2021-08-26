var btnLoadMore = $('.btn-load-more').ladda();
app.controller('gallery',[ '$scope', 'daftkung', function ($scope, daftkung) {

  $scope.base_path = null;
  $scope.cur_page = [];

  $scope.init = function init(data) {
    $scope.base_path = data.path; $scope.cur_page = { 'images': null, 'albums':null};
    $scope.page_images(1); $scope.page_albums(1);
  };

  $scope.page_images = function page_images(page) {
    $scope.cur_page.images = (page == null ? 1 : page); btnLoadMore.ladda('start');
    daftkung.get($scope.base_path+"page_images/"+$scope.cur_page.images, [], function (res) {
      $('#box-data-images').append(res.html); btnLoadMore.ladda('stop');
      if(res.end === true) { $('#box-load-more-images').hide(); } sr.reveal('.item');
    });
  };

  $scope.page_albums = function page_albums(page) {
    $scope.cur_page.albums = (page == null ? 1 : page); if(page > 1) { btnLoadMore.ladda('start'); }
    daftkung.get($scope.base_path+"page_albums/"+$scope.cur_page.albums, [], function (res) {
      $('#box-data-albums').append(res.html); btnLoadMore.ladda('stop'); sr.reveal('.ibox');
      $scope.gent_albums_cover(); if(res.end === true) { $('#box-load-more-albums').hide(); } 
    });
  };

  $scope.gent_albums_cover = function gent_albums_cover() {
    var box_albums = $('.product-imitation');
    $.each(box_albums,function(index, el) {
      $("#"+el.dataset.id).backstretch(el.dataset.background);
    });
  };
}]);
$('a[href="#tab-2"]').on('shown.bs.tab', function (e) {
  $('#gallery').scope().gent_albums_cover();
});
$(document).ready(function() {
  window.sr = ScrollReveal();
});
