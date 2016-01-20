app.service('$dataService', function(EstrazioneGiorno){

    var _this = this;

    this.estrGiornaliera = new EstrazioneGiorno();
    this.equazione = "";
    this.numeriDaControllare = [];
    this.equazione = "[-2] * 3";

    this.getEstrazioneAsync = function(callback){

        var limit = -1;
        var url = '/estrazione';
        var args = [];

        var txtLimit = $("#txtLimit");
        if ( txtLimit != null )
        {
            limit = parseInt(txtLimit.val());
            if ( limit > -1 ) args.push('limit=' + limit);
        }

        if ( args.length > 0 )
        {
            url += '?';
            url += args.join('&');
        }

        $.ajax({
            url:url,
            method:'get',
            success: function (data) {
                console.log("[INFO] Lette: " + data.length + " estrazioni");
                _this.estrGiornaliera.appendEstrazione(data);
                //_this.estrazioni = data;
                callback(false);
            },
            error: function(err){
                console.error("Impossibile prendere i dati\n" + err.toString());
                callback(true);
            }
        });
        return "get Estrazione";
    };

});