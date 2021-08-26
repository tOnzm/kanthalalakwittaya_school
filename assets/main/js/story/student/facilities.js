app.controller('facilities',['$scope','daftkung', function ($scope, daftkung) {

  $scope.cur_page = { 'facilities': 1 }; $scope.lang = ''

  $scope.init = function init(data) {
    $scope.lang = data
    checkResponsiveImage()
    $( window ).resize(checkResponsiveImage)
  };

  function checkResponsiveImage() {
    var width = $(window).width();
    if (width < 765) {
      $(".w3-card-4").each((idx, card) => {
        if ($(card).data("size") == "small") {
            $(card).find("img").attr('src', $(card).data("large-src") )
        }
      })
    } else {
      $(".w3-card-4").each((idx, card) => {
        if ($(card).data("size") == "small") {
          $(card).find("img").attr('src', $(card).data("small-src"))
        }
      })
    }
  }

  $scope.page_facilities = function page_facilities(page) {
    $scope.cur_page.facilities = (page == null ? 1 : page + 1);

    setTimeout(function () {
      daftkung.get('./'+language+'/facilities/page_facilities/' + $scope.cur_page.facilities, [], function (res) {
        var idx = $('#facilities-grid-container > div').length
        var elements = res.map((facility) => {
          var element = ''
          var pos = idx % 5 + 1
          if (pos == 1) {
            element += '<div class="pos1 w3-card-4" data-size="large" data-id="'+facility.facilities_id+'">'
            element += '<img class="card-item img-responsive" src="./uploads/story/facilities/'+facility.facilities_image_large+'">'


            element += '<div class="card-item card-body">'
            element += '<div class="card-body-header">'
            element += '<h4>' + facility['facilities_title_' + $scope.lang ]+'</h4>'

            element += '</div>'

            element += '<div class="card-body-text">'
            element += facility['facilities_detail_' + $scope.lang ]
            element += '</div>'

            element += '</div>'
            element += '<div class="card-item card-body-link"><a target="_blank" href="' + (facility['facilities_link_url_' + $scope.lang] == '' ? 'http://':facility['facilities_link_url_' + $scope.lang]) + '"><span class="fa fa-chevron-right"></span></a></div>'
            element += '</div>'
          } else {
            element += '<div class="pos'+ pos+' w3-card-4" data-small-src="./uploads/story/facilities/'+facility.facilities_image_small+'" data-large-src="./uploads/story/facilities/'+facility.facilities_image_large+'" data-size="small" data-id="'+facility.facilities_id+'">'
            element += '<img class="img-responsive" src="./uploads/story/facilities/'+facility.facilities_image_small+'">'


            element += '<div class="card-item  card-body">'
            element += '<div class="card-body-header">'
            element += '<h4>' + facility['facilities_title_' + $scope.lang ]+'</h4>'

            element += '</div>'

            element += '<div class="card-body-text">'
            element += facility['facilities_detail_' + $scope.lang ]
            element += '</div>'

            element += '</div>'
            element += '<div class="card-item  card-body-link"><a target="_blank" href="' + (facility['facilities_link_url_' + $scope.lang] == '' ? 'http://':facility['facilities_link_url_' + $scope.lang]) + '"><span class="fa fa-chevron-right"></span></a></div>'
            element += '</div>'
          }


          idx++
          return element
        })

        elements.map((elem) => {
          $('.grid-container').append(elem)
        })

        checkResponsiveImage()
      },1000);
    });
  };
}]);
$(document).ready(function() {
  $(".footer-contact").backstretch("./assets/main/images/bg-footer-contact.jpg");
});
