app.controller('videos', ['$scope', 'daftkung', function($scope, daftkung) {
    var btnLoadMore = $('.btn-load-more').ladda();
    
    $scope.cur_page = null;
    $scope.category = '';
    $scope.init = function() {
        autoPlayYouTubeModal();

        //FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
        function autoPlayYouTubeModal() {
            var trigger = $("body").find('[data-toggle="modal"]');
            trigger.click(function() {
                var theModal = $(this).data("target"),
                    videoSRC = $(this).attr("data-theVideo"),
                    videoSRCauto = videoSRC + "?autoplay=1";
                $(theModal + ' iframe').attr('src', videoSRCauto);
                $(theModal + ' button.close').click(function() {
                    $(theModal + ' iframe').attr('src', videoSRC);
                });
            });
        }
    }

    $('#selectCategory').change(function(){
        $('#box-load-more').hide();
        $scope.cur_page = null;
        $scope.category = $(this).val();
        if($(this).val() != ""){
            $('#categoryDetail').hide();
            $('#inCategory').html('');
            $('#loadCategory').html(preloading);
            $scope.get_at_category(1);
            // daftkung.get('./'+language+'/about/videos/get_at_category/'+$scope.cur_page,{id:$(this).val()},function(res){
            //     $('#categoryDetail').html(res);
            // });
        } else {
            $('#loadCategory').html(preloading);
            $('#categoryDetail').show();
            $('#inCategory').hide();
            $('#inCategory').html('');
            $('#loadCategory').html('');
            $('#box-load-more').hide();
        }
    })

    $scope.get_at_category = function(page){
        // $('#inCategory').hide();
        // $('#loadCategory').html(preloading);
        $scope.cur_page = (page == null ? 1 : page);
        if($scope.cur_page > 1) {
             btnLoadMore.ladda('start');
        }
        daftkung.get('./'+language+'/about/videos/get_at_category/'+$scope.cur_page,{id:$scope.category},function(res){
            // $('#categoryDetail').html(res);
            console.log(res);
            // $('#categoryDetail').show();
            $('#loadCategory').html('');
            $('#inCategory').append(res.html); 
            $('#inCategory').show();
            // $('#categoryLoad').html('');
            $('#box-load-more').show();
            // if(res.load_more === false) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}
            // if(res.end === true) { $('#box-load-more').hide(); }       
            if(res.limit === true) { $('#box-load-more').hide(); }
            if(res.overlimit === false) { $('#box-load-more').hide(); }       
            if(res.rows === 0) { $('#box-load-more').hide(); }       
            btnLoadMore.ladda('stop');
            
        });
    }
}]);