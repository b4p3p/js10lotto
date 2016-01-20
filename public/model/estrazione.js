app.factory('Estrazione', function(Numero){

    function Estrazione(estrazione) {
        this.estr = estrazione.estr;
        this.numeri = [];
        for (var i = 0; i < estrazione.numeri.length; i++)
            this.numeri.push(new Numero( estrazione.numeri[i] ));
    }
    return Estrazione;

});