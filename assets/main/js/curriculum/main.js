var btnSearchSchool = $('.btn-search-school').ladda();
app.controller('main',['$scope','daftkung',function ($scope, daftkung) {

  $scope.f_search_school = $scope.departments = $scope.faqs = [];
  $scope.curriculum = null;

  $scope.init = function init(e) {
    $scope.curriculum = e.curriculum; $scope.run_box_tab_right(); $scope.get_faqs(); $scope.gent_background_faculty();
    $scope.f_search_school = { 'school':null, 'department':null };
  };

  $scope.gent_background_faculty = function gent_background_faculty() {
    var $faculty = $('.box-faculty'); $.each($faculty,function(index, el) { $("#"+el.id).backstretch(el.dataset.background); });
  };

  $scope.run_box_tab_right = function run_box_tab_right() {
    for(var i = 1; i <=16; i++){
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
      var link = "./"+language+"/"+school;
      var createA = document.createElement('a');
      createA.setAttribute('href', link); createA.setAttribute('target', "_blank");
      createA.click();
    }
    else if($scope.f_search_school.school != null && $scope.f_search_school.department != null){
      var link = "./"+language+"/"+$scope.f_search_school.department;
      var createA = document.createElement('a');
      createA.setAttribute('href', link); createA.setAttribute('target', "_blank");
      createA.click();
    }
  };
  // End search school

  $scope.get_faqs = function get_faqs() {
    daftkung.get('./'+language+'/curriculum/get_faqs', { 'cate': $scope.curriculum }, function (res) {
      $scope.faqs = res;
    });
  };

  $scope.open_faq = function open_faq(index) {
    $('#accordion-faq .panel-heading').removeClass('active');
    $('#collapseFaqHead-'+index).addClass('active');
  };

}]);
$(document).ready(function() {
  window.sr = ScrollReveal(); sr.reveal('.box-faculty');
});
$(window).resize(function () {
  $('#main').scope().gent_background_faculty();
});
$('#accordion-curriculum .panel-heading a').click(function() {
  $('#accordion-curriculum .panel-heading').removeClass('active');
  $(this).parents('.panel-heading').addClass('active');
});
