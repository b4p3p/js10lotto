app.factory('EstrazioneGiorno', function(Estrazione, $equazioneService){


    function EstrazioneGiorno(){
        this.estrazioni = [];
    }


    /**
     * Solitamente data è più aggiornato delle estrazioni memorizzate
     */
    EstrazioneGiorno.prototype.appendEstrazione = function(data){
        var arrDiff = data.slice(this.estrazioni.length , data.length );
        for( var i = 0; i < arrDiff.length ; i++)
        {
            var estrazione = new Estrazione(arrDiff[i]);
            estrazione.oro = arrDiff[i].oro;
            this.estrazioni.unshift(estrazione);
        }
        console.log("[INFO] Aggiunte " + arrDiff.length + " estrazioni");
    };

    /**
     * Controlla nei numeri l'equazione
     * @param eq - equazione compreso di placeholders
     */
    EstrazioneGiorno.prototype.controllaEquazione = function($dataService){
        for ( var i = this.estrazioni.length - 1; i>=0; i--)
        {
            var estrazione = this.estrazioni[i];
            for (var j = 0; j < estrazione.numeri.length; j++)
            {
                var numero = estrazione.numeri[j];

                //trasforma l'equazione in numero
                numero.previsione = $equazioneService.applicaEquazione($dataService, numero, i, j);

                //controlla se è uscita
                if ( numero.isPrevisioneUscita == false )
                    $equazioneService.controllaEquazione(numero, i, j);
            }
        }
        console.log("[INFO] previsione aggiornata");
    };

    return EstrazioneGiorno;

});