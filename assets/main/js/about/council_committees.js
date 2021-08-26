var btnLoadMore = $('.btn-load-more').ladda();
app.controller('council',['$scope','daftkung', function ($scope, daftkung) {

  $scope.cur_page = [];

  $scope.init = function(){
    $scope.cur_page = { 'council':null }; $scope.page_council(1);
  };

  $scope.gent_background_council = function gent_background_council() {
    var box_image_executive = $('.box-image-executive');
    $.each(box_image_executive, function(index, el) {
      $("#"+el.id).backstretch(el.dataset.background);
    });
  };

  $scope.page_council = function page_council(page) {
    $scope.cur_page.council = (page == null ? 1 : page);
    if($scope.cur_page.council > 1) { btnLoadMore.ladda('start'); }
    daftkung.get('./'+language+'/about/council/page_council/'+$scope.cur_page.council, [], function (res) {
      $('#container-card').append(res.html); btnLoadMore.ladda('stop');
      if(res.load_more === false) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}
      if(res.end === true) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}
      if(res.limit === true) { $('#box-load-more').hide(); }
      $scope.gent_background_council(); sr.reveal('.ibox');
    });
  };
}]);
$(document).ready(function() {
  window.sr = ScrollReveal();
});
