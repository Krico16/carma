var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', { title: 'Carma Store' });
});

module.exports = router;