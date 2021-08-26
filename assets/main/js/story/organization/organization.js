
function onItemClicked (link) {
  window.open(link,'_blank')
}
app.controller('news',['$scope','daftkung', function ($scope, daftkung) {
   
  
    $scope.goToSlide = function (n) {
      $(".owl-carousel").trigger("to.owl.carousel", [n - 1, 200])
    }
    $scope.selectedCategory = null;

    $scope.onFilterChange = function onFilterChange () {
      // // console.log('change', $scope.selectedCategory)
      $('html,body').animate({
        scrollTop: $($scope.selectedCategory).offset().top - 65
      });
    }
    $scope.lang = "th";

    $scope.init = function init(lang) {
      // // console.log('organization ready')
      setTimeout(function() {
        $(".owl-carousel").owlCarousel(
          {
            margin: 10,
            nav: true,
            navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive:{
              0:{
                  items:1
              }
            }
          }
        );

      },500) 
     
     
      $scope.lang = lang;
      // // console.log('lang', lang)
      
      $scope.loadGroup()
    };
   
    $scope.curPage = {}
    $scope.loadGroup = function loadGroup() {
      setTimeout(function () {
        daftkung.get('./'+language+'/organization/listGroup', {} ,function (res) {
          // // console.log('list group', res)
          var i = 1;
           res.map(function(obj) {
            $scope.curPage["news"+obj.newscorp_group_id] = 1
            $scope.loadNews(i, obj.newscorp_group_id, obj.newscorp_group_template, 1, $scope.lang, true)
            $("#select-news").append(createOptionElement(i, obj))
            i++;
           })
           
           // console.log('$scope.curPage', $scope.curPage)
        })
      }, 200);
  }

  function createOptionElement(i, obj) {
    var element = ""
    if ($scope.lang == "th") {
      element += '<option value="#news'+i+'">'+obj.newscorp_group_name_th+'</option>'
    } 
    if ($scope.lang == "en") {
      element += '<option value="#news'+i+'">'+obj.newscorp_group_name_en+'</option>'
      
    }    
    return element;
  }
    $scope.loadNews = function loadNews(elementId, groupId, templateId, page, lang, init) {
      setTimeout(function () {
        daftkung.get('./'+language+'/organization/news', {templateId: templateId, groupId: groupId, page: page, lang: lang} ,function (res) {
          // // console.log('loadNews', res)
          var count = res.count
          var html = res.html
          if (templateId <= 2) {
            if (res.length != 0) {
              $scope.curPage['news' + groupId] = page
            }
            if (count < 8 && templateId ==  1 && init) {
              $("#news"+elementId+" button").hide();  
            }
            if (count < 4 && templateId == 2 && init) {
                $("#news"+elementId+" button").hide();  
            }

            $("#news"+elementId + " .container").append(html)
            
            
            daftkung.get('./'+language+'/organization/news', {templateId: templateId, groupId: groupId, page: page + 1, lang: lang} ,function (res) {
              if (res.count == 0) {
                $("#news"+elementId+" button").attr("disabled", "disabled");
              }
            });
              
          } else {
            // // console.log('res template 3', res.length)
            if (page == 1) {
              $("#news"+elementId+" button.prev").attr("disabled", "disabled");
            } 
            else {
              $("#news"+elementId+" button.prev").removeAttr("disabled");
              
            }
            if (res.length != 0) {
              $scope.curPage['news' + groupId] = page
              
              daftkung.post('./'+language+'/organization/news', {templateId: templateId, groupId: groupId, page: page + 1, lang: lang} ,function (res) {
                if (res.count == 0) {
                  $("#news"+elementId+" button.next").attr("disabled", "disabled");
                } else {
                  $("#news"+elementId+" button.next").removeAttr("disabled");
                  
                }
              });
            } 
            $("#news"+elementId + " .container").html(html) 
          }
        })
      }, 400);
  }
    
  
}]);
$(document).ready(function() {
  $(".footer-contact").backstretch("./assets/main/images/bg-footer-contact.jpg");
});