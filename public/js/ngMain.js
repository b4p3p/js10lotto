app.controller('mainCtrl', function($scope, $dataService, $threadService, $guiService) {

    $scope.numeri = null;

    $scope.refreshNumeri = function(){
        async.waterfall([
            function(next){
                $guiService.startSpinner();
                $threadService.stopCountDown();
                $guiService.setDisplayText("AGGIORNO");
                next(null);
            },
            function(next){
                $dataService.getEstrazioneAsync(function(result){
                    $guiService.getSubController().onRefresh();
                    next(null)
                });
            },
            function(next){
                $guiService.stopSpinner();
                $threadService.startCountDown();
                next(null);
            }
        ], function(err, result){
            console.log("Refresh effettuato con successo!");
        });
    };

    $scope.refresh_click = function() {
        $threadService.resetTimer();
        $scope.refreshNumeri();
    };

    $scope.selezionaTab = function($event){

        var comandi = $("#nav_bar_comandi > li");
        comandi.removeClass("active");

        var hash = !$event ? location.hash.substring(2) : $event.target.hash.substring(1);

        switch (hash){
            case "sist-somma":
                $("#nav_sist_somma").addClass("active"); break;
            case "estrazioni":
                $("#nav_estrazioni").addClass("active"); break;
            default:
                $("#nav_estrazioni").addClass("active"); break;
        }
    };

    $scope.toOrario = function(estrazione){
        var totMinuti = estrazione * 5;
        var hour = parseInt(totMinuti / 60, 10);
        var minutes = parseInt(totMinuti % 60, 10);
        //hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return hour + ":" + minutes;
    };

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest')
            this.$eval(fn);
        else
            this.$apply(fn);
    };

    $scope.hasClass = function(classe, el){
        return false;
    };

    //LANCIO L'APPLICAZIONE
    $scope.selezionaTab();
    $scope.refresh_click();

});
