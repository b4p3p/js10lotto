app.controller('estrazioniCtrl', function($scope, $dataService) {

    console.log("[INFO] Carico estrazioniCtrl");

    $scope.name = 'estrazioniCtrl';
    $scope.$dataService = $dataService;
    $scope.estrGiornaliera = null;

    $scope.onRefresh = function() {
        $scope.$apply(function(){
            $scope.estrGiornaliera = $dataService.estrGiornaliera;
            console.log( "Dovrei disegnare " +
                $scope.estrGiornaliera.estrazioni.length + " estrazioni...");
        })
    };

    $scope.controllaEstrazione = function(){
        console.log("[INFO] Numeri da controllare: " + $dataService.numeriDaControllare);
    };

    $scope.controllaNumero = function(num){
        return _.contains($dataService.numeriDaControllare, num.toString());
    }

});
