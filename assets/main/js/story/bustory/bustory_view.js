function onItemClicked(link) {
    window.open(link, '_blank')
}

app.controller('news-bustory-view', ['$scope', 'daftkung', function($scope, daftkung) {

    $scope.group;
    $scope.init = function init(group, lang, id) {
        $scope.group = group;
        $scope.lang = lang;
        $scope.id = id
        $scope.loadMostViewedNews($scope.lang);

        $(document).ready(function() {
            setTimeout(function() {
                $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
                    daftkung.post('./' + language + '/bustory/add_view/' + id, { ip: data.ip }, function(res) {

                    });
                });

            }, 200);
        });
    };


    $scope.loadMostViewedNews = function loadMostViewedNews(lang) {
        setTimeout(function() {
            daftkung.get('./' + language + '/bustory/most_viewed', { lang: lang }, function(res) {
                // console.log('most_view', res)
                $("#featured-news .container").append(res)
            });
        }, 200);
    }


}]);

$(document).ready(function() {
    $(".footer-contact").backstretch("./assets/main/images/bg-footer-contact.jpg");
    var $owl_gallery = $('#owl-carousel-gallery').owlCarousel({ autoPlay: 3000, loop: true, margin: 7, pagination: false, navigation: true, navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'] });
    $owl_gallery.trigger('refresh.owl.carousel');

    let $window = $(window);

    let getImages = $('div.news-detail img')

    /*for(let j = 0; j < getImages.length; j++){
        let imageLoad = new Image();
        let $imageTag = $(getImages[j])
        let $imageSrc = $imageTag.attr('src');

        imageLoad.src = $imageSrc
        imageArray[$imageSrc.split('https://www.bu.ac.th/uploads/files/')[1].split('.')[0]] = {
            'width' : imageLoad.naturalWidth
        }
    }*/

    changeSizeImg()

    function changeSizeImg() {
        let $images = $('div.news-detail img')
        for (let i = 0; i < $images.length; i++) {

            let $img = $($images[i]);

            if ($img.attr('height') > 100) {

                /*if ($img.attr('width') < 450) {
                    if ($window.width() < 992){
                        $img.attr('width', '90%')
                    }else{
                        $img.attr('width', '50%')
                    }

                } else {

                    $img.attr('width', '80%')

                }*/
                $img.addClass('img-responsive')
                $img.css({
                    'display' : 'block',
                    'margin' : '0 auto',
                    'width' : '70%'
                })
                // $img.attr('id', $img.attr('src').split('https://www.bu.ac.th/uploads/files/')[1].split('.')[0])
                $img.removeAttr('height')
                $img.removeAttr('width')
            }
        }
    }

    /*function resizeOnchange(data){
        $.each(data, function(key, val){
            if($(`img#${key}`).attr('src')){
                let $img = $(`img#${key}`)

                if ($img.attr('width') < 450) {
                    if ($window.width() < 992){
                        $img.attr('width', '90%')
                    }else{
                        $img.attr('width', '50%')
                    }

                } else {

                    $img.attr('width', '80%')

                }
            }
        })
    }

    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
              uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
              clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();*/
});