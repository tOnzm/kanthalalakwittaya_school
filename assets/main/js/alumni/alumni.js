app.controller('alumni',['$scope', 'daftkung', function ($scope, daftkung) {

  $scope.init = function init() {
    $('#box-view-alumni').gridalicious({ 'selector': '.item-alumni', 'width': 500, 'gutter': 20 });
    $scope.gent_profile();
  };

  $scope.gent_profile = function gent_profile() {
    var profile = $('.profile');
    $.each(profile,function(index, el) {
      $("#"+el.id).backstretch(el.dataset.background);
    });
  };

}]);
$(document).ready(function() {
  window.sr = ScrollReveal(); sr.reveal('.item-alumni');
});
