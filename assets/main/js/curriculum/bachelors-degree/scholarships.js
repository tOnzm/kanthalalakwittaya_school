app.controller('scholarships',['$scope','daftkung',function ($scope, daftkung) {

  $scope._scholarships = [];

  $scope.init = function init() {
    $scope.get_scholarships();
  };

  $scope.get_scholarships = function get_scholarships() {
    daftkung.get('./'+language+'/curriculum/bachelors-degree/get_scholarships', [], function (res) {
      $scope._scholarships = res;
      let liTag = '';
      $.each($scope._scholarships, function (index, value) {
        if(value.link == null){
          $('#owl-scholarships').append('<div class="item"><img src="'+value.banner+'"><a href="javascript:$(\'#scholarships\').scope().page_scroll(\'scholarship-'+value.id+'\');" class="btn-slide btn-'+value.banner_position+'"><img src="./assets/main/images/curriculum/bachelors-degree/scholarships/btn-more-detail-'+language+'.png"></a></div>');
        } else {
           $('#owl-scholarships').append('<div class="item"><img src="'+value.banner+'"><a href="'+value.link+'" target="_blank" class="btn-slide btn-'+value.banner_position+'"><img src="./assets/main/images/curriculum/bachelors-degree/scholarships/btn-more-detail-'+language+'.png"></a></div>');
        }
        liTag += `<li><a href="javascript:void(0);" data-id="${value.id}"><span ng-bind-html="sch.name">${value.name}</span></a></li>`
      });

      $("#owl-scholarships").owlCarousel({ loop:true, margin:0, slideSpeed : 200, pagination:true, singleItem:true, navigation: false, autoPlay: true });
      $('ul.dropdown-menu.pull-right.no-rounds').html(liTag)
    });
  };

  $scope.page_scroll = function page_scroll(section) {
    $('html, body').stop().animate({ scrollTop: ($('section#'+section).offset().top - 90) }, 1250, 'easeInOutExpo');
  };

}]);
$(document).ready(function() {
  $(".footer-contact").backstretch("./assets/main/images/bg-footer-contact.jpg");
  $("body").backstretch("./assets/main/images/curriculum/bachelors-degree/scholarships/bg.png");
});

$('ul.dropdown-menu.pull-right.no-rounds').on('click', 'li', function(){
  let id = $(this).find('a').data('id');
  // console.log(id)
  let schDiv = document.getElementById(`scholarship-${id}`);
    schDiv.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth', offsetTop: 100})

})