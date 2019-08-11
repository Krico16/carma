var express = require('express');
var router = express.Router();
var fb = require('firebase-admin');

/* GET home page. */
router.get('/', function (req, res, next) {

  var db = fb.firestore();
  var collection = db.collection("Games");
  let col = Array();
  let AllGames = collection.get().
  then(data => {
    data.forEach(res => {
      //console.log(res.id, '=>', res.data());
      col.push(res.id[res.data()]);
    });
  });
  /*  
    var data = db.collection("Games").doc("/Rz5kg7Lrp5MpezIZqv9v/A/toEIor3KZHNj0bMgOnR4/juego1/JgKfTGb0V874GUNoTirU/a/LiXYUMF6XeWwB37mGX2m");
    data.get().then(doc => {
      if (doc.exists) {
        console.log(doc.data());
      } else {
        console.log("No hay data");
      }
    }).catch(error => {
      console.log("Error: " + error);
    });
    
    let createGames = collection.doc('BFV').set({
      name: "BATTLEFIELD V",
      price: 99999,
      info : "Vive el mayor conflicto de la humanidad con gracias a este regreso de la saga a sus orígenes con una representación inédita de la 2ª Guerra Mundial. Ponte al frente de la patrulla y llévala a la victoria con nuevas formas de cambiar el campo de batalla a tu antojo. Forma tu propia compañía con vehículos, armas y soldados personalizados y vive un viaje épico en Vientos de guerra.",
      date : "20-10-2018",
      category : "Acción, Aventura, Shooter",
      photo: "bfv.jpg"
    });
  */

  res.render('dashboard', {
    title: 'Carma Store',
    games: col
  });

  console.log(col);
});


module.exports = router;