

app.controller('sports',['$scope','daftkung', function ($scope, daftkung) {

  $scope.init = function init(data) {
      
    $(".owl-carousel").owlCarousel(
      {
        margin: 10,
        nav: true,
        navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive:{
          
          0:{
              items:1
          },
          766:{
              items:3
          }
        }
      }
    );

  
  };

}]);