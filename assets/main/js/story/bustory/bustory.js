function onItemClicked (link) {
    window.open(link,'_blank')
}

app.controller('bustory',['$scope','daftkung', function ($scope, daftkung) {
    $scope.lang
    
    $scope.init = function(lang){
        $scope.lang = lang;
        // console.log('lang', $scope.lang)
        // if (window.matchMedia('screen and (max-width: 768px)').matches) {
        //     document.getElementById('index').classList.add('containter-fluid');
        //     document.getElementById('index').classList.remove('container');
        // }
        // else{
        //     document.getElementById('index').classList.add('container');
        //     document.getElementById('index').classList.remove('container-fluid');
        // }
        $scope.loadCategory();
    }
    $scope.curPage = {}
    $scope.loadCategory = function loadCategory() {
        setTimeout(function () {
          daftkung.get('./'+language+'/bustory/list_category', {} ,function (res) {
            // console.log('list group', res)
            var i = 1;
             res.map(function(obj) {
              $scope.curPage["news"+obj.newscate_id] = 1
              $scope.loadNews(i, obj.newscate_id, obj.newscate_template, 1, $scope.lang, true)
              i++;
             })
             
             // console.log('$scope.curPage', $scope.curPage)
          })
        }, 200);
    }
    $scope.loadNews = function loadNews(elementId, categoryId, templateId, page, lang, init) {
        setTimeout(function () {
          daftkung.get('./'+language+'/bustory/news?templateId='+templateId+'&categoryId='+categoryId+'&elementId='+elementId+'&page=' + page +'&lang='+lang, [],function (res) {
            var count = res.count
            var html = res.html
            if (count != 0) {
                $scope.curPage['news' + categoryId] = page
            }
            console.log('res.length', count)
            if (count < 6 && templateId ==  1 && init) {
                $("#news"+elementId+" + .tab-button-more button").hide();  
            }
            if (count < 3 && templateId == 2 && init) {
                $("#news"+elementId+" + .tab-button-more button").hide();  
            }

            $("#news"+elementId+" + .tab-button-more button").attr("display", "block");
            
            $("#news" + elementId + " .news-container").append(html)
            
            daftkung.get('./'+language+'/bustory/news?templateId='+templateId+'&categoryId='+categoryId+'&elementId='+elementId+'&page=' + (page + 1) +'&lang='+lang, [],function (res) {
                if (res.count == 0) {
                    $("#news"+elementId+" + .tab-button-more button").attr("disabled", "disabled");
                }
            });
          })
        }, 400);
    }
      

}]);

function youtubeChange(str){
    document.getElementById('youtube-big').src = str;
}

$('.owl-one').owlCarousel({
    items:1,
    responsiveClass:false,
    nav: true,
    autoHeight: false,
    navText: [
      "<i class='fa fa-chevron-left icon-white fa-5x'></i>",
      "<i class='fa fa-chevron-right icon-white fa-5x'></i>"
    ],
    loop:false,
    responsive:{
        0:{
            items:1
        },
        300:{
            navText: [
                "<i class='fa fa-chevron-left  fa-2x'></i>",
                "<i class='fa fa-chevron-right  fa-2x'></i>"
                ],
            items:1
        }
    },
    pagination: false,
    // autoplay:true,
    // autoplayTimeout:3000,
    // autoplayHoverPause:true
});

$('.owl-two').owlCarousel({
    items:1,
    responsiveClass:false,
    nav: true,
    autoHeight: false,
    navText: [
      "<i class='fa fa-chevron-left  fa-2x'></i>",
      "<i class='fa fa-chevron-right  fa-2x'></i>"
    ],
    loop:false,
    pagination: false,
    center: false,
    responsive:{
        300:{
            items:1,
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        },
        1200: {
            items: 5
        }
    },
})