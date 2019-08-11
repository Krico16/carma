var express = require('express');
var router = express.Router();
var fb = require('firebase-admin');

/* GET home page. */
router.get('/', function (req, res, next) {
  var lista = Array();
  var db = fb.database();
  var ref = db.ref('/');
  ref.on("value",(snapshot)=>{
    lista.push(snapshot);
  },(error)=>{
    console.log("Error leyendo los datos :D");
  })

  res.render('dashboard', { title: 'Carma Store' },lista);

});


module.exports = router;