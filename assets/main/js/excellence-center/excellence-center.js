app.controller('excellence-center', ['$scope', 'daftkung', function ($scope, daftkung) {

  $scope.init = function init() {

  };

}]);
$('#select-excellence-center').change(function() {
  var tab = $(this).val();
  $('a[href="#tab-'+tab+'"]').tab('show');
});
