app.controller('partner_network', ['$scope', '$window', '$timeout', 'daftkung', function($scope, $window, $timeout, daftkung) {
    var btnLoadMore = $('.btn-load-more').ladda();
    $scope.cur_page = null;
    $scope.init = function() {
        $('#dataPartnerLoad').html(preloading);
        $scope.randerPartner();

        $scope.windowWidth = $window.innerWidth;
        $scope.language = language;
        $window.onresize = function(event) {
            $timeout(function() {
                $scope.windowWidth = $window.innerWidth;
            });
        };
        $scope.category = 1;
    }


    $scope.styleTextColor = function(index) {
        if (index === 0) {
            return { "color": "#fbd233" };
        } else if (index === 1) {
            return { "color": "#fbd233" };
        }
    }

    $scope.changeCategory = function(id) {
        // other stuff
        $scope.category = id;
        $scope.cur_page = null;
        $('#dataPartner').html(''); 
        $('#box-load-more').hide(); 
        $('#dataPartnerLoad').html(preloading);
        $scope.randerPartner();
        
        // daftkung.get('./'+language+'/about/partner_network/get_partner_group',{group_id:id},function(res){
        //     $('#dataPartner').html(res.html);
        // });
    }

    $scope.open_modal_view_partner_networks = function(id) {
        daftkung.get('./'+language+'/about/partner_network/get_detail_partner', { 'id' : id }, function(res) {
            // console.log(res);
            // console.log(language);
            $scope.view_partner_networks = res; $('#modal-view-partner-networks').modal();
            if(language == "th"){
                $('#desc-view-partner-networks').html($scope.view_partner_networks.partner.description.th);
            } else {
                $('#desc-view-partner-networks').html($scope.view_partner_networks.partner.description.en);
            }
        });
    }

    
    $scope.randerPartner = function(page){
        // $('#dataPartnerLoad').html(preloading);
        // $('#dataPartner').hide();
        $scope.cur_page = (page == null ? 1 : page);
        if($scope.cur_page > 1) { btnLoadMore.ladda('start'); }
        let masterBu = false;
        if(typeof mainUrl != 'undefined'){ masterBu = 1;}
        // console.log($scope.cur_page);
        let mouDeptId = typeof setMou !== 'undefined' ? setMou : null; 
        daftkung.get('./'+language+'/about/partner_network/randerPartner/'+$scope.cur_page, {cateId: $scope.category, dept_id: mouDeptId, master_bu: masterBu}, function (res) {
            // console.log(res);
            $('#dataPartner').append(res.html); 
            $('#dataPartnerLoad').html('');
            btnLoadMore.ladda('stop');
            $('#dataPartner').show();
            // $('#box-load-more').show();

            if(res.load_more === false) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}
            // if(res.end === true) { $('#box-load-more').hide(); } else {$('#box-load-more').show();}          
            // if(res.limit === true) { $('#box-load-more').hide(); }

            if(res.limit === true) { $('#box-load-more').hide(); }
            if(res.overlimit === false) { $('#box-load-more').hide(); }       
            if(res.rows === 0) { $('#box-load-more').hide(); }       
        });
          
    }

}]);