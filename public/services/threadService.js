app.service('$threadService', function($dataService, $guiService ){

    var _this = this;

    var duration = 5*60;
    var minutes, seconds, timer;
    var interval_clock = null;
    var iddle = false;

    this.resetTimer = function() { timer = duration; }

    function countDownTick(){

        --timer;
        if (timer < 0) _this.resetTimer();

        if (iddle) return;

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        //minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $guiService.setDisplayText(minutes + ":" + seconds);

        if (timer == duration) {
            $guiService.getMainController().refreshNumeri();
        }
    }

    this.stopCountDown = function(){
        iddle = true;
    };

    /**
     * Avvia il timer e chiede il refresh dei dati
     * Il timer non si ferma mai. Si usa un flag per controllare se fa qualcosa
     */
    this.startCountDown = function() {
        iddle = false;
        if ( interval_clock == null )
        {
            this.resetTimer();
            interval_clock = setInterval( countDownTick , 1000);
        }
    };



});