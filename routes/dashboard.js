var express = require("express");
var router = express.Router();
var fb = require("firebase-admin");

/* GET home page. */

router.get('/', async function (req, res, next) {
  var Lista = [];

  try {
    var AllGames = await fb.firestore().collection('/Games/yU6CpTHmpn3MiaB14bQd/lista').get();
    AllGames.forEach(doc => {
      //console.log(doc.data());
      
      Lista.push({
        id: doc.id,
        data: {
          name: doc.data().name,
          info: doc.data().info,
          release: doc.data().date,
          photo: doc.data().photo,
          price: doc.data().price,
          language: "Faltan la api",
          company: "Faltan la api"
        }
      });
    });

    res.render("dashboard",{
      title: "Carma Store",
      games: Lista
    });
  } catch (error) {
    res.status(200).json({Message: "Error en la pagina" + error});
  }
});

module.exports = router;
