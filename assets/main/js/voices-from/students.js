var btnLoadMore = $('#btn-load-more').ladda();
app.controller('students',['$scope', 'daftkung', function ($scope, daftkung) {

  $scope.highlight = $scope.all_data = []; $scope.header_start = $scope.data_stop = $scope.this_load = null;

  $scope.init = function init() {
    $scope.all_data = { 'prefix':[], 'current':0, 'total':0 ,'per_page': 10 };
    $scope.this_load = false; $scope.get_data_highlight(); $scope.get_data();
  };

  $scope.get_data_highlight = function get_data_highlight() {
    $scope.highlight = { data:[], show:[], current:0, total:0 };
    daftkung.get('./'+language+'/voice_from/get_students/highlight', [],function (res) {
      $scope.highlight.data = res; $scope.highlight.total = res.length;
      $scope.highlight.show = $scope.highlight.data[$scope.highlight.current++];
      $('.highlight-detail-description').html($scope.highlight.show.description);
      check_header_height();
      setInterval(function () { $scope.next_highlight(); },30000);
    });
  };

  $scope.get_data = function get_data() {
    btnLoadMore.ladda('start');
    if($scope.data_stop != true && $scope.this_load != true){
      var prefix = ""; $scope.this_load = true;
      for(var i = 0; i < $scope.all_data.prefix.length; i++){
        prefix += $scope.all_data.prefix[i]; if(i < ($scope.all_data.prefix.length-1)){ prefix += "|"; }
      }
      daftkung.get('./'+language+'/voice_from/get_students',{ 'per_page' : $scope.all_data.per_page, 'prefix': prefix  },function (res) {
        if(res.length > 0){
          for(var i = 0; i < res.length; i++){
            $scope.all_data.prefix.push(res[i].prefix);
            $('#waterfall').append('<li class="li-content"><div class="box-content"><div class="box-detail" id="box-detail-'+res[i].code+'"><div class="row"><div class="col-sm-3"><div class="profile box-image-profile m-t-xs" id="profile-'+res[i].code+'"></div><div class="visible-xs m-t-sm"></div></div><div class="col-sm-9"><ul class="list-unstyled m-t-n-xs m-l-n-sm m-b-n-xs"><li><h4 style="line-height: 1.6em;" class="m-b-xxs"><a href="https://www.facebook.com/'+res[i].fb_url+'" target="_blank"><i class="fa fa-facebook-official"></i></a> '+res[i].fb_name+'</h4></li><li><small>'+res[i].faculty+'</small></li>'+(res[i].department != null ? '<li class="m-t-n-xs"><small>'+res[i].department+'</small></li>' : '')+'</ul></div></div></div><div class="box-detail-contect">'+res[i].description+'</div></div></li>');
            $('#profile-'+res[i].code).backstretch(res[i].profile,{
              'alignY' : 'top'
            });
            $('#waterfall').NewWaterfall();
            var width = $('#profile-'+res[i].code).width();
            $('#profile-'+res[i].code).height(width);
            $('.box-frame').height(width+6);
          }
          $scope.all_data.current++;
          btnLoadMore.ladda('stop');
        } else {
          $scope.data_stop = true;
          $('#btn-load-more').hide(); btnLoadMore.ladda('stop');
        }
        $scope.this_load = false;
      });
    }
  };

  $scope.next_highlight = function next_highlight(opt) {
    if($scope.highlight.current > ($scope.highlight.total-1)){
      $scope.highlight.current = 0;
    }
    $scope.highlight.show = $scope.highlight.data[$scope.highlight.current++];
    $('.highlight-detail-description').html($scope.highlight.show.description);
    check_header_height();

    if(opt !== 'click'){ $scope.$apply(); }
  };

  $scope.prev_highlight = function prev_highlight(opt) {
    if($scope.highlight.current == 0){
      $scope.highlight.current = ($scope.highlight.total-1);
    }
    $scope.highlight.show = $scope.highlight.data[$scope.highlight.current--];
    $('.highlight-detail-description').html($scope.highlight.show.description);
    check_header_height();

    if(opt !== 'click'){ $scope.$apply(); }
  };

}]);
$(document).ready(function() {
  $("#header").backstretch("./assets/main/images/voices-from/students/header.jpg",{ 'alignY' : 'top' });
});
$(window).resize(function () {
  var width = $('.box-image-profile').width();
  $('.box-image-profile').height(width);
  $('.box-frame').height(width+6);
  check_header_height();
});
$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    setTimeout(function () {
      if($(window).scrollTop() > 500){
        if($('#students').scope().this_load == false){
          $('#students').scope().get_data();
        }
      }
    },200);
  }
});
var check_header_height = function check_header_height() {
  if($(window).width() < 768){
    var h_highlight_profile = $('.highlight-profile').height(); var h_highlight_detail_description_xs = $('.highlight-detail-description-xs').height();
    $('#header').height((h_highlight_profile+h_highlight_detail_description_xs)+130);
    $("#header").backstretch("./assets/main/images/voices-from/students/header.jpg",{ 'alignY' : 'top' });
  }
}
