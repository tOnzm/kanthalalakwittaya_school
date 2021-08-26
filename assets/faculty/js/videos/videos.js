app.controller('videos',['$scope','daftkung', function ($scope, daftkung) {

  $scope.cur_page = [];
  $scope.base_path = null;

  $scope.init = function init(data) {
    $scope.cur_page = { 'videos':null }; $scope.base_path = data.base_path;
    $scope.page_videos(1);
  };

  $scope.page_videos = function page_videos(page) {
    $scope.cur_page.videos = (page == null ? 1 : page); $('#box-videos').html(preloading);
    daftkung.get($scope.base_path+"page_videos/"+page, [], function (res) {
      $('#box-videos').html(res.html);
      var product_imitation = $('.product-imitation');
      $.each(product_imitation,function(index, el) {
        $('#'+el.id).backstretch(el.dataset.background);
      });
    });
  };

}]);
$(document).ready(function() {
  window.sr = ScrollReveal(); sr.reveal('.ibox');
});
