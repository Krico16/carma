var express = require("express");
var router = express.Router();
var fb = require("firebase-admin");

function getDocs() {
  let citiesRef = fb.firestore().collection('Games/yU6CpTHmpn3MiaB14bQd/bfv');
  let allCities = citiesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });}

function collectres(callback) {
  var docRef = fb
    .firestore()
    .collection("Games")
    .doc("yU6CpTHmpn3MiaB14bQd");
  docRef
    .get()
    .then(function(doc) {
      if (doc && doc.exists) {
        callback(doc.data()); // Return your data inside the callback function
      } else {
        callback(null); // Return null if data doesn't exists
      }
    })
    .catch(function(error) {
      callback(null); // Return null in error case
    });
  }
/* GET home page. */

collectres(function(juegos) {
  router.get("/", function(req, res, next) {
    console.log(getDocs());
    res.render("dashboard", {
      tittle: "Carma Store",
      games: juegos
    });
  });
});

module.exports = router;

/*
router.get("/", function(req, res, next) {
  var d = getGames();

  
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
    

  res.render("dashboard", {
    title: "Carma Store",
    games: d
  });

  console.log(getGames());
});

*/
