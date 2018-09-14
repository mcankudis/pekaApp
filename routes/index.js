'use strict';
const express = require('express')
const request = require('request')
const router = express.Router()
const sanitize = require('../config/sanitize');

router.get('/', (req, res) => {
  res.render('index.handlebars');
})

router.post('/findStop', function(req, res) {
  console.log(req.body)
  var method = req.body.method;
  var pattern = req.body.pattern;
  // sanitize section
  if(!sanitize.verifyWord(method)) return res.sendStatus(401);
  if(!sanitize.verifyString(pattern)) return res.sendStatus(401);
  // eof sanitize section

  let options;

  if(method=="getStopPoints") {
    options = { 
      method: 'POST',
      url: 'http://www.peka.poznan.pl/vm/method.vm',
      qs: { ts: new Date().getTime() },
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded' 
        },
      form: {
        method: method, p0: '{"pattern":'+pattern+'}'
      } 
    };
  }


  request(options, (error, response, body) => {
    if(error) return console.log(error);
    else if(response.statusCode!=200) return console.log(response);
    else {
      console.log(body);
      // let result = JSON.parse(body);
      // console.log(result.success.times);
    }
  });


})

// getStopPoints
// Pobiera listę przystanków o nazwie pasującej do zadanego wzorca.

// getBollardsByStopPoint
// Zwraca listę bollardów dla danego przystanku i listę linii odjeżdżających z niego.

// getBollardsByStreet
// Zwraca listę bollardów znajdujących się przy zadanej ulicy.

// getBollardsByLine
// Zwraca bollardy, przy których zatrzymuje się dana linia, włącznie z jej wariacjami wynikającymi z wyjazdami/zjazdami z/do zajezdni.

// getLines
// Pobiera linie komunikacji pasujące do zadanego wzorca.

// getStreets
// Pobiera listę ulic razem z ich identyfikatorami, pasującymi do zadanego wzorca.

// getTimes
// Pobiera szacowane czasy przyjazdu kolejnych pojazdów na zadany bollard.

// getTimesForAllBollards
// Pobiera czasy przyjazdu na wszystkich bollardach przypisanych do danego przystanku. Swoiste połączenie getBollardsByStopPoint i getTimes.

// findMessagesForBollard
// Zwraca wiadomości zapisane przez administrację serwisu, skojarzone z danym bollardem. Z reguły wykorzystywane do zakomunikowania czasowych zmian w rozkładzie.




module.exports = router;