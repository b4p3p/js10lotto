app.factory('Numero', function(){

    function Numero(numero){
        this.num = numero;                  //numero
        this.previsione = null;             //previsione
        this.isPrevisioneUscita = false;    //usato per lo stile nella pagina
        this.distanzaUscita = -1;           //misura la distanza dalla previsione
        this.isUsatoXPrevisione = false;
        this.numConvertito = null;
    }



    return Numero;

});