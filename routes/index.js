'use strict';
const express = require('express')
const request = require('request')
const router = express.Router()
const sanitize = require('../config/sanitize');

router.get('/', (req, res) => {
  res.render('index.handlebars', {
    appName: 'pekaApp'
  });
})

router.post('/findStop', (req, res) => {
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
    if(error) return res.sendStatus(401);
    else if(response.statusCode!=200) return res.sendStatus(401);
    else {
      console.log(body);
      let result = JSON.parse(body);
      //console.log(result.success.times);
      console.log(result)
      res.render('index', {
        results: result.success
      }) 
    }
  });
})

router.post('/getBollardsByStopPoint', (req, res) => {
  var name = req.body.name;
  if(!sanitize.verifyString(name)) return res.sendStatus(401);
  const options = { 
    method: 'POST',
    url: 'http://www.peka.poznan.pl/vm/method.vm',
    qs: { ts: new Date().getTime() },
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded' 
      },
    form: {
      method: 'getBollardsByStopPoint', p0: '{"name":'+name+'}'
    } 
  };
  request(options, (error, response, body) => {
    if(error) return res.sendStatus(401);
    else if(response.statusCode!=200) return res.sendStatus(401);
    else {
      console.log(body);
      let result = JSON.parse(body);
      //console.log(result.success.times);
      console.log(result)
      res.render('index', {
        bollards: result
      }) 
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