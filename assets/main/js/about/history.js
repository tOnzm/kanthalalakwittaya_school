$('#loadding').html(preloading);

app.controller('history',['$scope','daftkung', function ($scope, daftkung) {
    
    $scope.init = function(){
        $scope.his_buk_show = $scope.his_bur_show = true;
        setTimeout(function(){
            $('#image-cover').css('height',($('#image-cover').width()*9)/16);
        },1);
        $('#loadding').html('');
        $('#body').show();
    }

    $scope.toggle_buk = function(){
        $scope.his_buk_show = !$scope.his_buk_show;
    }

    $scope.toggle_bur = function(){
        $scope.his_bur_show = !$scope.his_bur_show;
    }

    $( window ).resize(function(){
        $('#image-cover').css('height',($('#image-cover').width()*9)/16);
    })
}]);

$(function(){
    var currentY = 0;
    $("#history-nav-section").mCustomScrollbar({
        autoHideScrollbar:true,
        scrollButtons:{
          enable:true
        },
        callbacks:{
          whileScrolling:function(){
            currentY = this.mcs.top;
          }
        }
    });
    
    $('#timelineUp').click(function(e){
        // console.log('up : '+currentY);
        currentY += 50;
        if(currentY > -30) currentY = 0;
        $("#history-nav-section").mCustomScrollbar("scrollTo",currentY,{scrollEasing:"easeOut"});
      });
    
    $('#timelineDown').click(function(e){
        // console.log('down : '+currentY);
        $("#history-nav-section").mCustomScrollbar("scrollTo",currentY - 50,{scrollEasing:"easeOut"});
    });
})
