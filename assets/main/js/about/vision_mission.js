app.controller('vision_mission',['$scope','daftkung', function ($scope, daftkung) {
    
    $scope.init = function(){
        setTimeout(function(){
            $('#image-cover').css('height',($('#image-cover').width()*9)/16);
        },1);
    }

    $( window ).resize(function(){
        $('#image-cover').css('height',($('#image-cover').width()*9)/16);
    })
}]);