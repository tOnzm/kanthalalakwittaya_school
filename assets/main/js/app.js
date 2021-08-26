var app = angular.module('app',['ngSanitize']);
var preloading = '<div class="spiner-example"> <div class="sk-spinner sk-spinner-wave"> <div class="sk-rect1"></div> <div class="sk-rect2"></div> <div class="sk-rect3"></div> <div class="sk-rect4"></div> <div class="sk-rect5"></div> </div> </div>';
if(language == 'th'){ var t_ok = "ตกลง", t_cancel = "ยกเลิก", t_oops = "อุปส์..!", t_success = "สำเร็จ!"; t_delete = "คุณต้องการลบกระทู้นี้ใช่ไหม?"; }
else if(language == 'en'){ var t_ok = "OK", t_cancel = "Cancel", t_oops = "Opps..!", t_success = "Success!"; t_delete = "Do you want to delete?"; }
app.factory('daftkung',['$http',function($http){
  return {
    post: function(url,data,response){
      $http({ method: "POST", url: url, headers: { "Content-Type" : 'application/x-www-form-urlencoded'}, data: $.param(data) }).success(response).error(function(e){ console.error(e); });
    },
    get: function(url,data,response){
      $http({ method: "GET", url: url+"?"+$.param(data), headers: { "Content-Type" : 'application/x-www-form-urlencoded'}, }).success(response).error(function(e){ console.error(e); });
    }
  }
}]);
var btnInsertNewsletter = $('.btn-insert-newsletter').ladda();
app.controller('news-letter',['$scope','daftkung',function ($scope, daftkung) {

  $scope.f_newsletter = [];

  $scope.init = function init() {
    $scope.f_newsletter = { 'email':null };
  };

  $scope.action_insert_newsletter = function action_insert_newsletter() {
    btnInsertNewsletter.ladda('start');
    setTimeout(function () {
      daftkung.post('./'+language+'/main/action_insert_newsletter', $scope.f_newsletter, function (res) {
        if(res.status === true){
          fn.success(res.message); $scope.init();
        } else {
          fn.error(res.message);
        }
        btnInsertNewsletter.ladda('stop');
      });
    },300);
  };
}]);
var fn = {
  error: function(text, header){
    swal({ title: (header == null ? t_oops : header), text: text, type: "error", timer: 1000, showConfirmButton: false });
  },
  success: function(text, header, opt, url){
    swal({ title: (header == null ? t_success : header), text: text, type: "success", confirmButtonColor: "#1ab394", confirmButtonText: t_ok }, function () { if (opt == 'reload') { window.location.reload(); } else if (opt == 'go') { window.location = url; } });
  },
  check_type_image: function (name) {
    var name = name.toLowerCase(); if (!name.match(/\.(jpg|jpeg|png)$/)) { return {'status': false}; } return {'status': true};
  },
  inputNumberOnly: function(element) { $(element).keypress(function(event){ var ew = event.which; if(ew == 32) { return true;} if(ew == 46) { return true; } if(48 <= ew && ew <= 57) { return true; } return false; }); },
};
$(document).ready(function(e) {
  $('[data-toggle="tooltip"]').tooltip({container: 'body'});
  // $("#main-header").backstretch("./assets/main/images/bg-header.png",{ centeredX: false });
  $("#menu-header").stick_in_parent();
});
$('#nav-icon').click(function(){
  $(this).toggleClass('animate-icon'); $('body').off('scroll mousewheel touchmove');
  $('#overlay-menu').fadeToggle(); $("body").css('overflow', 'hidden');
});
$('.close-overlay-menu').click(function(){
  $('#nav-icon').removeClass('animate-icon'); $('body').off('scroll mousewheel touchmove',stopScrolling);
  $('#overlay-menu').fadeToggle(); $("body").css('overflow', 'auto');
});
$('.collapse').on('shown.bs.collapse', function(){
  $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
}).on('hidden.bs.collapse', function(){
  $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
});
function stopScrolling (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
$(window).scroll(function() {
  var window_height = window.pageYOffset;
  if(window_height > 110){ $('#dropdown-language-navbar').show(); } else { $('#dropdown-language-navbar').hide(); }
});
$('#menu-header .dropdown .dropdown-menu').on('click.bs.dropdown', function() {
  return $('.dropdown').one('hide.bs.dropdown', function() {
    return false;
  });
});
$('#accordion-menu-left-default .panel-heading a').click(function() {
  $('#accordion-menu-left-default .panel-heading').removeClass('active');
  $(this).parents('.panel-heading').addClass('active');
});






