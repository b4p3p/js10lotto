app.service('$equazioneService', function(){

    var __$dataService = null;

    /**
     * Trasforma l'equazione in un numero
     * @param $dataService
     * @param numero
     * @param row
     * @param col
     * @returns {*}
     */
    this.applicaEquazione = function($dataService, numero, row, col) {
        if ( $dataService.equazione.trim() == "" ) return null;   //esce se non c'è nessuna equazione
        __$dataService = $dataService;
        var ris_eq = replacePlaceHolders(row, col);
        if( ris_eq == null ) return "-";
        var exp = new algebra.parse(ris_eq);
        var ris_exp = parseInt(exp.eval().toString());
        return ris_exp;
    };

    /**
     * Restituisce il valore all'indice selezionato (offset)
     * @param offset
     * @param row
     * @param col
     * @returns {*}
     */
    function getRelativeValue(offset, row, col){

        offset = parseInt(offset);
        var pos = offset + col;
        var offset_col = pos;
        var offset_row = row;
        var estrazioni = __$dataService.estrGiornaliera.estrazioni;

        try {
            //colonna
            if (pos == 0)
                return estrazioni[offset_row].numeri[offset_col].num;
            if( pos < 0) {
                offset_col = pos % 20 + 20;
                offset_row = -parseInt( pos / 20 ) + 1 + row;
            }
            if (pos >= 20) { //devo salire le estrazioni (vado in negativo)
                offset_col = pos % 20;
                offset_row = -parseInt( pos / 20 ) + row;
            }

            //Chiedo valori che non sono in tabella
            if ( offset_row < 0 || offset_row >= estrazioni.length )
            {
                console.log("[WARNING] Riga non trovata - row:" + offset_row );
                return null;
            }

            var value = estrazioni[offset_row].numeri[offset_col].num;
            if (value== null){
                console.log("[WARNING] Valore non trovato")
            }

            return value;

        } catch (e) {
            console.log("[ERROR] Eccezione Ooooooops!");
        }
    }

    /**
     * Elimina il placeholder dall'equazione e restituisce un equazione corretta
     * @param row: riga in cui si trova il numero
     * @param col: colonna in cui si trova il numero
     * @returns {String} : l'equazione corretta
     */
    function replacePlaceHolders(row, col) {

        var offset = 0;
        var ris = "";

        while(true)
        {
            var start = __$dataService.equazione.indexOf("[", offset);
            var end = __$dataService.equazione.indexOf("]", offset);
            if ( end < 0 ) break;

            ris += __$dataService.equazione.substring(offset, start);

            var subString = __$dataService.equazione.substring(start + 1, end);
            var value = getRelativeValue(subString, row, col);

            if ( value == null ) return null;

            ris += value;
            offset = end + 1;
        }
        ris += __$dataService.equazione.substring(offset);
        return ris;
    }

    /**
     * Controlla se il numero passato come parametro è uscito
     * Salva le informazioni all'interno di numero
     * @param numero
     * @param row
     * @param col
     * @returns {boolean}
     */
    this.controllaEquazione = function(numero, row, col)
    {
        if ( row == 0) return false;    //é la prima estrazione

        if ( numero.previsione == '-') return false;

        //prendo la previsione
        var num = Math.abs(numero.previsione); // i numeri negativi sono da considerarsi positivi

        if ( num > 90 )  //uso la somma dei numeri
        {
            var strNum = num.toString();
            num = 0;
            _.each(strNum, function(c){
                num += parseInt(c);
            });
        }

        var distanzaUscita = 0;
        for( var r = row-1;r >= 0;r--)
        {
            distanzaUscita++;
            for( var c = 0;c<20;c++)
            {
                var nCtrl = __$dataService.estrGiornaliera.estrazioni[r].numeri[c];

                if ( nCtrl.num > num ) break;   //ottimizzazione

                if ( nCtrl.isUsatoXPrevisione ) continue;

                if ( nCtrl.num == num ) {
                    numero.isPrevisioneUscita = true;
                    numero.distanzaUscita = distanzaUscita;
                    nCtrl.isUsatoXPrevisione = true;
                    return true;
                }
            }
        }
        numero.isPrevisioneUscita = false;  //superfluo
        return false;
    }

});