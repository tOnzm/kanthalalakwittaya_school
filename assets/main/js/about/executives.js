var btnLoadMore = $('.btn-load-more').ladda();
app.controller('executives',['$scope','daftkung', function ($scope, daftkung) {

  $scope.cur_page = [];

  $scope.init = function(){
    $scope.cur_page = { 'executive':null }; $scope.page_executives(1);
  };

  $scope.gent_background_executives = function gent_background_executives() {
    var box_image_executive = $('.box-image-executive');
    $.each(box_image_executive, function(index, el) {
      $("#"+el.id).backstretch(el.dataset.background);
    });
  };

  $scope.page_executives = function page_executives(page) {
    $scope.cur_page.executive = (page == null ? 1 : page);
    if($scope.cur_page.executive > 1) { btnLoadMore.ladda('start'); }
    daftkung.get('./'+language+'/about/executives/page_executives/'+$scope.cur_page.executive, [], function (res) {
      $('#container-card').append(res.html); btnLoadMore.ladda('stop');
      if(res.load_more === false) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}
      if(res.end === true) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}
      if(res.limit === true) { $('#box-load-more').hide(); }
      $scope.gent_background_executives(); sr.reveal('.ibox');
    });
  };

}]);
$(document).ready(function() {
  window.sr = ScrollReveal();
});
