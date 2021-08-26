app.controller('alumni', [ '$scope', 'daftkung', function ($scope, daftkung) {

  $scope.init = function init() {
    $scope.gent_background();
  };

  $scope.gent_background = function gent_background() {
    var background = $('[armcodev-background]');
    $.each(background, function(index, el) {
      $('#'+el.id).backstretch($('#'+el.id).attr('armcodev-background'));
    });
  };

}]);
