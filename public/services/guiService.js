app.service('$guiService', function(){

    var display_spinner = document.getElementById('spin');
    var $display_timer = $('#txtStato');
    var spinner = null;

    this.startSpinner = function(){
        if( spinner == null )
            spinner = new Spinner({
                left:100,
                position: "relative"
            }).spin(display_spinner);
        else{
            spinner.spin(display_spinner);
        }
    };

    this.stopSpinner = function() {
        spinner.stop();
    };

    this.setDisplayText = function(text){ $display_timer.text(text); }

    this.getMainController = function(){
        var scope = angular.element(document.getElementById('body')).scope();
        console.log(scope.name);
        return scope;
    };

    this.getSubController = function(){
        var scope = angular.element(document.getElementById('page-container')).scope();
        console.log("[INFO] suncontroller: " + scope.name);
        return scope;
    }

});