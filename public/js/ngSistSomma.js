/**
 * ObjNum : {
 *  num: Int,
 *  isUscito: Bool
 * }
 */

app.controller('sistSommaCtrl', function($scope, $dataService) {

    $scope.name = 'sistSommaCtrl';
    console.log("[INFO] carico " + $scope.name);

    $scope.$dataService = $dataService;

    $scope.onRefresh = function() {
        $scope.safeApply(function(){
            console.log("[CALL] nsSistemaSomma.onRefresh ");
            $scope.$dataService.estrGiornaliera.controllaEquazione($scope.$dataService)
        });
    };

    $scope.applicaEquazione_click = function() { $scope.onRefresh(); };

    //Aggiorno la pagina
    $scope.onRefresh();

});
