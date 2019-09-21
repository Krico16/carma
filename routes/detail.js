var express = require('express');
var router = express.Router();
var fb = require("firebase-admin");

/* GET home page. */
router.get('/:id', async function (req, res, next) {
    var Lista = [];

    try {
        await fb.firestore().collection('/Games/yU6CpTHmpn3MiaB14bQd/lista/')
            .doc(req.params.id)
            .get()
            .then(doc => {
                res.render('detail', {
                    title: 'Carma Store | Juego: ', data: {
                        name: doc.data().name,
                        info: doc.data().info,
                        release: doc.data().date,
                        photo: doc.data().photo,
                        price: doc.data().price,
                        language: "Falta la api",
                        company: "Falta la api"
                    }
                });
            });
    } catch (error) {
        res.status(200).json({ Message: "Error en la pagina" + error });
    }


});

module.exports = router;


