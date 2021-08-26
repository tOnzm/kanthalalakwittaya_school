app.controller('student', [ '$scope', 'daftkung', function ($scope, daftkung) {

  $scope.type = $scope.degree = $scope.f_select_view = [];

  $scope.init = function init(data) {
    if(data.type == '' || data.degree == ''){
      $scope.open_modal_select_view();
    } else {
      $scope.gent_background();
    }
  };

  $scope.gent_background = function gent_background() {
    var background = $('[armcodev-background]');
    $.each(background, function(index, el) {
      $('#'+el.id).backstretch($('#'+el.id).attr('armcodev-background'));
    });
  };

  $scope.open_modal_select_view = function open_modal_select_view() {
    $scope.f_select_view = { 'type': 0, 'degree': 0 };
    $scope.get_type(); $scope.get_degree(); $('#modal-select-view').modal();
    var PathName = window.location.pathname; var arr = PathName.split('/');
    switch (arr[arr.length-1]) {
      case 'bachelors-degree': $scope.f_select_view.degree = 0; break;
      case 'masters-degree': $scope.f_select_view.degree = 1; break;
      case 'doctoral-degree': $scope.f_select_view.degree = 2; break;
    } 
  };

  $scope.get_type = function get_type() {
    daftkung.get('./'+language+'/who-are-you/get_type', [], function (res) {
      $scope.type = res;
    });
  };

  $scope.get_degree = function get_degree() {
    daftkung.get('./'+language+'/who-are-you/get_degree', [], function (res) {
      $scope.degree = res;
    });
  };

  $scope.action_select_view = function action_select_view() {
    var url = "./"+language+"/who-are-you/student/"+$scope.type[$scope.f_select_view.type].abbr+"/"+$scope.degree[$scope.f_select_view.degree].abbr;
    window.location = url;
  };

}]);
