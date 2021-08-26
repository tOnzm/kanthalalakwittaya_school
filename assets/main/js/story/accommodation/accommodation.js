app.controller('accommodation', [ '$scope', 'daftkung', function ($scope, daftkung) {
  $scope._search = $scope.cur_page = $scope._accommodation = [];

  $scope.init = function init() {
    $scope._search = { 'type': null, 'campus': null, 'paddingMax': 3500, 'paddingMin': 50000 }; $scope.cur_page = { 'accommodation' : null };
    $("#owl-banners").owlCarousel({ autoPlay: true, loop:true, margin:0, pagination:false, singleItem:true, navigation: true, navigationText: ['<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-angle-left fa-lg fa-stack-1x"></i></span>','<span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-angle-right fa-lg fa-stack-1x"></i></span>'] });
    // var rangerPrice = document.getElementById('ranger-price');
    // var paddingMin = document.getElementById('slider-padding-value-min'), paddingMax = document.getElementById('slider-padding-value-max');
    /*noUiSlider.create(rangerPrice, { start: [ 3500, 50000 ], behaviour: 'drag', connect: true, range: { 'min': 1000, 'max': 50000 } });
    rangerPrice.noUiSlider.on('update', function ( values, handle ) {
      if (handle) { paddingMax.innerHTML = Math.ceil(values[handle]); $scope._search.paddingMax = Math.ceil(values[handle]); }
      else { paddingMin.innerHTML = Math.ceil(values[handle]); $scope._search.paddingMin = Math.ceil(values[handle]); }
      $('.is-number').number(true);
    });
    rangerPrice.noUiSlider.on('set', function(){
      $scope.page_accommodation(1);
    });*/
    $scope.page_accommodation(1);
  };

  $scope.page_accommodation = function page_accommodation(page) {
    $scope.cur_page.accommodation = (page == null ? 1 : page);
    $scope._accommodation = []; $('.box-preloading').html(preloading); $('[armcodev-pagination-accommodation]').html('');
    setTimeout(function () {
      daftkung.get('./'+language+'/accommodation/page_accommodation/'+$scope.cur_page.accommodation, $scope._search , function (response) {
        $scope._accommodation = response; $('.box-preloading').html('');
        $('[armcodev-pagination-accommodation]').html($scope._accommodation.pagination); $('[armcodev-pagination-accommodation] a').removeAttr('href');
        $('[data-ci-pagination-page]').click(function (){ $scope.page_accommodation($(this).attr('data-ci-pagination-page')); });
      });
    }, 500);
  };

}]);
$(document).ready(function() {
  $(".footer-contact").backstretch("./assets/main/images/bg-footer-contact.jpg");
});
