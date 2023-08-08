var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home', homeController.displayCategories)

module.exports = router;
