app.controller('downloads',['$scope','daftkung',function ($scope, daftkung) {

  $scope.ebooks = $scope.fonts = $scope.logo_university = $scope.logo_schools = [];

  $scope.init = function init() {
    $scope.get_ebooks(); $scope.get_fonts(); $scope.get_logo_university(); $scope.get_logo_schools();
  };

  $scope.get_ebooks = function get_ebooks() {
    daftkung.get('./'+language+'/about/downloads/get_ebooks', [], function (res) {
      $scope.ebooks = res;
    });
  };

  $scope.get_fonts = function get_fonts() {
    daftkung.get('./'+language+'/about/downloads/get_fonts', [], function (res) {
      $scope.fonts = res;
    });
  };

  $scope.get_logo_university = function get_logo_university() {
    daftkung.get('./'+language+'/about/downloads/get_logo_university', [], function (res) {
      $scope.logo_university = res;
    });
  };

  $scope.get_logo_schools = function get_logo_schools() {
    daftkung.get('./'+language+'/about/downloads/get_logo_schools', [], function (res) {
      $scope.logo_schools = res; $scope.toggleTabCate4('tab-0',$scope.logo_schools[0].name);
    });
  };

  $scope.toggleTabCate4 = function toggleTabCate4(tabName,schoolName) {
    $('a[href="#'+tabName+'"]').tab('show'); $('.buttonToggleTab4-active').html(schoolName);
  };

}]);
$('#accordion-menu-left-about .panel-heading a').click(function() {
  $('#accordion-menu-left-about .panel-heading').removeClass('active');
  $(this).parents('.panel-heading').addClass('active');
});
