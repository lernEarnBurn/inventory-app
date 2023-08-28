var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('home')
})

router.get('/shop', function(req, res, next) {
  res.render('shop', {})
})

router.get('/create-category', function(req, res, next){
  res.render('createCategory')
})

router.get('/create-item', function(req, res, next) {
  res.render('createItem')
})

module.exports = router;
