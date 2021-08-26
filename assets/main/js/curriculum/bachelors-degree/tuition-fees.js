app.controller('tuition-fees',['$scope', 'daftkung', function ($scope, daftkung) {

  $scope._filter = $scope._view = [];
  $scope.courseFirst = null;

  $scope.init = function init() {
    $scope._filter = { 'course_type': null, 'course': null, 'faculty': null };
    $scope._view = { 'name': null};
    setTimeout(function () {
      $scope.courseFirst = $scope._filter.course;
      $scope.set_course_type($scope._filter.course_type);
    }, 500);
  };

  $scope.set_course_type = function set_course_type(id) {
    $scope._filter.course_type = id; $scope._filter.course = $scope.courseFirst;
    $scope.action_filter();
  };

  $scope.set_course = function set_course(id) {
    $scope._filter.course = id;
    $scope.action_filter();
  };

  $scope.action_filter = function action_filter() {
    $scope._view.name = $('#course-'+$scope._filter.course).data('name') + ' ('+ $('#course-type-'+$scope._filter.course_type).data('name') +')';
    $('a[href="#tab-course-'+ $scope._filter.course_type +'-' + $scope._filter.course + '"]').tab('show');
    if($scope._filter.faculty != null && $scope._filter.faculty != ''){
      $('.active-faculty').addClass('hidden'); $('.active-faculty-'+$scope._filter.faculty).removeClass('hidden');
    } else{
      $('.active-faculty').removeClass('hidden');
    }
    console.log($scope._filter.faculty);
  };

  $scope.set_button_degree = function set_button_degree(tab) {
    $('.a-list-degree').removeClass('active'); $('a[href="'+tab+'"]').addClass('active');
  };

}]);
