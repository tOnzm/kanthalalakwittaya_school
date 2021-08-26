var btnLoadMore = $('.btn-load-more').ladda();
app.controller('gallery',['$scope','daftkung',function ($scope, daftkung) {

  $scope.cur_page = [];

  $scope.init = function init() {
    $scope.cur_page = { 'album':null }; $scope.page_albums(1);
  };

  $scope.page_albums = function page_albums(page) {
    $scope.cur_page.album = (page == null ? 1 : page);
    if($scope.cur_page.album > 1) { btnLoadMore.ladda('start'); }
    daftkung.get('./'+language+'/gallery/page_albums/'+$scope.cur_page.album, [], function (res) {
      $('#container-albums').append(res.html); btnLoadMore.ladda('stop');
      if(res.end === true) { $('#box-load-more').hide(); }
      $("#container-albums").gridalicious({ 'width': 300, 'gutter': 6 });
      var galcolumn = $('.galcolumn');
      $.each(galcolumn,function(index, el) { if(el.innerHTML == ''){ $('#'+el.id).hide();  $('#box-load-more').focus(); } });
    });
  };
}]);
$(document).ready(function() {
  $("#container-images").gridalicious({
    'width': 180, 'gutter': 6
  });
});
