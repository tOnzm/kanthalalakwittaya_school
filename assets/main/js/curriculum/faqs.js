var btnSearchSchool = $('.btn-search-school').ladda();
app.controller('faqs',['$scope','daftkung',function ($scope, daftkung) {

  $scope.f_search_school = []; $scope.curriculum = null;

  $scope.init = function init(e) {
    $scope.curriculum = e.curriculum; $scope.run_box_tab_right();
  };

  $scope.run_box_tab_right = function run_box_tab_right() {
    for(var i = 1; i <=10; i++){
      $("#box-tab-right-"+('0' + i).slice(-2)).backstretch("./assets/main/images/box-tab-right/box-tab-right-"+('0' + i).slice(-2)+".jpg",{ 'alignY' : 'top', 'alignX': 'left' });
    }
  };

  // Search school
  $scope.get_department = function get_department(school) {
    daftkung.get('./'+language+'/curriculum/get_department/'+$scope.curriculum+'/'+school+'/',[], function (e) {
      $scope.departments = e;
    });
  };

  $scope.action_search_school = function action_search_school() {
    btnSearchSchool.ladda('start');
    var school = $('#txt-search-school-school').find(':selected').attr('data-slug');
    if($scope.f_search_school.school != null && $scope.f_search_school.department == null){
      window.location = "./"+language+"/admissions/"+school;
    }
    else if($scope.f_search_school.school != null && $scope.f_search_school.department != null){
      window.location = "./"+language+"/admissions/"+school+"/"+$scope.f_search_school.department;
    }
  };
  // End search school

  $scope.open_faq = function open_faq(index) {
    $('#accordion-faq .panel-heading').removeClass('active');
    $('#collapseFaqHead-'+index).addClass('active');
  };

}]);
