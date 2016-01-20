var request = require('request');
var cheerio = require('cheerio/lib/static.js');
module.exports = function(router)
{
    router.get('/', function(req, res) {
        res.render('../views/index');
    });

    router.get('/estrazione', function(req, res) {

        var result = null;
        var limit = -1;

        var today = req.query.data == null ?
            new Date().yyyymmdd() :
            req.query.data;

        if ( req.query.limit != null )
            limit = req.query.limit;

        if ( req.query.example != null )
            result = require('./oldEstrazione');

        if ( result != null )
        {
            if (limit >= 0 ) result = result.slice(0, limit);
            res.json ( result );
            return;
        }

        var url = 'http://www.lottomaticaitalia.it/10elotto/estrazioni-e-vincite/popup-pdf/estrazioni-giorno.html?data=' + today;
        request(url, function(error, response, html) {

            if(!error){
                var ris = [];
                var $ = cheerio.load(html);
                var table = $('.popContent > table > tr');
                for (var i = 0; i < table.length; i++)
                {
                    var numeri = [];
                    var row = table.get(i);
                    var estr = $(row).find('.numeroEstrazione').text();
                    estr = parseInt(estr.split('-')[0].trim());
                    var objNumeri = $(row).find('.numeroEstratto');
                    for(var n = 0; n < objNumeri.length; n++){
                        var num = $(row).find('.numeroEstratto').get(n).children[0].data;
                        numeri.push(parseInt(num));
                    }
                    var oro = parseInt($(row).find('.numeroSpeciale').text());

                    ris.push({
                        estr:estr,
                        numeri: numeri,
                        oro: oro
                    });
                }
                // ris = ris.reverse();
                res.json(ris);
            }else{
                res.json({error:error});
            }
        });



    });
};